import {HMAC} from "fast-sha256";
import { joinJSON } from './utils';

export function signJSON(secret, v) {
  const h = new HMAC(secret);
  return h.update(joinJSON(v)).digest().toUpperCase()
}

