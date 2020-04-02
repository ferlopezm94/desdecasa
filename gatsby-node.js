/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const today = require('./src/data/2020-04-01.json');
const yesterday = require('./src/data/2020-03-31.json');

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve('src/templates/index.tsx');

  if (Object.keys(today).length !== Object.keys(yesterday).length) {
    throw new Error(
      `Length mismatch ${Object.keys(today).length} !== ${Object.keys(yesterday).length}`,
    );
  }

  Object.keys(today).forEach(stateName => {
    const path =
      stateName === 'Total'
        ? '/'
        : stateName
            .toLowerCase()
            .replace(new RegExp(' ', 'g'), '-')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    const todayData = today[stateName];
    const yesterdayData = yesterday[stateName];

    if (!todayData || !yesterdayData) {
      throw new Error(`Data unavailable for ${stateName}`);
    }

    console.log('state', stateName, path);

    createPage({
      path,
      component: template,
      context: {
        slug: path,
        stateName: stateName === 'Total' ? 'México' : stateName,
        today: todayData,
        yesterday: yesterdayData,
        date: '2020-03-31',
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /amplitude-js/,
            use: loaders.null(),
          },
          {
            test: /react-ga/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
