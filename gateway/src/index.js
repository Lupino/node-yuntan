import RawGateway from './gateway';
import {signJSON, signParam} from './sha256';

/** Abstract class for yuntan service on node.
 *  Every service should extend this class.
 *  @class GatewayForNode
 *  @param {Object} config Service config
 *  @param {String} [config.host=https://gw.huabot.com] Service host
 *  @param {String} config.key Service key
 *  @param {String} [config.secret] Service secret
 *  @param {Boolean} [config.secure=false] Is a secure service
 */
export default class Gateway extends RawGateway {
  /* eslint-disable require-jsdoc */
  constructor(config) {
    super(config, {signJSON, signParam});
  }
  /* eslint-enable require-jsdoc */
}
