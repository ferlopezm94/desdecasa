const fs2 = require('fs');
const moment = require('moment-timezone');

const { informationTotal, informationNewDaily, dailyDates } = require('./utils');

const TOTAL_DATA_FILENAME = './../../src/data/historicalTotal.json';
const NEW_DAILY_DATA_FILENAME = './../../src/data/historicalNewDaily.json';

const createHistoricalData = () => {
  console.log('create-historical-data start');

  const states = Object.keys(informationTotal);

  dailyDates.forEach(date => {
    console.log('date', date);

    let computeNewDailyData = date !== '2020-03-30';
    let yesterdayDailyData;
    const dailyData = require(`./../../src/data/${date}.json`);

    if (computeNewDailyData) {
      const yesterdayDate = moment(date)
        .subtract(1, 'days')
        .format('YYYY-MM-DD');
      yesterdayDailyData = require(`./../../src/data/${yesterdayDate}.json`);
    }

    states.forEach(stateName => {
      switch (stateName) {
        case 'Dates':
          informationTotal['Dates'].dates.push(moment(date).format('YYYY-MM-DD'));
          informationNewDaily['Dates'].dates.push(moment(date).format('YYYY-MM-DD'));
          break;
        case 'Total':
          const { tests } = dailyData[stateName];
          informationTotal[stateName].tests.push(tests);

          // New daily data
          if (computeNewDailyData) {
            const { tests } = dailyData[stateName];
            const { tests: testsYesterday } = yesterdayDailyData[stateName];
            informationNewDaily[stateName].tests.push(tests - testsYesterday);
          } else {
            const { tests } = dailyData[stateName];
            informationNewDaily[stateName].tests.push(0);
          }
        default:
          // Total data
          const { confirmed, negatives, suspects, deaths } = dailyData[stateName];
          informationTotal[stateName].confirmed.push(confirmed);
          informationTotal[stateName].negatives.push(negatives);
          informationTotal[stateName].suspects.push(suspects);
          informationTotal[stateName].deaths.push(deaths);

          // New daily data
          if (computeNewDailyData) {
            const { confirmed, negatives, suspects, deaths } = dailyData[stateName];
            const {
              confirmed: confirmedYesterday,
              negatives: negativesYesterday,
              suspects: suspectsYesterday,
              deaths: deathsYesterday,
            } = yesterdayDailyData[stateName];

            informationNewDaily[stateName].confirmed.push(confirmed - confirmedYesterday);
            informationNewDaily[stateName].negatives.push(negatives - negativesYesterday);
            informationNewDaily[stateName].suspects.push(suspects - suspectsYesterday);
            informationNewDaily[stateName].deaths.push(deaths - deathsYesterday);
          } else {
            informationNewDaily[stateName].confirmed.push(0);
            informationNewDaily[stateName].negatives.push(0);
            informationNewDaily[stateName].suspects.push(0);
            informationNewDaily[stateName].deaths.push(0);
          }

          break;
      }
    });
  });

  fs2.writeFileSync(`${__dirname}/${TOTAL_DATA_FILENAME}`, JSON.stringify(informationTotal));
  fs2.writeFileSync(`${__dirname}/${NEW_DAILY_DATA_FILENAME}`, JSON.stringify(informationNewDaily));
};

createHistoricalData();
