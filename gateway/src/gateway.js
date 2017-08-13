import qs     from 'querystring';
import fetch  from 'isomorphic-fetch';


export default class Gateway {
  constructor({host = '', key = '', secret = '', jsapi = false, secure = false,
               signSecret = false, signJSON = false, signParam = false} = {}) {
    this.host       = host;
    this.key        = key;
    this.jsapi      = jsapi;
    this.secret     = secret;
    this.secure     = secure;
    this.signSecret = signSecret;
    this.secrets    = {};
    this.signJSON   = signJSON;
    this.signParam  = signParam;
  }

  async getSecret(path) {
    let secret = this.secrets[path];
    const expired_at = Math.floor(new Date() / 1000) - 250;
    if (secret && secret.timestamp > expired_at) {
      return secret;
    }

    secret = await this.signSecret(path);
    secret.timestamp = Number(secret.timestamp);
    this.secrets[path] = secret;
    return secret;
  }

  async request({method='GET', pathname='', query = null, form = null,
                 json = null, raw = null, type = null}) {
    let url = this.host + pathname;
    if (query) {
      url += '?' + qs.stringify(query);
    }

    let headers = {};

    if (method !== 'GET' || this.secure) {
      let signData = { sign_path: pathname, key: this.key };
      if (raw) {
        signData = { raw, ...signData };
      } else {
        signData = { ...query, ...form, ...json, ...signData }
      }

      let secret = this.secret;

      if (this.jsapi) {
        const { nonce, secret: secret_, timestamp } = await this.getSecret(pathname);
        headers['X-REQUEST-TYPE'] = "JSAPI";
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
      headers['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
      body = qs.stringify(form);
    } else if (json) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(json);
    } else if (raw) {
      headers['Content-Type'] = type || 'application/x-raw-data';
      body = raw;
    }
    return fetch(url, { method, headers, body });
  }
  async requestJSON(options, spec=null) {
    const rsp = await this.request(options).then((rsp) => rsp.json());
    if (rsp.err) {
      throw rsp.err
    }
    if (spec) {
      return rsp[spec];
    } else {
      return rsp;
    }
  }
}
