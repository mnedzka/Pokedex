const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const style = {
    test: /\.(sass|scss)$/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
            {
                loader: 'css-loader',
                options: {
                    minimize: false,
                    modules: true,
                    importLoaders: 2,
                    localIdentName: '[name]__[local]___[hash:base64:6]',
                    url: false,
                },
            },
            {
                loader: 'sass-loader',
            },
        ],
    }),
};

const plugins = [
    new ExtractTextPlugin({
        filename: 'app.css',
        allChunks: true,
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }),
    new webpack.optimize.UglifyJsPlugin(),
];

module.exports = {
    style,
    plugins,
};
