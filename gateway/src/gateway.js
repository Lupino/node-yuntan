import qs from 'querystring';
import fetch from 'isomorphic-fetch';
import keys from 'lodash.keys';

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
  constructor({host, key, secret = '', secure = false, signSecret = false} = {},
    {signJSON, signParam} = {}) {
    this.host = host || 'https://gw.huabot.com';
    this.key = key;
    this.secret = secret;
    this.secure = secure;
    this.signSecret = signSecret;
    this.secrets = {};
    this.signJSON = signJSON;
    this.signParam = signParam;
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
    let secret = this.secrets[method + path];
    const expiredAt = Math.floor(new Date() / 1000) - 250;
    if (secret && secret.timestamp > expiredAt) {
      return secret;
    }

    secret = await this.signSecret(method, path);
    secret.timestamp = Number(secret.timestamp);
    this.secrets[method + path] = secret;
    return secret;
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
      url += '?' + qs.stringify(query);
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

      if (json) {
        headers['X-REQUEST-SIGNATURE'] = this.signJSON(secret, signData);
      } else {
        headers['X-REQUEST-SIGNATURE'] = this.signParam(secret, signData);
      }
      headers['X-REQUEST-TIME'] = signData.timestamp;
    }

    headers['X-REQUEST-KEY'] = this.key;

    let body = null;
    if (form) {
      headers['content-type'] = 'application/x-www-form-urlencoded;' +
        'charset=UTF-8';
      body = qs.stringify(form);
    } else if (json) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(json);
    } else if (raw) {
      headers['Content-Type'] = type || 'application/x-raw-data';
      body = raw;
    }
    return fetch(url, {method, headers, body});
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
      if (data.err || data.error || data.errors) {
        throw new Error(data.err || data.error || data.errors);
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
