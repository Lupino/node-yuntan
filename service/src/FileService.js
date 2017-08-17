import Gateway from 'yuntan-gateway';

/**
 * FileService
 * @class FileService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class FileService extends Gateway {
  /**
   * Put file
   * @async
   * @function FileService::put
   * @param {String} fileName
   * @param {Buffer} raw
   * @return {Response}
   */
  put(fileName, raw) {
    const pathname = `/file/${fileName}`;
    return this.request({method: 'PUT', pathname, raw});
  }

  /**
   * Get file
   * @async
   * @function FileService::get
   * @param {String} fileName
   * @return {Response}
   */
  get(fileName) {
    const pathname = `/file/${fileName}`;
    return this.request({pathname});
  }

  /**
   * Remove file
   * @async
   * @function FileService::remove
   * @param {String} fileName
   * @return {Response}
   */
  remove(fileName) {
    const pathname = `/file/${fileName}`;
    return this.request({method: 'DELETE', pathname});
  }
}
