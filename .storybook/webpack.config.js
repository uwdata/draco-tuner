const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ config, mode }) => {
  config.module.rules = config.module.rules.filter(
    rule => rule.test.toString() !== '/\\.css$/'
  );
  
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });

  config.module.rules.push(
    // local css loading
    {
      test: /\.css$/,
      exclude: [/\.global.css$/, /node_modules/],
      use: [
        {
          loader: require.resolve('style-loader')
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoader: 1,
            modules: true,
            localIdentName: '[name]__[local]'
          }
        }
      ]
    }
  );

  config.module.rules.push( // global css loading
    {
      test: /\global.css$/,
      use: [require.resolve('style-loader'), require.resolve('css-loader')]
    }
  );

  config.module.rules.push(
    // external css loading
    {
      test: /\.css$/,
      include: [path.resolve(__dirname, 'node_modules')],
      use: [require.resolve('style-loader'), require.resolve('css-loader')]
    }
  );

  config.module.rules.push(
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
      loader: require.resolve('url-loader'),
      options: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]',
      },
    }
  );

  config.plugins.push(
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  );

  config.resolve.extensions.push('.ts', '.tsx', '.js', '.json');
  return config;
};
