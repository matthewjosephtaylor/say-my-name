const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
// const WebpackUserscript = require('webpack-userscript')
// const path = require('path')

const BUILD_TIME_MILLIS = new Date().getTime();
const projectPackage = require("./package.json");

module.exports = {
  // mode: 'development',
  mode: "production",
  target: "node",
  externals: [nodeExternals()], // needed for express
  watch: false,
  entry: "./src/js/index.ts",
  // output: {
  //     path: path.resolve(__dirname, 'dist'),
  //     filename: 'pin.user.js'
  // },
  // devtool: 'eval-source-map',
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      PROJECT_PACKAGE: JSON.stringify(projectPackage),
      BUILD_TIME_MILLIS: BUILD_TIME_MILLIS,
    }),
  ],
  devServer: {
    // https: true,
    open: "Google Chrome",
    contentBase: "src/html",
    disableHostCheck: true,
    watchContentBase: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      // css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // typescript
      {
        test: /\.tsx?$/,
        // use: 'ts-loader',
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },

      // jquery
      {
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: "jQuery",
          },
          {
            loader: "expose-loader",
            options: "$",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          output: {
            comments: false,
          },
        },
        extractComments: true,
      }),
    ],
  },
};
