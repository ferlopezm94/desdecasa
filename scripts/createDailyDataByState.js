// eslint-disable-next-line
const moment = require('moment-timezone');
// eslint-disable-next-line
const fs2 = require('fs');
// eslint-disable-next-line
const utils = require('./utils');

const dailyDataByState = utils.initialDailyDataByState;
const dates = utils.dailyDates;

const DAILY_STATE_DATA_FILENAME = './../src/data/total.json';

const createDailyDataByState = () => {
  console.log('create-daily-data-by-state start');

  const states = Object.keys(dailyDataByState);

  dates.forEach(date => {
    console.log('date', date);
    // eslint-disable-next-line
    const dailyData = require(`./../src/data/${date}.json`);
    states.forEach(stateName => {
      if (stateName === 'Dates') {
        dailyDataByState['Dates'].dates.push(moment(date).format('YYYY-MM-DD'));
      } else {
        const confirmed = dailyData[stateName].confirmed;
        const negatives = dailyData[stateName].negatives;
        const suspects = dailyData[stateName].suspects;
        const deaths = dailyData[stateName].deaths;

        dailyDataByState[stateName].confirmed.push(confirmed);
        dailyDataByState[stateName].negatives.push(negatives);
        dailyDataByState[stateName].suspects.push(suspects);
        dailyDataByState[stateName].deaths.push(deaths);

        if (stateName === 'Total') {
          if (dailyData[stateName].tests) {
            const tests = dailyData[stateName].tests;
            dailyDataByState[stateName].tests.push(tests);
          }

          if (dailyData[stateName].nonSeriousCases) {
            const nonSeriousCases = dailyData[stateName].nonSeriousCases;
            dailyDataByState[stateName].nonSeriousCases.push(nonSeriousCases);
          } else {
            dailyDataByState[stateName].nonSeriousCases.push(0);
          }

          if (dailyData[stateName].hospitalizedCases) {
            const hospitalizedCases = dailyData[stateName].hospitalizedCases;
            dailyDataByState[stateName].hospitalizedCases.push(hospitalizedCases);
          } else {
            dailyDataByState[stateName].hospitalizedCases.push(0);
          }
        }
      }
    });
  });

  fs2.writeFileSync(`${__dirname}/${DAILY_STATE_DATA_FILENAME}`, JSON.stringify(dailyDataByState));
};

createDailyDataByState();
