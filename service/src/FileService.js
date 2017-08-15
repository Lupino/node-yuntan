import Gateway from 'yuntan-gateway';

/**
 * FileService
 * @class FileService
 */
export default class FileService extends Gateway {
  /**
   * Put file
   * @async
   * @function
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
   * @function
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
   * @function
   * @param {String} fileName
   * @return {Response}
   */
  remove(fileName) {
    const pathname = `/file/${fileName}`;
    return this.request({method: 'DELETE', pathname});
  }
}
