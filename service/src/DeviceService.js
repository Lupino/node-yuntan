import Gateway from 'yuntan-gateway';

/**
 * DeviceService
 * @class DeviceService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class DeviceService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  create({username, token, type}) {
    const pathname = '/api/devices/';
    return this.requestJSON({pathname, method: 'POST',
      form: {username, token, type}});
  }

  createByUser(username, {token, type}) {
    const pathname = `/api/users/${username}/devices/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {token, type}});
  }

  updateToken(uuidOrToken, token) {
    const pathname = `/api/devices/${uuidOrToken}/token/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {token}});
  }

  updateTokenByUser(username, uuidOrToken, token) {
    const pathname = `/api/users/${username}/devices/${uuidOrToken}/token/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {token}});
  }

  updateType(uuidOrToken, type) {
    const pathname = `/api/devices/${uuidOrToken}/type/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {type}});
  }

  updateTypeByUser(username, uuidOrToken, type) {
    const pathname = `/api/users/${username}/devices/${uuidOrToken}/type/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {type}});
  }

  updateMeta(uuidOrToken, meta) {
    const pathname = `/api/devices/${uuidOrToken}/meta/`;
    if (typeof meta !== 'string') {
      meta = JSON.stringify(meta);
    }
    return this.requestJSON({pathname, method: 'POST',
      form: {meta}});
  }

  updateMetaByUser(username, uuidOrToken, meta) {
    const pathname = `/api/users/${username}/devices/${uuidOrToken}/meta/`;
    if (typeof meta !== 'string') {
      meta = JSON.stringify(meta);
    }
    return this.requestJSON({pathname, method: 'POST',
      form: {meta}});
  }

  getList({from = 0, size = 10, type=''} = {}) {
    const pathname = '/api/devices/';
    return this.requestJSON({pathname, query: {from, size, type}});
  }

  getListByUser(username, {from = 0, size = 10, type=''} = {}) {
    const pathname = `/api/users/${username}/devices/`;
    return this.requestJSON({pathname, query: {from, size, type}});
  }

  remove(uuidOrToken) {
    const pathname = `/api/devices/${uuidOrToken}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  removeByUser(username, uuidOrToken) {
    const pathname = `/api/users/${username}/devices/${uuidOrToken}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  get(uuidOrToken) {
    const pathname = `/api/devices/${uuidOrToken}/`;
    return this.requestJSON({pathname});
  }

  getByUser(username, uuidOrToken) {
    const pathname = `/api/users/${username}/devices/${uuidOrToken}/`;
    return this.requestJSON({pathname});
  }

  rpc(uuidOrToken, payload, opts = {format: 'json'}, reqOpts) {
    const pathname = `/api/devices/${uuidOrToken}/rpc/`;
    if (typeof payload !== 'string') {
      payload = JSON.stringify(payload);
    }
    return this.requestJSON({pathname, method: 'POST', form: {
      payload,
      ...opts
    }, reqOpts})
  }

}
