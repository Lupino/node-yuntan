import Gateway from 'yuntan-gateway';

/**
 * Function as a service
 * @class FuncService
 */
export default class FuncService extends Gateway {
  /**
   * Run a function
   * @async
   * @function
   * @param {json} options
   * @return {Response}
   */
  run({func, ...other}) {
    const pathname = `/function/${func}`;
    return this.request({method: 'POST', pathname, ...other});
  }
}
