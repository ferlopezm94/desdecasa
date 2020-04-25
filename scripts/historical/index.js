const fs2 = require('fs');
const moment = require('moment-timezone');

const { informationTotal, informationNewDaily, dailyDates } = require('./utils');

const TOTAL_DATA_FILENAME = './../../src/data/total.json';

const createHistoricalData = () => {
  console.log('create-historical-data start');

  const states = Object.keys(informationTotal);

  dailyDates.forEach(date => {
    console.log('date', date);

    const dailyData = require(`./../../src/data/${date}.json`);

    states.forEach(stateName => {
      switch (stateName) {
        case 'Dates':
          informationTotal['Dates'].dates.push(moment(date).format('YYYY-MM-DD'));
          informationNewDaily['Dates'].dates.push(moment(date).format('YYYY-MM-DD'));
          break;
        case 'Total':
          const { tests } = dailyData[stateName];
          informationTotal[stateName].tests.push(tests);
        default:
          const { confirmed, negatives, suspects, deaths } = dailyData[stateName];
          informationTotal[stateName].confirmed.push(confirmed);
          informationTotal[stateName].negatives.push(negatives);
          informationTotal[stateName].suspects.push(suspects);
          informationTotal[stateName].deaths.push(deaths);
          break;
      }
    });

    console.log(informationTotal);
  });

  fs2.writeFileSync(`${__dirname}/${TOTAL_DATA_FILENAME}`, JSON.stringify(informationTotal));
};

createHistoricalData();
