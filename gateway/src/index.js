import RawGateway from './gateway';
import {signJSON, signParam} from './sha256';

/** Abstract class for yuntan service.
 *  Every service should extend this class.
 *  @class Gateway
 *  @param {json} config Service config
 */
export default class Gateway extends RawGateway {
  /* eslint-disable require-jsdoc */
  constructor(config) {
    super(config, {signJSON, signParam});
  }
  /* eslint-enable require-jsdoc */
}
