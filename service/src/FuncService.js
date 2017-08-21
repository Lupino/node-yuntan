import Gateway from 'yuntan-gateway';

/**
 * Function as a service
 * @class FuncService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class FuncService extends Gateway {
  /**
   * Run a function
   * @async
   * @function FuncService::run
   * @param {String} func Function name
   * @param {Object} options
   * @param {Object} [options.form] Form data
   * @param {Object} [options.json] Json data
   * @param {Binary} [options.raw] Raw binary data
   * @param {String} [options.type] Type of raw binary data
   * @return {Response}
   */
  run(func, {from=null, json=null, raw=null, type=null} = {}) {
    const pathname = `/function/${func}`;
    return this.request({method: 'POST', pathname, from, json, raw, type});
  }
}
