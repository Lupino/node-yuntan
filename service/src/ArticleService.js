import Gateway from 'yuntan-gateway';
import uuid from 'uuid/v4';


export default class ArticleService extends Gateway {
  upload(fileName, raw) {
    const pathname = '/api/upload/';
    return this.requestJSON({pathname, method: 'PUT', raw, query: {fileName}});
  }

  create({title, summary = '', content = '', from_url = uuid(),
    created_at = Math.floor( new Date() / 1000 )}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, method:'POST',
      form: {title, summary, content, from_url,
        created_at}}, 'article');
  }

  update(art_id, {title = '', summary = '', content = ''}){
    const pathname = `/api/articles/${art_id}/`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary, content}}, 'article');
  }

  updateCover(art_id, file_id) {
    const pathname = `/api/articles/${art_id}/cover`;
    return this.requestJSON({pathname, method: 'POST', form: {file_id}},
      'result');
  }

  removeCover(art_id) {
    const pathname = `/api/articles/${art_id}/cover`;
    return this.requestJSON({ pathname, method: 'DELETE'}, 'result');
  }

  updateExtra(art_id, extra) {
    const pathname = `/api/articles/${art_id}/extra`;
    return this.requestJSON({pathname, method: 'POST', form: {extra}},
      'result');
  }

  removeExtra(art_id, extra) {
    const pathname = `/api/articles/${art_id}/extra`;
    return this.requestJSON({pathname, method: 'DELETE', form: {extra}},
      'result');
  }

  clearExtra(art_id) {
    const pathname = `/api/articles/${art_id}/extra/clear`;
    return this.requestJSON({pathname, method: 'POST'}, 'result');
  }

  remove(art_id) {
    const pathname = `/api/articles/${art_id}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  get(art_id) {
    const pathname = `/api/articles/${art_id}/`;
    return this.requestJSON({pathname}, 'article');
  }

  exists(from_url) {
    const pathname = '/api/check/';
    return this.requestJSON({pathname, from: {from_url}}, 'id');
  }

  getList({ from = 0, size = 10 } = {}) {
    const pathname = '/api/articles/';
    return this.requestJSON({pathname, query: {from, size}});
  }

  createTag(tag){
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, method: 'POST', form: {tag}}, 'tag');
  }

  getTag(tag_id){
    const pathname = `/api/tags/${tag_id}/`;
    return this.requestJSON({pathname}, 'tag');
  }

  addArticleTag(art_id, tag){
    const pathname = `/api/articles/${art_id}/tags/`;
    return this.requestJSON({pathname, method: 'POST', form:{tag}}, 'result');
  }

  removeArticleTag(art_id, tag){
    const pathname = `/api/articles/${art_id}/tags/`;
    return this.requestJSON({pathname, method: 'DELETE', form:{tag}}, 'result');
  }

  updateTag(tag_id, tag) {
    const pathname = `/api/tags/${tag_id}/`;
    return this.requestJSON({pathname, method: 'POST', form:{tag}}, 'result');
  }

  getTagByName(tag){
    const pathname = '/api/tags/';
    return this.requestJSON({pathname, query: {tag}}, 'tag');
  }

  createTimeline(timeline, art_id){
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, method: 'POST', form: {art_id}},
      'result');
  }

  removeTimeline(timeline, art_id){
    const pathname = `/api/timeline/${timeline}/${art_id}/`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }

  getTimelineList(timeline, {from = 0, size = 10} = {}) {
    const pathname = `/api/timeline/${timeline}/`;
    return this.requestJSON({pathname, query: {from, size}});
  }

  saveTimelineMeta(timeline, {title = '', summary = ''}){
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'POST',
      form: {title, summary}}, 'result');
  }

  getTimelineMeta(timeline){
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname});
  }

  removeTimelineMeta(timeline) {
    const pathname = `/api/timeline/${timeline}/meta`;
    return this.requestJSON({pathname, method: 'DELETE'}, 'result');
  }
}
