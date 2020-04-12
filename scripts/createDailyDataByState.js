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
        dailyDataByState['Dates'].dates.push(moment(date).format('DD[/]MM'));
      } else {
        const confirmed = dailyData[stateName].confirmed;
        const negatives = dailyData[stateName].negatives;
        const suspects = dailyData[stateName].suspects;
        const deaths = dailyData[stateName].deaths;

        dailyDataByState[stateName].confirmed.push(confirmed);
        dailyDataByState[stateName].negatives.push(negatives);
        dailyDataByState[stateName].suspects.push(suspects);
        dailyDataByState[stateName].deaths.push(deaths);

        if (dailyData[stateName].tests) {
          const tests = dailyData[stateName].tests;
          dailyDataByState[stateName].tests.push(tests);
        }
      }
    });
  });

  fs2.writeFileSync(`${__dirname}/${DAILY_STATE_DATA_FILENAME}`, JSON.stringify(dailyDataByState));
};

createDailyDataByState();
