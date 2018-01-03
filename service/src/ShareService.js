import Gateway from 'yuntan-gateway';

const POST = 'POST';

/**
 * ShareService
 * @class ShareService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class ShareService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  /**
   * Create share
   * @function ShareService::create
   * @async
   * @param {String} shareame share user name
   * @param {String} name name
   * @return {Share}
   */
  create(sharename, name) {
    const pathname = '/api/shares/';
    return this.requestJSON({pathname, method: POST, form: {sharename, name}});
  }

  /**
   * Create share history
   * @function ShareService::createHistory
   * @async
   * @param {String} name name
   * @param {Object} hist hist
   * @param {Number} hist.score share score
   * @param {String} user.summary summary
   * @return {Share[]]} scoreList
   */
  createHistory(name, {score, summary}) {
    const pathname = `/api/shares/${name}/hists/`;
    return this.requestJSON({pathname, method: POST, form: {score, summary}});
  }

  /**
   * save config
   * @function ShareService::saveConfig
   * @async
   * @param {String} key config key
   * @param {String} value value
   * @return {String}
   */
  saveConfig(key, value) {
    const pathname = `/api/config/${key}/`;
    return this.requestJSON({pathname, method: POST, form: {value}});
  }

  /**
   * get config
   * @function ShareService::getConfig
   * @async
   * @param {String} key config key
   * @return {String}
   */
  getConfig(key) {
    const pathname = `/api/config/${key}/`;
    return this.requestJSON({pathname});
  }

  /**
   * get share list
   * @function ShareService::getList
   * @async
   * @param {Object} [query] query params
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Share[]} shares
   */
  getList({from=0, size=10}={}) {
    const pathname = '/api/shares/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * statistic
   * @function ShareService::statistic
   * @async
   * @param {Object} [query] query params
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @param {Number} [query.start_time]
   * @param {Number} [query.end_time]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Patch[]} patchs
   */
  statistic(query) {
    const pathname = '/api/statistic/';
    return this.requestJSON({pathname, query});
  }

  /**
   * get share
   * @function ShareService::get
   * @async
   * @param {String} name name
   * @return {Share} share
   */
  get(name) {
    const pathname = `/api/shares/${name}/`;
    return this.requestJSON({pathname});
  }

  /**
   * getChildren
   * @function ShareService::getChildren
   * @async
   * @param {Object} [query] query params
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Share[]} shares
   */
  getChildren(name, { from = 0, size = 10 } = {}) {
    const pathname = `/api/shares/${name}/childs/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * get share history
   * @function ShareService::getHistory
   * @async
   * @param {Object} [query] query params
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Hist[]} hists
   */
  getHistory(name, { from = 0, size = 10 } = {}) {
    const pathname = `/api/shares/${name}/hists/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * getPatch
   * @function ShareService::getPatch
   * @async
   * @param {Object} [query] query params
   * @param {Number} [query.start_time]
   * @param {Number} [query.end_time]
   * @return {Patch[]}
   */
  getPatch(name, query = {}) {
    const pathname = `/api/shares/${name}/patch/`;
    return this.requestJSON({pathname, query});
  }

  /**
   * type Query {
   *   config(name: String!): String
   *   share(name: String!): Share
   *   statistic(start_time: Int, end_time: Int, from: Int, size: Int): [PatchResult]
   *   statistic_count(start_time: Int, end_time: Int): Int
   *   shares(from: Int, size: Int): [Share]
   *   share_count: Int
   * }
   * type Share {
   *   id: Int
   *   name: String
   *   father_id: Int
   *   father: Share
   *   children(from: Int, size: Int): [Share]
   *   children_count: Int
   *   history(from: Int, size: Int): [ShareHistory]
   *   history_count: Int
   *   statistic(start_time: Int, end_time: Int): PatchResult
   *   total_score: Int
   *   count: Int
   *   patch_count: Int
   *   created_at: Int
   * }
   * type ShareHistory {
   *   id: Int
   *   share_id: Int
   *   share: Share
   *   src_id: Int
   *   src: Share
   *   summary: String
   *   score: Int
   *   depth: Int
   *   created_at: Int
   * }
   * type PatchResult {
   *   patch_score: Int
   *   patch_count: Int
   *   share_id: Int
   *   share: Share
   * }
   * @function ShareService::graphql
   * @async
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphql(query) {
    const pathname = '/api/graphql/';
    return this.requestJSON({pathname, method: POST, form: {query}});
  }
}
