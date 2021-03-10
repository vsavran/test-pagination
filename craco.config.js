const path = require('path')
const {
  addBeforeLoader,
  loaderByName,
  whenDev,
  ESLINT_MODES,
} = require('@craco/craco')
const CracoEsbuildPlugin = require('craco-esbuild')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      '@loadable/babel-plugin',
      [
        'babel-plugin-styled-components',
        {
          fileName: true,
          minify: true,
          transpileTemplateLiterals: false,
          displayName: true,
          pure: true,
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
    },
  ],

  webpack: {
    plugins: [
      new LoadablePlugin(),
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/,
            failOnError: true,
          }),
        ],
        [],
      ),
    ],

    configure: (webpackConfig, { paths }) => {
      const nextConfig = webpackConfig

      addBeforeLoader(nextConfig, loaderByName('url-loader'), {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        include: paths.appSrc,
      })

      addBeforeLoader(nextConfig, loaderByName('url-loader'), {
        test: /\.(graphql|gql)$/,
        loader: 'graphql-tag/loader',
        include: paths.appSrc,
      })

      addBeforeLoader(nextConfig, loaderByName('url-loader'), {
        test: /\.(mp3)$/,
        loader: 'url-loader',
        include: paths.appSrc,
      })

      if (nextConfig.optimization) {
        nextConfig.optimization.splitChunks.name = true
      }

      nextConfig.resolve.modules.push(path.join(process.cwd(), 'src'))

      return nextConfig
    },
  },
}
