import Gateway from 'yuntan-gateway';

export class FileService extends Gateway {
  put(fileName, raw) {
    const pathname = `/file/${fileName}`;
    return this.request({ method: 'PUT', pathname, raw });
  }
  get(fileName) {
    const pathname = `/file/${fileName}`;
    return this.request({ pathname });
  }
  remove(fileName) {
    const pathname = `/file/${fileName}`;
    return this.request({ method: 'DELETE', pathname });
  }
}
