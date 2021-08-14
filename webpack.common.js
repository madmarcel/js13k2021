const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	optimization: {
		minimizer: [new TerserJSPlugin({})]
	},
	plugins: [
		new HtmlWebpackPlugin({ template: "src/index.html", inject: "body" }),
    	new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	resolve: { extensions: [".js"] },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				test: /\.(webp|png|jpg|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.glsl$/i,
				use: "raw-loader"
			},
			{
				test: /\.json$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: './dist/[name].[ext]'
						},
					}
				]
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		]
	}
};
