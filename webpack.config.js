const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ['./src/App.jsx', './src/styles/main.scss'],
    output: {
        filename: 'app.js'
    },
    watch: true,
    module: {
        rules: [

            {
                test: /\.jsx$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env', 'stage-2', 'react'] },
                }],
            },

            {
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
                            },
                        },
                        {
                            loader: 'sass-loader'
                        },
                    ],
                }),

                // use: ['css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader', 'sass-loader'],
            },
        ]

    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true,
        }),
    ],

};
