const withTM = require('next-transpile-modules')([
  //transpiled to be sure they pass `es-check es5`
  'axios',
  '@chakra-ui/core',
  'react-icons',
  '@chakra-ui',
]);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX(
  withTM({
    target: 'serverless',
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

    // Runtime Configuration: https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    serverRuntimeConfig: {
      // Will only be available on the server side
    },
    publicRuntimeConfig: {
    },
    env: {
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // if (isServer) {
      //   require('./util/generateSiteMap')
      // }

      return config;
    },
  }),
);
