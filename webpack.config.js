const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const publicPath = path.resolve(__dirname, 'public');
const buildPath = path.resolve(__dirname, 'dist');

let entries = {}
var files = fs.readdirSync(publicPath);
files.forEach((file) => {
  if (file.endsWith('.html')) {
    const name = file.replace('.html', '');
    const tsPath = path.join(publicPath, `${name}.ts`);
    const jsPath = path.join(publicPath, `${name}.js`);

    if (fs.existsSync(tsPath) || fs.existsSync(jsPath)) {
      entries[name] = (fs.existsSync(tsPath) && tsPath) ||
        (fs.existsSync(jsPath) && jsPath);
    }
  }
})


console.log(entries);

const configs = Object.entries(entries).map((entry, i) => {
  return {
    entry: entry[1],
    output: {
      path: buildPath,
      filename: `${entry[0]}.js`
    },
    output: {
      filename: `${entry[0]}.js`,
      path: buildPath,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ]
    },
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['*', '.js', '.ts']
    },
    plugins: [new HtmlWebpackPlugin({
      template: path.join(publicPath, `${entry[0]}.html`),
      filename: `${entry[0]}.html`
    })]
  }
})



module.exports = configs;
