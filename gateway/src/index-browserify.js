import RawGateway from './gateway';
import {signJSON} from './sha256-browserify';

/** Abstract class for yuntan service on browser.
 *  Every service should extend this class.
 *  @class GatewayForBrowser
 *  @param {Object} config Service config
 *  @param {String} [config.host=https://gw.huabot.com] Service host
 *  @param {String} config.key Service key
 *  @param {signSecret} [config.signSecret] dynamic secret sign function
 *  @param {Boolean} [config.secure=false] Is a secure service
 */
export default class Gateway extends RawGateway {
  /* eslint-disable require-jsdoc */
  constructor(config) {
    super(config, {signJSON, signParam: signJSON, jsapi: true});
  }
  /* eslint-enable require-jsdoc */
}
