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
  upload(fileName, raw) {
    const pathname = '/api/upload/';
    return this.requestJSON({pathname, method: 'PUT', raw, query: {fileName}});
  }

  /* eslint-disable camelcase */
  create({title, summary = '', content = '', from_url = uuid(),
    created_at = Math.floor( new Date() / 1000 )}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content, from_url,
        created_at}}, 'article');
  }
  /* eslint-enable camelcase */

  update(artId, {title = '', summary = '', content = ''}) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content}}, 'article');
  }

  /* eslint-disable camelcase */
  updateCover(artId, file_id) {
    const pathname = `/api/articles/${artId}/cover`;
    return this.requestJSON({pathname, method: 'POST', form: {file_id}},
      'result');
  }
  /* eslint-enable camelcase */

  removeCover(artId) {
    const pathname = `/api/articles/${artId}/cover`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  updateExtra(artId, extra) {
    const pathname = `/api/articles/${artId}/extra`;
    return this.requestJSON({pathname, method: 'POST', form: {extra}},
      'result');
  }

  removeExtra(artId, extra) {
    const pathname = `/api/articles/${artId}/extra`;
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}},
      'result');
  }

  clearExtra(artId) {
    const pathname = `/api/articles/${artId}/extra/clear`;
    return this.requestJSON({pathname, method: 'POST'}, 'result');
  }

  remove(artId) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  get(artId) {
    const pathname = `/api/articles/${artId}/`;
    return this.requestJSON({pathname}, 'article');
  }

  /* eslint-disable camelcase */
  exists(from_url) {
    const pathname = '/api/check/';
    return this.requestJSON({pathname, from: {from_url}}, 'id');
  }
  /* eslint-enable camelcase */

  getList({from = 0, size = 10} = {}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  createTag(tag) {
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, method: 'POST', form: {tag}}, 'tag');
  }

  getTag(tagId) {
    const pathname = `/api/tags/${tagId}/`;
    return this.requestJSON({pathname}, 'tag');
  }

  addArticleTag(artId, tag) {
    const pathname = `/api/articles/${artId}/tags/`;
    return this.requestJSON({pathname, method: 'POST', form: {tag}}, 'result');
  }

  removeArticleTag(artId, tag) {
    const pathname = `/api/articles/${artId}/tags/`;
    return this.requestJSON({pathname, method: 'DELETE', form: {tag}},
      'result');
  }

  updateTag(tagId, tag) {
    const pathname = `/api/tags/${tagId}/`;
    return this.requestJSON({pathname, method: 'POST', form: {tag}}, 'result');
  }

  getTagByName(tag) {
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, query: {tag}}, 'tag');
  }

  /* eslint-disable camelcase */
  createTimeline(timeline, art_id) {
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, method: 'POST', form: {art_id}},
      'result');
  }
  /* eslint-enable camelcase */

  removeTimeline(timeline, artId) {
    const pathname = `/api/timeline/${timeline}/${artId}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  getTimelineList(timeline, {from = 0, size = 10} = {}) {
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  saveTimelineMeta(timeline, {title = '', summary = ''}) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary}}, 'result');
  }

  getTimelineMeta(timeline) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname});
  }

  removeTimelineMeta(timeline) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }
}
