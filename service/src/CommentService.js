import Gateway from 'yuntan-gateway';

/**
 * CommentService
 * @class CommentService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class CommentService extends Gateway {
  /**
   * Create new comment
   * @function CommentService::create
   * @async
   * @param {String} for comment for
   * @param {Object} comment Comment object
   * @param {Strig} comment.who who comment
   * @param {Strig} comment.comment comment content
   * @return {Object} comment Comment object
   * @return {Number} comment.id Comment id
   * @return {String} comment.for Comment for
   * @return {String} comment.who Comment who
   * @return {String} comment.comment Comment content
   * @return {Number} comment.created_at Comment created time
   */
  create(for_, {who, comment}) {
    const pathname = `/api/comments/${for_}/`;
    return this.requestJSON({pathname, method: 'POST', form: {who, comment}});
  }

  /**
   * Get comment list
   * @function CommentService::getList
   * @async
   * @param {String} for comment for
   * @param {Object} [query] query string
   * @param {Number} [query.from=0]
   * @param {Number} [query.size=10]
   * @return {Number} from
   * @return {Number} size
   * @return {Number} total
   * @return {Comment[]} comments
   */
  getList(for_, {from = 0, size = 10} = {}) {
    const pathname = `/api/comments/${for_}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  /**
   * Get a comment
   * @function CommentService::get
   * @async
   * @param {Number} id
   * @return {Comment}
   */
  get(cid) {
    const pathname = `/api/comment/${cid}/`;
    return this.requestJSON({pathname});
  }

  /**
   * Remove a comment
   * @function CommentService::remove
   * @async
   * @param {Number} id
   * @return {String} 'OK'
   */
  remove(cid) {
    const pathname = `/api/comment/${cid}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /**
   * Get comment list
   * @function CommentService::getList
   * @async
   * @param {String} for comment for
   * @return {String} 'OK'
   */
  removeList(for_) {
    const pathname = `/api/comments/${for_}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }
}
