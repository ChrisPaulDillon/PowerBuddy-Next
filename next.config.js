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
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

    // Runtime Configuration: https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    serverRuntimeConfig: {
      // Will only be available on the server side
    },
    publicRuntimeConfig: {
      // // Will be available on both server and client
      SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME, //'http://test.adultlite.net:3000',
      APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL, //'http://test.adultlite.net:3000',
      API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, //'http://webapi.adultlite.net',
      SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN, //key provided by Sentry installation instructions
      SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT, //dev or production
      SENTRY_RELEASE: process.env.NEXT_PUBLIC_SENTRY_RELEASE, //key provided by Sentry installation instructions

      DESKTOP_URL: process.env.NEXT_PUBLIC_DESKTOP_URL, //https://www.adultlite.net
      MOBILE_URL: process.env.NEXT_PUBLIC_MOBILE_URL, //https://www.adultlite.net/ios

      DISABLE_HEADER_X_FORWARDED_FOR: process.env.NEXT_PUBLIC_DISABLE_HEADER_X_FORWARDED_FOR, // disables sending the x-forwarded-for header

      BITMOVIN_PLAYER_KEY: process.env.NEXT_PUBLIC_BITMOVIN_PLAYER_KEY,
      BITMOVIN_ANALYTICS_KEY: process.env.NEXT_PUBLIC_BITMOVIN_ANALYTICS_KEY,
      MOVIES_RESOURCE_TOKEN_NAME: process.env.NEXT_PUBLIC_MOVIES_RESOURCE_TOKEN_NAME,
      COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      MAX_CONCURRENT_MOVIE_UPLOADS: process.env.NEXT_PUBLIC_MAX_CONCURRENT_MOVIE_UPLOADS,

      DD_RUM_APPID: process.env.DD_RUM_APPID,
      DD_RUM_TOKEN: process.env.DD_RUM_TOKEN,
      DD_RUM_SITE: process.env.DD_RUM_SITE,
      DD_SERVICE: process.env.DD_SERVICE,
      DD_ENV: process.env.DD_ENV,
      DD_VERSION: process.env.DD_VERSION,
      DD_RUM_SAMPLE_RATE: process.env.DD_RUM_SAMPLE_RATE,
      DD_RUM_TRACK_INTERACTIONS: process.env.DD_RUM_TRACK_INTERACTIONS,
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
