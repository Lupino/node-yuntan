import Gateway from 'yuntan-gateway';

export default class CoinService extends Gateway {
  constructor(options) {
    super({...options, secure: true})
  }
  getScore(name) {
    const pathname = `/api/coins/${name}/score/`;
    return this.requestJSON({ pathname }, "score");
  }
  getInfo(name) {
    const pathname = `/api/coins/${name}/info/`;
    return this.requestJSON({ pathname });
  }
  putInfo({ name, ...json }) {
    const pathname = `/api/coins/${name}/info/`;
    return this.requestJSON({ pathname, method: 'PUT', json });
  }
  getList({ name, ...query }) {
    const pathname = `/api/coins/${name}/`;
    return this.requestJSON({ pathname, query });
  }
  save({name, ...form}) {
    const pathname = `/api/coins/${name}/`;
    return this.requestJSON({ pathname, method: 'POST', form }, 'score');
  }
  graphql(query) {
    const pathname = '/api/graphql/';
    return this.requestJSON({ pathname, method: 'POST', form: { query } });
  }
}
