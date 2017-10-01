import Gateway from 'yuntan-gateway';

/**
 * Coin object
 * @typedef {Object} Coin
 * @property {String} name coin name
 * @property {Number} score coin score
 * @property {Number} pre_score pre coin score
 * @property {String} desc coin description
 * @property {String} type One of Incr, Decr, incr, decr
 */

/**
 * CoinService
 * @class CoinService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class CoinService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  /**
   * Get coin score
   * @function CoinService::getScore
   * @async
   * @param {String} name name
   * @return {Number}
   */
  getScore(name) {
    const pathname = `/api/coins/${name}/score/`;
    return this.requestJSON({pathname}, 'score');
  }

  /**
   * Get coin info
   * @function CoinService::getInfo
   * @async
   * @param {String} name name
   * @return {Number} score
   * @return {String} name
   * @return {Object} info
   */
  getInfo(name) {
    const pathname = `/api/coins/${name}/info/`;
    return this.requestJSON({pathname});
  }

  /**
   * Put coin info
   * @function CoinService::putInfo
   * @async
   * @param {String} name name
   * @param {Object} info coin info
   */
  putInfo(name, json) {
    const pathname = `/api/coins/${name}/info/`;
    return this.requestJSON({pathname, method: 'PUT', json});
  }

  /**
   * Drop coin data
   * @function CoinService::dropCoin
   * @async
   * @param {String} name name
   */
  dropCoin(name) {
    const pathname = `/api/coins/${name}/drop/`;
    return this.requestJSON({pathname, method: 'POST'});
  }

  /**
   * Get coin list
   * @function CoinService::getList
   * @async
   * @param {String} name name
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Coin[]} coins
   */
  getList(name, query = {}) {
    const pathname = `/api/coins/${name}/`;
    return this.requestJSON({pathname, query});
  }

  /**
   * Get coin history list
   * @function CoinService::getList
   * @async
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @param {Number} [query.start_time=0]
   * @param {Number} [query.end_time=now]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Coin[]} coins
   */
  getHistory(query = {}) {
    const pathname = '/api/coins_history/';
    return this.requestJSON({pathname, query});
  }

  /**
   * Save coin
   * @function CoinService::save
   * @async
   * @param {Coin} coin
   * @param {String} coin.name coin name
   * @param {Number} coin.score coin score
   * @param {String} [coin.desc] coin description
   * @param {String} coin.type One of Incr, Decr, incr, decr
   * @return {Number} - current score
   */
  save({name, ...form}) {
    const pathname = `/api/coins/${name}/`;
    return this.requestJSON({pathname, method: 'POST', form}, 'score');
  }

  /**
   * GraphQL api
   *   type Query {
   *     coin(name: String!): Coin
   *   }
   *   type Coin {
   *     history(from: Int, size: Int): [CoinHistory]
   *     total: Int
   *     score: Int
   *     info: CoinInfo
   *   }
   *   type CoinHistory {
   *     score: Int
   *     pre_score: Int
   *     type: String
   *     desc: String
   *     created_at: Int
   *   }
   *   type CoinInfo {
   *
   *   }
   *
   * @function CoinService::graphql
   * @async
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphql(query) {
    const pathname = '/api/graphql/';
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }

  /**
   * GraphQL api by name
   *
   *   type Query {
   *     history(from: Int, size: Int): [CoinHistory]
   *     total: Int
   *     score: Int
   *     info: CoinInfo
   *   }
   *   type CoinHistory {
   *     score: Int
   *     pre_score: Int
   *     type: String
   *     desc: String
   *     created_at: Int
   *   }
   *   type CoinInfo {
   *
   *   }
   *
   * @function CoinService::graphqlByName
   * @async
   * @param {String} name name
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphqlByName(name, query) {
    const pathname = `/api/graphql/${name}/`;
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }
}
