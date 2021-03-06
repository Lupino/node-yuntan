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
    return this.requestJSON({pathname, method: 'DELETE'});
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
    return this.requestJSON({pathname, method: 'POST', form: {username}});
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
    return this.requestJSON({pathname, method: 'POST', form: {passwd}});
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
    return this.requestJSON({pathname, method: 'POST', form: {extra}});
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
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}});
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
    return this.requestJSON({pathname, method: 'POST'});
  }

  /**
   * Update user secure_extra info
   * @function UserService::updateSecureExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Object} extra User secure_extra info
   * @return {String}
   */
  updateSecureExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/secure_extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'POST', form: {extra}});
  }

  /**
   * Remove user secure_extra info
   * @function UserService::removeSecureExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Object} extra User secure_extra info
   * @return {String}
   */
  removeSecureExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/secure_extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}});
  }

  /**
   * Clear user secure_extra info
   * @function UserService::clearSecureExtra
   * @async
   * @param {String} uidOrName user_id or username
   * @return {String}
   */
  clearSecureExtra(uidOrName) {
    const pathname = `/api/users/${uidOrName}/secure_extra/clear`;
    return this.requestJSON({pathname, method: 'POST'});
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
    return this.requestJSON({pathname, method: 'POST', form: {passwd}});
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
   * @param {Number} bidOrName Bind ID or Bind name
   * @return {String}
   */
  removeBind(bidOrName) {
    const pathname = `/api/binds/${bidOrName}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /**
   * Update bind extra
   * @function UserService::updateBindExtra
   * @async
   * @param {Number} bidOrName Bind ID or Bind name
   * @param {Object} extra Bind extra value
   * @return {String}
   */
  updateBindExtra(bidOrName, extra) {
    const pathname = `/api/binds/${bidOrName}/`;
    extra = JSON.stringify(extra);
    return this.requestJSON({pathname, method: 'POST', form: {extra}});
  }

  /**
   * Get bind list by user
   * @function UserService::getBindListByUser
   * @async
   * @param {String} uidOrName user_id or username
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Bind[]} binds
   */
  getBindListByUser(uidOrName, {from = 0, size = 10} = {}) {
    const pathname = `/api/users/${uidOrName}/binds/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Get bind list by service
   * @function UserService::getBindListByService
   * @async
   * @param {String} service bind service
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Bind[]} binds
   */
  getBindListByService(service, {from = 0, size = 10} = {}) {
    const pathname = `/api/service/${service}/binds/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Get bind list by user and service
   * @function UserService::getBindListByUserAndService
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} service bind service
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Bind[]} binds
   */
  getBindListByUserAndService(uidOrName, service, {from = 0, size = 10} = {}) {
    const pathname = `/api/users/${uidOrName}/binds/${service}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Get user list by group
   * @function UserService::getListByGroup
   * @async
   * @param {String} group group name
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {User[]} users
   */
  getListByGroup(group, {from = 0, size = 10} = {}) {
    const pathname = `/api/groups/${group}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Create group
   * @function UserService::createGroup
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} group  group name
   * @return {String} ok
   */
  createGroup(uidOrName, group) {
    const pathname = `/api/groups/${group}/${uidOrName}/`;
    return this.requestJSON({pathname, method: 'POST'});
  }

  /**
   * Remove group
   * @function UserService::removeGroup
   * @async
   * @param {String} uidOrName user_id or username
   * @param {String} group  group name
   * @return {String} ok
   */
  removeGroup(uidOrName, group) {
    const pathname = `/api/groups/${group}/${uidOrName}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /**
   * GraphQL api
   *   type Query {
   *     user(name: String!): User
   *     user(name: Enum!): User
   *     user(id: Int!): User
   *     bind(name: String!): Bind
   *     bind(name: Enum!): Bind
   *     service(service: String!): Service
   *     service_binds(service: String!, from: Int, size: Int): [Bind]
   *     service_bind_count(service: String!)
   *     users(from: Int, size: Int): [User]
   *     user_count: Int
   *     group(group: String): Group
   *   }
   *   type Service {
   *     service: String
   *     binds(from: Int, size: Int): [Bind]
   *     bind_count: Int
   *   }
   *   type Group {
   *     group: String
   *     users(from: Int, size: Int): [User]
   *     user_count: Int
   *   }
   *   type User {
   *     id: Int
   *     name: String
   *     extra: Extra
   *     pick_extra(keys: [String]): Extra
   *     binds(from: Int, size: Int): [Bind]
   *     bind_count: Int
   *     groups: [String]
   *     service(service: String!): Service
   *     created_at: Int
   *   }
   *   type Bind {
   *     id: Int
   *     user_id: Int
   *     user: User
   *     name: String
   *     service: String
   *     extra: Extra
   *     pick_extra(keys: [String]): Extra
   *     created_at: Int
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
   * @function CoinService::graphqlByBind
   * @async
   * @param {String} name bind name
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphqlByBind(name, query) {
    const pathname = `/api/binds/${name}/graphql/`;
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }

  /**
   * GraphQL by service api
   * @function CoinService::graphqlByBind
   * @async
   * @param {String} service bind service
   * @param {String} query graphql query language
   * @return {Object}
   */
  graphqlByService(name, query) {
    const pathname = `/api/service/${name}/graphql/`;
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }

}
