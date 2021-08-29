const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require("./inline-chunk-html-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const CopyPlugin = require("copy-webpack-plugin");


module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.join(process.cwd(), 'dist'),
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ],
  },
  plugins: [
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [".js"]),
    new BundleAnalyzerPlugin({openAnalyzer: false, analyzerMode: "static"}),
    new HTMLInlineCSSWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "../dist",
        },
        {
          from: "src/i.webp",
          to: "../dist",
        }
      ]
    })
    /*
      {
         from: "./src/manifest.json",
         to:   "./dist/manifest.json"
      }
    ])*/
  ]
});
