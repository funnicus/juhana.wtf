/**
 * @file The cache in this file makes development a little less painful.
 * Not that useful in prod, since everything is static site generated.
 */

import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 1000, checkperiod: 120 });

export default cache;
