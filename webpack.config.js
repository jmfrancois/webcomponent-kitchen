const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const plugins = [
    new HtmlWebpackPlugin({
        title: 'WebComponent kitchen',
        favicon: './src/favicon.png'
    }),
    new HtmlWebpackTagsPlugin({
        tags: [
        ]
    }),
];

if (process.env.ANALYSE) {
    plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.min.js',
        path: path.resolve(__dirname, 'docs'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                exclude: /\.module\.css$/i,
                use: ['raw-loader'],
            },
            {
                test: /\.html$/,
                loader: 'mustache-loader'
                // loader: 'mustache-loader?minify'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.html'],
    },
    plugins,
    externals: {
        '@talend/arch-services': 'window',
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
};