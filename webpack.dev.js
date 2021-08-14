const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
	contentBase: './dist',
	hot: false,
	inline: true,
	host: '0.0.0.0',
	open: true,
	useLocalIp: true
  },
});
