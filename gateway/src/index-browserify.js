import RawGateway from './gateway';
import {signJSON} from './sha256-browserify';

/** Abstract class for yuntan service.
 *  Every service should extend this class.
 *  @class Gateway
 *  @param {json} config Service config
 */
export default class Gateway extends RawGateway {
  /* eslint-disable require-jsdoc */
  constructor(config) {
    super(config, {signJSON, signParam: signJSON, jsapi: true});
  }
  /* eslint-enable require-jsdoc */
}
