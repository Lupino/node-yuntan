import { joinJSON } from './utils';
import sha256 from 'js-sha256';

export function signJSON(secret, v) {
  return sha256.hmac(secret, joinJSON(v)).toUpperCase();
}
