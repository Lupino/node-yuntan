import Gateway from 'yuntan-gateway';

export class FileService extends Gateway {
  save(fileName, raw) {
    const pathname = `/file/${fileName}`;
    return this.request({ method: 'PUT', pathname, raw });
  }
}
