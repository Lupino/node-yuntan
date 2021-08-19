import Gateway from 'yuntan-gateway';


/**
 * ArticleService
 * @class ArticleService
 * @param {Object} config Service config
 * @param {String} [config.host=https://gw.huabot.com] Service host
 * @param {String} config.key Service key
 * @param {String} [config.secret] Service secret
 * @param {signSecret} [config.signSecret] dynamic secret sign function
 */
export default class ArticleService extends Gateway {
  saveFile(fileKey, bucket = 'upload', extra = {}) {
    const pathname = `/api/file/${fileKey}`;
    if (typeof extra !== 'string') {
      extra = JSON.stringify(extra);
    }
    return this.requestJSON({pathname, method: 'POST', form: {bucket, extra}});
  }

  getFile(fileKey) {
    const pathname = `/api/file/${fileKey}`;
    return this.requestJSON({pathname});
  }

  removeFile(fileKey) {
    const pathname = `/api/file/${fileKey}`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /* eslint-disable camelcase */
  create({title, summary = '', content = '',
    created_at = Math.floor( new Date() / 1000 )}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content, created_at}});
  }
  /* eslint-enable camelcase */

  update(artId, {title = '', summary = '', content = ''}) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content}});
  }

  /* eslint-disable camelcase */
  updateCover(artId, file_id) {
    const pathname = `/api/articles/${artId}/cover`;
    return this.requestJSON({pathname, method: 'POST', form: {file_id}});
  }
  /* eslint-enable camelcase */

  removeCover(artId) {
    const pathname = `/api/articles/${artId}/cover`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  getExtra(artId, extra_keys = []) {
    const pathname = `/api/articles/${artId}/extra`;
    return this.requestJSON({pathname, query: {extra_keys: extra_keys.join(',')}});
  }

  updateExtra(artId, extra) {
    if (typeof extra !== 'string') {
      extra = JSON.stringify(extra);
    }
    const pathname = `/api/articles/${artId}/extra`;
    return this.requestJSON({pathname, method: 'POST', form: {extra}});
  }

  removeExtra(artId, extra) {
    if (typeof extra !== 'string') {
      extra = JSON.stringify(extra);
    }
    const pathname = `/api/articles/${artId}/extra`;
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}});
  }

  clearExtra(artId) {
    const pathname = `/api/articles/${artId}/extra/clear`;
    return this.requestJSON({pathname, method: 'POST'});
  }

  remove(artId) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /**
   * Get article by id
   * @private
   * @async
   * @function ArticleService::get
   * @param {String} artId article id
   * @param {Object} options options
   * @param {[]String} [options.extra_keys=[]] pickup extra by extra_keys
   * @param {[]String} [options.content_keys=[]] pickup content by content_keys
   * @param {String} [options.content_json] decode content with json
   * @param {String} [options.tag] filter by tag
   * @param {String} [options.tag_id] filter by tag
   * @param {String} [options.jl] Functional sed for JSON see https://github.com/chrisdone/jl
   * @return {json}
   */
  get(artId, {extra_keys = [], content_keys = [], content_json, jl, tag, tag_id} = {}) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname, query: {
      extra_keys: extra_keys.join(','),
      content_keys: content_keys.join(','),
      tag,
      tag_id,
      content_json,
      jl
    }});
  }

  /**
   * Get article list
   * @private
   * @async
   * @function ArticleService::getList
   * @param {Object} options options
   * @param {Number} [options.from=0]
   * @param {Number} [options.size=10]
   * @param {[]String} [options.extra_keys=[]] pickup extra by extra_keys
   * @param {[]String} [options.content_keys=[]] pickup content by content_keys
   * @param {String} [options.content_json] decode content with json
   * @param {String} [options.jl] Functional sed for JSON see https://github.com/chrisdone/jl
   * @return {json}
   */
  getList({from = 0, size = 10, extra_keys = [], content_keys = [], content_json, jl} = {}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, query: {
      from,
      size,
      extra_keys: extra_keys.join(','),
      content_keys: content_keys.join(','),
      content_json,
      jl
    }});
  }

  createTag(tag) {
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, method: 'POST', form: {tag}});
  }

  getTag(tagId) {
    const pathname = `/api/tags/${tagId}/`;
    return this.requestJSON({pathname});
  }

  addArticleTag(artId, tag) {
    const pathname = `/api/articles/${artId}/tags/`;
    return this.requestJSON({pathname, method: 'POST', form: {tag}});
  }

  removeArticleTag(artId, tag) {
    const pathname = `/api/articles/${artId}/tags/`;
    return this.requestJSON({pathname, method: 'DELETE', form: {tag}});
  }

  updateTag(tagId, tag) {
    const pathname = `/api/tags/${tagId}/`;
    return this.requestJSON({pathname, method: 'POST', form: {tag}});
  }

  getTagByName(tag) {
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, query: {tag}});
  }

  /* eslint-disable camelcase */
  createTimeline(timeline, art_id) {
    const pathname = `/api/timeline/${timeline}/${art_id}/`;
    return this.requestJSON({pathname, method: 'POST'});
  }
  /* eslint-enable camelcase */

  removeTimeline(timeline, artId) {
    const pathname = `/api/timeline/${timeline}/${artId}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  /**
   * Get timeline list
   * @private
   * @async
   * @function ArticleService::getTimelineList
   * @param {String} timeline timeline name
   * @param {Object} options options
   * @param {Number} [options.from=0]
   * @param {Number} [options.size=10]
   * @param {[]String} [options.extra_keys=[]] pickup extra by extra_keys
   * @param {[]String} [options.content_keys=[]] pickup content by content_keys
   * @param {String} [options.content_json] decode content with json
   * @param {String} [options.jl] Functional sed for JSON see https://github.com/chrisdone/jl
   * @return {json}
   */
  getTimelineList(timeline, {from = 0, size = 10, extra_keys = [], content_keys = [], content_json, jl} = {}) {
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, query: {
      from,
      size,
      extra_keys: extra_keys.join(','),
      content_keys: content_keys.join(','),
      content_json,
      jl
    }});
  }

  saveTimelineMeta(timeline, {title = '', summary = ''}) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary}});
  }

  getTimelineMeta(timeline) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname});
  }

  removeTimelineMeta(timeline) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  graphql(query, file_extra={}, article_extra = {}) {
    const pathname = '/api/graphql/';
    if (typeof file_extra !== 'string') {
      file_extra = JSON.stringify(file_extra);
    }
    if (typeof article_extra !== 'string') {
      article_extra = JSON.stringify(article_extra);
    }
    return this.requestJSON({pathname, method: 'POST', form: {query, file_extra, article_extra}});
  }

  graphqlByArticle(id, query, file_extra={}, article_extra = {}) {
    const pathname = `/api/articles/${id}/graphql/`;
    if (typeof file_extra !== 'string') {
      file_extra = JSON.stringify(file_extra);
    }
    if (typeof article_extra !== 'string') {
      article_extra = JSON.stringify(article_extra);
    }
    return this.requestJSON({pathname, method: 'POST', form: {query, file_extra, article_extra}});
  }

  checkAlias(alias) {
    const pathname = `/api/alias/${alias}`;
    return this.requestJSON({pathname});
  }

  removeAlias(alias) {
    const pathname = `/api/alias/${alias}`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  saveAlias(artId, alias) {
    const pathname = `/api/articles/${artId}/alias`;
    return this.requestJSON({pathname, method: 'POST', form: {alias}});
  }

}
