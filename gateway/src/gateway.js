import rawFetch from 'isomorphic-fetch';
import keys from 'lodash.keys';

function compact(data) {
  const ret = {};
  for (let key of keys(data)) {
    if (data[key]) {
      ret[key] = data[key];
    }
  }
  return ret;
}


/**
 * cache the dynamic secret.
 */
const cache = {};

/**
 * Dynamic sign secret for third part server usage
 *
 * @function signSecret
 * @param {String} method
 * @param {String} pathname
 *
 */

/** Abstract class for yuntan service.
 *  Every service should extend this class.
 *  @class Gateway
 *  @param {Object} config Service config
 *  @param {String} [config.host=https://gw.huabot.com] Service host
 *  @param {String} config.key Service key
 *  @param {String} [config.secret] Service secret
 *  @param {signSecret} [config.signSecret] dynamic secret sign function
 *  @param {Boolean} [config.secure=false] Is a secure service
 *  @param {Object} options Signature method config
 *  @param {signJSON} options.signJSON
 *  @param {signParam} options.signParam
 */
export default class Gateway {
  /* eslint-disable require-jsdoc */
  constructor({host, key, secret = '', secure = false, signSecret = false, fetch = rawFetch} = {},
    {signJSON, signParam} = {}) {
    this.host = host || 'https://gw.huabot.com';
    this.key = key;
    this.secret = secret;
    this.secure = secure;
    this.signSecret = signSecret;
    this.signJSON = signJSON;
    this.signParam = signParam;
    this.rawFetch = fetch;
  }
  /* eslint-enable require-jsdoc */

  /**
   * Get sign secret from third part server
   * @private
   * @async
   * @function Gateway::getSecret
   * @param {String} method HTTP request method
   * @param {String} path pathname
   * @return {json}
   */
  async getSecret(method, path) {
    const key = `${this.key}${method}${path}`;

    const secret = cache[key];
    const expiredAt = Math.floor(new Date() / 1000) - 250;
    if (secret && secret.clientTimestamp > expiredAt) {
      return secret;
    }

    const newSecret = await this.signSecret(method, path);
    newSecret.timestamp = Number(newSecret.timestamp);
    newSecret.clientTimestamp = Math.floor(new Date() / 1000);
    cache[key] = newSecret;
    return newSecret;
  }

  /**
   * Request data from service
   * @function Gateway::request
   * @async
   * @param {Object} options Request options
   * @param {String} [options.method=GET] HTTP method allows GET, PUT, POST, DELETE
   * @param {String} [options.pathname=/] HTTP pathname
   * @param {Object} [options.query] HTTP query
   * @param {Object} [options.form] Form data
   * @param {Object} [options.json] Json data
   * @param {Binary} [options.raw] Raw binary data
   * @param {String} [options.type] Type of raw binary data
   * @return {Response}
   */
  async request({method='GET', pathname='', query = null, form = null,
    json = null, raw = null, type = null}) {
    let url = this.host + pathname;
    if (query) {
      url += '?' + new URLSearchParams(compact(query));
    }

    let headers = {};

    method = method.toUpperCase();

    if (method !== 'GET' || this.secure) {
      let signData = {pathname, key: this.key};
      if (raw) {
        signData = {raw, ...signData};
      } else {
        signData = {...query, ...form, ...json, ...signData};
      }

      let secret = this.secret;

      if (this.signSecret) {
        const {nonce, secret: secret_, timestamp} = await this.getSecret(method,
          pathname);
        headers['X-REQUEST-TYPE'] = 'JSAPI';
        headers['X-REQUEST-NONCE'] = nonce;
        signData.timestamp = timestamp;
        secret = secret_;
      } else {
        signData.timestamp = Math.floor(new Date() / 1000);
      }

      signData = compact(signData);

      if (json) {
        headers['X-REQUEST-SIGNATURE'] = this.signJSON(secret, signData);
      } else {
        headers['X-REQUEST-SIGNATURE'] = this.signParam(secret, signData);
      }
      headers['X-REQUEST-TIME'] = signData.timestamp + '';
    }

    headers['X-REQUEST-KEY'] = this.key;

    if (method !== 'GET') {
      headers['content-type'] = 'application/x-www-form-urlencoded;' +
        'charset=UTF-8';
    }

    let body = null;
    if (form) {
      body = new URLSearchParams(compact(form)).toString();
    } else if (json) {
      headers['content-type'] = 'application/json';
      body = JSON.stringify(compact(json));
    } else if (raw) {
      headers['content-type'] = type || 'application/octet-stream';
      body = raw;
    }
    return this.rawFetch(url, {method, headers, body});
  }

  /**
   * Request data from service with response JSON
   * @function Gateway::requestJSON
   * @async
   * @param {Object} options Request options
   * @param {String} [options.method=GET] HTTP method allows GET, PUT, POST, DELETE
   * @param {String} [options.pathname=/] HTTP pathname
   * @param {Object} [options.query] HTTP query
   * @param {Object} [options.form] Form data
   * @param {Object} [options.json] Json data
   * @param {Binary} [options.raw] Raw binary data
   * @param {String} [options.type] Type of raw binary data
   * @return {Object}
   */
  async requestJSON(options) {
    const rsp = await this.request(options);
    if (/application\/json/.test(rsp.headers.get('content-type'))) {
      const data = await rsp.json();
      if (options.capture) {
        return data;
      }
      if (data.err || data.error || data.errors) {
        throw new Error(data.err || data.error || data.errors);
      }

      if (options.auto_pop === false) {
        return data;
      }

      if (Array.isArray(data)) {
        return data;
      }
      if (typeof data === 'object') {
        const k = keys(data);
        if (k.length === 1) {
          return data[k[0]];
        } else {
          return data;
        }
      }
      return data;
    }

    const err = await rsp.text();
    throw new Error(err);
  }
}
