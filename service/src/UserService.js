import Gateway from 'yuntan-gateway';

/**
 * User object
 * @typedef {Object} User
 * @property {Number} id
 * @property {String} name
 * @property {Object} extra
 * @property {Bind[]} binds
 * @property {Number} created_at
 */

/**
 * Bind object
 * @typedef {Object} Bind
 * @property {Number} id
 * @property {Number} user_id
 * @property {String} name
 * @property {String} service
 * @property {Object} extra
 * @property {Number} created_at
 */

/**
 * UserService
 * @class UserService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class UserService extends Gateway {
  /* eslint-disable require-jsdoc */
  constructor(options) {
    super({...options, secure: true});
  }
  /* eslint-enable require-jsdoc */

  /**
   * Get user list
   * @function UserService::getList
   * @async
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {User[]} users
   */
  getList({from = 0, size = 10} = {}) {
    const pathname = '/api/users/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Create a new user
   * @function UserService::create
   * @async
   * @param {Object} user user data
   * @param {String} user.username UserName
   * @param {String} user.passwd Password
   * @return {User}
   */
  create({username, passwd}) {
    const pathname = '/api/users/';
    return this.requestJSON({pathname, method: 'POST',
      form: {username, passwd}});
  }

  /**
   * Get a user
   * @function UserService::get
   * @async
   * @param {String} uidOrName user_id or username
   * @return {User}
   */
  get(uidOrName) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({pathname});
  }

  /**
   * Remove a user
   * @function UserService::remove
   * @async
   * @param {String} uidOrName user_id or username
   * @return {String}
   */
  remove(uidOrName) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  /**
   * Update user name
   * @function UserService::updateName
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} username New user name
   * @return {String}
   */
  updateName(uidOrName, username) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({pathname, method: 'POST', form: {username}}, 'result');
  }

  /**
   * Update user passwd
   * @function UserService::updatePassword
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} passwd New password
   * @return {String}
   */
  updatePassword(uidOrName, passwd) {
    const pathname = `/api/users/${uidOrName}/passwd`;
    return this.requestJSON({pathname, method: 'POST', form: {passwd}},
      'result');
  }

  /**
   * Update user extra info
   * @function UserService::updateExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Object} extra User extra info
   * @return {String}
   */
  updateExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'POST', form: {extra}}, 'result');
  }

  /**
   * Remove user extra info
   * @function UserService::removeExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Object} extra User extra info
   * @return {String}
   */
  removeExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}},
      'result');
  }

  /**
   * Clear user extra info
   * @function UserService::clearExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @return {String}
   */
  clearExtra(uidOrName) {
    const pathname = `/api/users/${uidOrName}/extra/clear`;
    return this.requestJSON({pathname, method: 'POST'}, 'result');
  }

  /**
   * Verify password
   * @function UserService::verifyPassword
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} passwd User password
   * @return {String}
   */
  verifyPassword(uidOrName, passwd) {
    const pathname = `/api/users/${uidOrName}/verify`;
    return this.requestJSON({pathname, method: 'POST', form: {passwd}},
      'result');
  }

  /**
   * Create bind
   * @function UserService::createBind
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Bind} bind
   * @param {String} bind.service Bind service
   * @param {String} bind.name    Bind name
   * @param {Object} bind.extra   Bind extra info
   * @return {Bind}
   */
  createBind(uidOrName, {service, name, extra = {}}) {
    const pathname = `/api/users/${uidOrName}/binds`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'POST',
      form: {service, name, extra}});
  }

  /**
   * Get bind
   * @function UserService::getBind
   * @async
   * @param {String} name Bind name
   * @return {Bind}
   */
  getBind(name) {
    const pathname = '/api/binds/';
    return this.requestJSON({pathname, query: {name}});
  }

  /**
   * Remove bind
   * @function UserService::removeBind
   * @async
   * @param {Number} bind_id Bind ID
   * @return {String}
   */
  removeBind(bid) {
    const pathname = `/api/binds/${bid}`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }
  /**
   * GraphQL api
   *   type Query {
   *    user(name: String!): User
   *    user(name: Enum!): User
   *    user(id: Int!): User
   *    bind(name: String!): Bind
   *    bind(name: Enum!): Bind
   *    users(from: Int, size: Int): [User]
   *    total: Int
   *   }
   *   type User {
   *    id: Int
   *    name: String
   *    extra: Extra
   *    binds: [Bind]
   *    created_at: Int
   *   }
   *   type Bind {
   *    id: Int
   *    user_id: Int
   *    user: User
   *    name: String
   *    service: String
   *    extra: Extra
   *    created_at: Int
   *   }
   *   type Extra {
   *
   *   }
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
   * GraphQL by user api
   *   type Query {
   *    id: Int
   *    name: String
   *    extra: Extra
   *    binds: [Bind]
   *    created_at: Int
   *   }
   *   type User {
   *    id: Int
   *    name: String
   *    extra: Extra
   *    binds: [Bind]
   *    created_at: Int
   *   }
   *   type Bind {
   *    id: Int
   *    user_id: Int
   *    user: User
   *    name: String
   *    service: String
   *    extra: Extra
   *    created_at: Int
   *   }
   *   type Extra {
   *
   *   }
   * @function CoinService::graphqlByUser
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphqlByUser(uidOrName, query) {
    const pathname = `/api/users/${uidOrName}/graphql/`;
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }
  /**
   * GraphQL by bind api
   *   type Query {
   *    id: Int
   *    user_id: Int
   *    user: User
   *    name: String
   *    service: String
   *    extra: Extra
   *    created_at: Int
   *   }
   *   type User {
   *    id: Int
   *    name: String
   *    extra: Extra
   *    binds: [Bind]
   *    created_at: Int
   *   }
   *   type Bind {
   *    id: Int
   *    user_id: Int
   *    user: User
   *    name: String
   *    service: String
   *    extra: Extra
   *    created_at: Int
   *   }
   *   type Extra {
   *
   *   }
   * @function CoinService::graphqlByBind
   * @async
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphqlByBind(name, query) {
    const pathname = `/api/binds/${name}/graphql/`;
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }
}
