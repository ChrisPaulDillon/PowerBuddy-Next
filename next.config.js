const withTM = require('next-transpile-modules')([
  //transpiled to be sure they pass `es-check es5`
  'axios',
  '@chakra-ui/react',
  'react-icons',
  '@chakra-ui',
]);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

const nextBuildId = require('next-build-id');

module.exports = {
  generateBuildId: () => nextBuildId({ dir: __dirname })
};

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
      //   require('./scripts/generate-sitemap');
      // }

      return config;
    },
  })
);
