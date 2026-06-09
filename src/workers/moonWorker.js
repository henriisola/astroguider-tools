const path = require('path');
const swe = require('../../lib/native/swisseph/build/Release/swisseph.node');

// Aseta efemeridien polku (suhteessa tähän tiedostoon)
const ephPath = path.resolve(__dirname, '../../../swisseph_data');
swe.swe_set_ephe_path(ephPath);

// Valinnainen: käytetään Lahiri-ayanamsaa sideraaliseen laskentaan
swe.swe_set_sid_mode(swe.SIDM_LAHIRI, 0, 0);

// Kuuntelee stdin:ää (esim. kun parent prosessi lähettää JSONia)
process.stdin.on('data', (data) => {
  try {
    const { julianDay } = JSON.parse(data);

    const moonData = swe.calcPlanet(julianDay, 1); // 1 = SE_MOON

    const result = {
      moon: moonData,
    };

    process.stdout.write(JSON.stringify(result));
  } catch (err) {
    process.stderr.write(`[moonWorker error]: ${err.message}`);
    process.exit(1);
  }
});
