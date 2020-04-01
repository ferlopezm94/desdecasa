/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

const statesNames = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Estado de México',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve(`src/templates/index.tsx`);

  statesNames.forEach(stateName => {
    const path = stateName
      .toLowerCase()
      .replace(new RegExp(' ', 'g'), '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    console.log('state', stateName, path);

    createPage({
      path,
      component: template,
      context: {
        stateName,
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
