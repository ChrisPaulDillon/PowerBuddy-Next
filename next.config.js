const withTM = require('next-transpile-modules')([
  // Those packages needs to be transpiled to be sure they pass `es-check es5`
  'axios',
  '@chakra-ui/core',
  'react-icons',
  '@chakra-ui',
]);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

// next.config.js
// const withTM = require('next-transpile-modules')(['react-spring', 'swr', 'toasted-notes', '@chakra-ui']); // pass the modules you would like to see transpiled

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
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
      NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
      NEXT_PUBLIC_SENTRY_RELEASE: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      // Important: return the modified config
      // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))
      config.module.rules.push({
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        exclude: /node_modules/,
      });

      // Ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      return config;
    },
  })
);
