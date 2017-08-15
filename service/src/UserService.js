import Gateway from 'yuntan-gateway';

export default class UserService extends Gateway {
  constructor(options) {
    super({...options, secure: true});
  }
  getList({ from = 0, size = 10 } = {}) {
    const pathname = '/api/users/';
    return this.requestJSON({ pathname, query: { from, size } });
  }
  create({ username, passwd }) {
    const pathname = '/api/users/';
    return this.requestJSON({ pathname, method: 'POST', form: { username, passwd } });
  }
  get(uidOrName) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({ pathname });
  }
  remove(uidOrName) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({ pathname, method: 'DELETE' });
  }
  updateName(uidOrName, username) {
    const pathname = `/api/users/${uidOrName}/`;
    return this.requestJSON({ pathname, method: 'POST', form: { username } });
  }
  updatePassword(uidOrName, passwd) {
    const pathname = `/api/users/${uidOrName}/passwd`;
    return this.requestJSON({ pathname, method: 'POST', form: { passwd } });
  }
  updateExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({ pathname, method: 'POST', form: { extra } });
  }
  removeExtra(uidOrName, extra) {
    const pathname = `/api/users/${uidOrName}/extra`;
    extra = JSON.stringify(extra);
    return this.requestJSON({ pathname, method: 'DELETE', form: { extra } });
  }
  clearExtra(uidOrName) {
    const pathname = `/api/users/${uidOrName}/extra/clear`;
    return this.requestJSON({ pathname, method: 'POST' });
  }
  verifyPassword(uidOrName, passwd) {
    const pathname = `/api/users/${uidOrName}/verify`;
    return this.requestJSON({ pathname, method: 'POST', form: { passwd } });
  }
  createBind(uidOrName, { service, name, extra = {} }) {
    const pathname = `/api/users/${uidOrName}/binds`;
    extra = JSON.stringify(extra);
    return this.requestJSON({ pathname, method: 'POST', form: { service, name, extra } });
  }
  getBind(name) {
    const pathname = '/api/binds/';
    return this.requestJSON({ pathname, query: { name } });
  }
  removeBind(uidOrName, bid) {
    const pathname = `/api/binds/${bid}`;
    return this.requestJSON({ pathname, method: 'DELETE' });
  }
  graphql(query) {
    const pathname = '/api/graphql/';
    return this.requestJSON({ pathname, method: 'POST', form: { query } });
  }
}
