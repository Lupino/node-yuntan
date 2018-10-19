import Gateway from 'yuntan-gateway';
import uuid from 'uuid/v4';


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

  /* eslint-disable camelcase */
  create({title, summary = '', content = '', from_url = uuid(),
    created_at = Math.floor( new Date() / 1000 )}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content, from_url,
        created_at}});
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

  get(artId) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname});
  }

  /* eslint-disable camelcase */
  exists(from_url) {
    const pathname = '/api/check/';
    return this.requestJSON({pathname, query: {from_url}});
  }
  /* eslint-enable camelcase */

  getList({from = 0, size = 10} = {}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, query: {from, size}});
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
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, method: 'POST', form: {art_id}});
  }
  /* eslint-enable camelcase */

  removeTimeline(timeline, artId) {
    const pathname = `/api/timeline/${timeline}/${artId}/`;
    return this.requestJSON({pathname, method: 'DELETE'});
  }

  getTimelineList(timeline, {from = 0, size = 10} = {}) {
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, query: {from, size}});
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

  graphql(query) {
    const pathname = '/api/graphql/';
    return this.requestJSON({pathname, method: 'POST', form: {query}});
  }

}
