const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-syntax-dynamic-import"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./index.html")
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3003"
      }
    }
  },
  mode: "development"
};
