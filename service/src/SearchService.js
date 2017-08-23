import Gateway from 'yuntan-gateway';


/**
 * SearchService
 * @class SearchService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class SearchService extends Gateway {
  createIndex(indexName, json) {
    const pathname = `/api/${indexName}`;
    return this.requestJSON({pathname, method: 'PUT', json});
  }
  getIndex(indexName) {
    const pathname = `/api/${indexName}`;
    return this.requestJSON({pathname});
  }
  deleteIndex(indexName) {
    const pathname = `/api/${indexName}`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }
  listIndexes() {
    const pathname = '/api';
    return this.requestJSON({pathname});
  }
  docIndex(indexName, docID, json) {
    const pathname = `/api/${indexName}/${docID}`;
    return this.requestJSON({pathname, method: 'PUT', json});
  }
  docCount(indexName) {
    const pathname = `/api/${indexName}/_count`;
    return this.requestJSON({pathname});
  }
  docGet(indexName, docID) {
    const pathname = `/api/${indexName}/${docID}`;
    return this.requestJSON({pathname});
  }
  docDelete(indexName, docID) {
    const pathname = `/api/${indexName}/${docID}`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }
  search(indexName, json) {
    const pathname = `/api/${indexName}/_search`;
    return this.requestJSON({pathname, method: 'POST', json});
  }
  listFields(indexName) {
    const pathname = `/api/${indexName}/_fields`;
    return this.requestJSON({pathname});
  }
  debug(indexName, docID) {
    const pathname = `/api/${indexName}/${docID}/_debug`;
    return this.requestJSON({pathname});
  }
  alias(json) {
    const pathname = '/api/_aliases';
    return this.requestJSON({pathname, method: 'POST', json});
  }
}
