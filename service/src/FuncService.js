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
   * @param {json} options
   * @return {Response}
   */
  run({func, ...other}) {
    const pathname = `/function/${func}`;
    return this.request({method: 'POST', pathname, ...other});
  }
}
