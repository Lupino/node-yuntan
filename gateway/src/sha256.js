import sortBy from 'lodash.sortby';
import keys from 'lodash.keys';
import crypto from 'crypto';

import {joinJSON} from './utils';

/**
 * create signature with a secret and json
 * @function
 * @param {String} secret
 * @param {json} v
 * @return {String} hmac sha256 result
 */
export function signJSON(secret, v) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(joinJSON(v));
  return hmac.digest('hex').toUpperCase();
}

/**
 * create signature with a secret and http params
 * @function
 * @param {String} secret
 * @param {Params} v
 * @return {String} hmac sha256 result
 */
export function signParam(secret, v) {
  const hmac = crypto.createHmac('sha256', secret);
  for (let k of sortBy(keys(v))) {
    hmac.update(k);
    if (Buffer.isBuffer(v[k])) {
      hmac.update(v[k]);
      continue;
    }
    hmac.update('' + v[k]);
  }
  return hmac.digest('hex').toUpperCase();
}
