import Gateway from 'yuntan-gateway';

export default class FuncService extends Gateway {
  run({ func, ...other }) {
    const pathname = `/function/${func}`;
    return this.request({ method: 'POST', pathname, ...other });
  }
}
