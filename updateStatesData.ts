// eslint-disable-next-line
const axios = require('axios');
// eslint-disable-next-line
const fs = require('fs');

const STATE_DATA_FILENAME = 'src/data';
const DATE = '2020-04-09';
const DATA_URL = 'https://ncov.sinave.gob.mx/Mapa.aspx/Grafica22';
const TESTS = 31496; //29578;
const NON_SERIOUS_CASES = 2401; // 70% 3441 Total;
const HOSPITALIZED_CASES = 1040; // 30% ;

const main = async () => {
  console.log('main start');
  const result = await axios.post(DATA_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataRaw = result.data.d;
  console.log('data-raw', dataRaw);

  // [index - 0, stateName - 1, unknown - 2, index - 3, confirmed - 4, negatives - 5, suspects - 6, deaths - 7]
  // [ '27', 'Tabasco', '2476693.928', '27', '48', '151', '178', '0' ],
  const dataParsed = JSON.parse(dataRaw);
  console.log('data-parsed', dataParsed);

  const states = {};
  let confirmed = 0;
  let negatives = 0;
  let suspects = 0;
  let deaths = 0;

  dataParsed.forEach(state => {
    confirmed += parseInt(state[4]);
    negatives += parseInt(state[5]);
    suspects += parseInt(state[6]);
    deaths += parseInt(state[7]);
    const object = {
      confirmed: parseInt(state[4]),
      negatives: parseInt(state[5]),
      suspects: parseInt(state[6]),
      deaths: parseInt(state[7]),
    };
    states[state[1]] = object;
  });

  const object = {
    confirmed,
    negatives,
    suspects,
    deaths,
    tests: TESTS,
    nonSeriousCases: NON_SERIOUS_CASES,
    hospitalizedCases: HOSPITALIZED_CASES,
  };
  states['Total'] = object;

  fs.writeFileSync(`${STATE_DATA_FILENAME}/${DATE}.json`, JSON.stringify(states));
};

main();
