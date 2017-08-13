import sortBy from 'lodash.sortby';
import keys   from 'lodash.keys';

export function joinJSON(v) {
  if (Array.isArray(v)) {
    return v.map((v1) => joinJSON(v1)).join('');
  } else if (typeof v === 'object') {
    return sortBy(keys(v)).map((k) => {
      return k + joinJSON(v[k]);
    }).join('');
  } else if (typeof v === 'boolean') {
    if (v) {
      return 'true';
    } else {
      return 'false';
    }
  } else {
    return '' + v;
  }
}
