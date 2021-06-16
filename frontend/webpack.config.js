const path = require("path");
const HtmlWPP = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  devServer: {
    port: 3000,
  },
  plugins: [
    new HtmlWPP({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
