/*
 * Pure Start © 2017 – 2021, Nikita Mihalyov <nikita.mihalyov@gmail.com>
 * ISC Licensed
 * v2.0.0
 */

const path = require("path");
const fs = require("fs");

/// Plugins
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
///

const IS_DEV = process.env.NODE_ENV === "development";

const SRC = path.resolve(__dirname, "./src");
const DIST = path.resolve(__dirname, "./dist");

const PAGES_DIR = `${SRC}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(".pug"));

const getOptimization = () => {
	const optimizationConfig = {

		runtimeChunk: "single",
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				vendor: {
					name: "vendors",
					test: /node_modules/,
					chunks: "all",
					enforce: true
				}
			}
		}
	};

	if (!IS_DEV) {
		optimizationConfig.minimizer = [
			`...`,
			new CssMinimizerPlugin(),

			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: [
							["imagemin-gifsicle", { interlaced: true }],
							["imagemin-mozjpeg", { progressive: true }],
							["imagemin-pngquant", { optimizationLevel: 5 }],
						]
					}
				}
			})
		];
	}

	return optimizationConfig;
};


const getFileName = ext => IS_DEV ? `[name].${ext}` : `[name].[contenthash].${ext}`;

module.exports = {

	context: SRC,
	mode: process.env.NODE_ENV,
	target: "web",
	devtool: IS_DEV ? "source-map" : false,

	entry: {
		main: ["@babel/polyfill", "./index.js"]
	},

	output: {
		filename: './js/' + getFileName("js"),
		path: DIST,
		assetModuleFilename: "[path][name][ext]"
	},

	devServer: {
		port: 4200,
		open: true,
		watchFiles: `${SRC}/**/*.pug`
	},

	resolve: {
		extensions: [".js", ".ts", ".json", ".css", ".scss", ".sass"],
		alias: {
			"@": SRC
		}
	},

	optimization: getOptimization(),
	plugins: [
		new SpriteLoaderPlugin({
			plainSprite: true
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: './css/' + getFileName("css")
		}),
		new ESLintPlugin({
			extensions: ["js", "ts"]
		}),
		...PAGES.map(page => new HtmlWebpackPlugin({
			template: `${PAGES_DIR}/${page}`,
			filename: `./${page.replace(/\.pug/, ".html")}`
		}))
	],

	module: {
		rules: [

			{
				test: /\.pug$/,
				use: [
					{ loader: "html-loader"},
					{ loader: "pug-html-loader", options: {exports: false} },
				]
			},

			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},

			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: "ts-loader"
			},

			{
				test: /\.s(a|c)ss$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{loader: "css-loader"},
					{loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["autoprefixer", "css-mqpacker"]
							}
						}
					},
					"sass-loader",
				]
			},

			{
				test: /\.(png|jpe?g|gif|woff2?|ttf|eot|otf)$/,
				type: "asset/resource"
			},

			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFilename: './assets/img/svg/sprite.svg',
					runtimeCompat: true
				}
			},

		]
	},

};