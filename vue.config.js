const path = require('path');
const vueSrc = './src';
console.log('webpack ', path.join(__dirname, vueSrc));
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        '@': path.join(__dirname, vueSrc),
      },
    },
  },
};
