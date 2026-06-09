// shared/initSWE.js
const path = require('path');

function initSWE() {
  const swe = require(path.join(process.cwd(), 'lib/native/swisseph/build/Release/swisseph.node'));
  swe.swe_set_ephe_path(path.join(process.cwd(), 'lib/native/swisseph/swisseph_data'));
  swe.swe_set_sid_mode(swe.SIDM_LAHIRI || 1, 0, 0);
  const flags = swe.SEFLG_SIDEREAL || 64;
  return { swe, flags };
}

module.exports = initSWE;
