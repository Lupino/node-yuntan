import Gateway from 'yuntan-gateway';

/**
 * PeriodicService
 * @class PeriodicService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class PeriodicService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  /**
   * Status
   * @async
   * @function PeriodicService::status
   * @return {String}
   */
  async status() {
    const pathname = '/periodic/status/';
    const rsp = await this.request({pathname});
    return await rsp.text();
  }

  /**
   * Submit Job
   * @async
   * @function PeriodicService::submit
   * @param {String} funcName
   * @param {String} jobName
   * @param {Object} [opts]
   * @param {Int} [opts.sched_at]
   * @param {Int} [opts.timeout]
   * @param {String} [opts.workload]
   * @return {Response}
   */
  submit(funcName, jobName, opts = {}) {
    const pathname = `/periodic/submit/${funcName}/${jobName}/`;
    const {workload, query} = opts;
    if (workload) {
      return this.request({method: 'POST', pathname, query, raw: workload});
    } else {
      return this.request({method: 'POST', pathname, form: opts});
    }
  }

  /**
   * Run Job
   * @async
   * @function PeriodicService::run
   * @param {String} funcName
   * @param {String} jobName
   * @param {Object} [opts]
   * @param {Int} [opts.timeout]
   * @param {String} [opts.workload]
   * @return {Response}
   */
  run(funcName, jobName, opts = {}) {
    const pathname = `/periodic/run/${funcName}/${jobName}/`;
    const {workload, query} = opts;
    if (workload) {
      return this.request({method: 'POST', pathname, query, raw: workload});
    } else {
      return this.request({method: 'POST', pathname, form: opts});
    }
  }

  /**
   * Remove job
   * @async
   * @function PeriodicService::remove
   * @param {String} funcName
   * @param {String} jobName
   * @return {Response}
   */
  remove(funcName, jobName) {
    const pathname = `/periodic/remove/${funcName}/${jobName}/`;
    return this.request({method: 'POST', pathname});
  }

  /**
   * Drop func
   * @async
   * @function PeriodicService::drop
   * @param {String} funcName
   * @return {Response}
   */
  drop(funcName) {
    const pathname = `/periodic/drop/${funcName}/`;
    return this.request({method: 'POST', pathname});
  }
}
