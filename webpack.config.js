const path = require('path')
const webpack = require('webpack')
const ASSET_PATH = process.env.ASSET_PATH || '';
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const sassLoader = require('sass-loader');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log ("iS DEV ", isDev)
const dirToStoreReady = 'dist/user-act';

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}
	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin (),
			new TerserWebpackPlugin ()
		]
	}
	return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const cssLoaders = extra => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true
			},
		},
		'css-loader'
	]

	if (extra) {
		loaders.push(extra)
	}

	return loaders
}

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		// UIkit: './uikit.js',
		// WebsiteLanding: './website-landing.js',
		// SearchRoom: './search-room.js',
		// RoomDetails: './room-details.js',
		userAct: './user-act.js',
	},
	output: {
		filename: filename('js'),
		path: path.resolve(__dirname, dirToStoreReady),
		publicPath: ASSET_PATH
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			// '@models': path.resolve(__dirname, 'src/models'),
			'@': path.resolve(__dirname, 'src'),
		}
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		open: true,
		hot: isDev,
	},
	plugins: [
		// new HTMLWebpackPlugin( {
		//   title: 'UIKit',
		//   template: './pages/uikit/index.pug',
		//   filename: 'index.html',
		//   inject: true,
		//   chunks: ['UIkit'],
		//   minify: {
		//     collapseWhitespace: isProd 
		//   }
		// }),
		// new HTMLWebpackPlugin( {
		// 	title: 'WebsiteLanding',
		// 	template: './pages/website/landing/index.pug',
		// 	filename: 'index.html',
		// 	inject: true,
		// 	chunks: ['WebsiteLanding'],
		// 	minify: {
		// 		collapseWhitespace: isProd 
		// 	}
		// }),
		// new HTMLWebpackPlugin( {
		// 	title: 'WebsiteLandingStart',
		// 	template: './pages/website/landing/start/index.pug',
		// 	filename: 'start.html',
		// 	inject: true,
		// 	chunks: ['WebsiteLanding'],
		// 	minify: {
		// 		collapseWhitespace: isProd 
		// 	}
		// }),
		// new HTMLWebpackPlugin( {
		// 	title: 'WebsiteLandingDatepicker',
		// 	template: './pages/website/landing/dates-dropdown/index.pug',
		// 	filename: 'dates.html',
		// 	inject: true,
		// 	chunks: ['WebsiteLanding'],
		// 	minify: {
		// 		collapseWhitespace: isProd 
		// 	}
		// }),
		// new HTMLWebpackPlugin( {
		// 	title: 'WebsiteLandingGuests',
		// 	template: './pages/website/landing/guests-dropdown/index.pug',
		// 	filename: 'guests.html',
		// 	inject: true,
		// 	chunks: ['WebsiteLanding'],
		// 	minify: {
		// 		collapseWhitespace: isProd 
		// 	}
		// }),
		// new HTMLWebpackPlugin( {
		//   title: 'SearchRoom',
		//   template: './pages/website/search-room/index.pug',
		//   filename: 'index.html',
		//   inject: true,
		//   chunks: ['SearchRoom'],
		//   minify: {
		//     collapseWhitespace: isProd 
		//   }
		// }),
		// new HTMLWebpackPlugin( {
		//   title: 'SearchRoomStart',
		//   template: './pages/website/search-room/start/index.pug',
		//   filename: 'start.html',
		//   inject: true,
		//   chunks: ['SearchRoom'],
		//   minify: {
		//     collapseWhitespace: isProd 
		//   }
		// }),
		// new HTMLWebpackPlugin( {
		//   title: 'SearchRoomRooms',
		//   template: './pages/website/search-room/rooms/index.pug',
		//   filename: 'rooms.html',
		//   inject: true,
		//   chunks: ['SearchRoom'],
		//   minify: {
		//     collapseWhitespace: isProd 
		//   }
		// }),
		// new HTMLWebpackPlugin( {
		//   title: 'SearchRoomExtras',
		//   template: './pages/website/search-room/extras/index.pug',
		//   filename: 'extras.html',
		//   inject: true,
		//   chunks: ['SearchRoom'],
		//   minify: {
		//     collapseWhitespace: isProd 
		//   }
		// }),
		// new HTMLWebpackPlugin( {
		// 	title: 'RoomDetails',
		// 	template: './pages/website/room-details/index.pug',
		// 	filename: 'index.html',
		// 	inject: true,
		// 	chunks: ['RoomDetails'],
		// 	minify: {
		// 		collapseWhitespace: isProd 
		// 	}
		// }),
		new HTMLWebpackPlugin( {
			title: 'userAct',
			template: './pages/website/user-act/index.pug',
			filename: 'index.html',
			inject: true,
			chunks: ['userAct'],
			minify: {
				collapseWhitespace: isProd 
			}
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new MomentLocalesPlugin({
			localesToKeep: ['ru'],
		}),
		new CopyWebpackPlugin({
			patterns: [
				// {
				// 	from: path.resolve(__dirname, 'src/assets/favicons/'),
				// 	to: path.resolve(__dirname, `${dirToStoreReady}/img/favicons/`)
				// },
				{
					from: path.resolve(__dirname, 'src/assets/img/'),
					to: path.resolve(__dirname, `${dirToStoreReady}/img/`)
				},
		]}),
		new MiniCssExtractPlugin({
			filename: filename('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders()
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot)$/,
				use: ['file-loader']
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			}
		]
	}
}