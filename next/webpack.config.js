
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: `${__dirname}/build/static`,
        filename: 'index.[hash:8].js',
        publicPath: 'static/',
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: `${__dirname}/build/index.html`,
            template: './src/index.html',
            minify: false,
        }),
        new ExtractTextPlugin('index.[hash:8].css'),
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                })
            },
        ],
    },
};
