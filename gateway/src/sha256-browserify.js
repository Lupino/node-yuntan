import {joinJSON} from './utils';
import sha256 from 'js-sha256';

/**
 * create signature with a secret and json
 * @function
 * @param {String} secret
 * @param {json} v
 * @return {String} hmac sha256 result
 */
export function signJSON(secret, v) {
  return sha256.hmac(secret, joinJSON(v)).toUpperCase();
}
