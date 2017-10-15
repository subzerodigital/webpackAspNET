const path = require('path');
const webpack = require('webpack');

const config = {
	resolve: {
		modules: [path.resolve('./lib'), path.resolve('./node_modules')]
	},
	devtool:'inline-source-map',
	entry: {
		vendor: [
			'babel-polyfill',
			'react',
			'react-dom',
			'prop-types',
			'axios',
			'lodash.debounce',
			'lodash.pickby'
		],
		app: ['./lib/renderers/dom.js']
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['react', 'env', 'stage-2']
				}
			}
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		})
	],
	devServer: {
		port: 3001,
		proxy:{
			'/':'http://localhost:8080'
		},
		open: true,
		contentBase:[path.resolve(__dirname, 'lib/scss')],
		watchContentBase: true
	}
};

module.exports = config;
