const path = require("path");
const dotenv = require("dotenv");
const { DefinePlugin } = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");

dotenv.config({ path: ".env" });

module.exports = {
  mode: "development",
  entry: {
    script: "./src/main.js",
    mocks: "./src/utils/mocks.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
    extensions: [".ts", ".js", ".vue"],
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      { test: /\.js$/, loader: "babel-loader" },
      {
        test: /\.css$/,
        exclude: /\.lazy\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.lazy\.css$/,
        use: [
          {
            loader: "style-loader",
            options: { injectType: "lazyStyleTag" },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new DefinePlugin({ "process.env": JSON.stringify(process.env) }),
  ],
  devServer: {
    static: "./public/",
    allowedHosts: process.env.WEBPACK_HOST,
    client: { webSocketURL: `wss://${process.env.WEBPACK_HOST}/ws` },
  },
};
