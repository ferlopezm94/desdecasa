/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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
          {
            test: /react-apexcharts/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};
