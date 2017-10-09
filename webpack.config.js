const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: ['./src/index.jsx', './src/styles/main.scss'],
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
                    options: { presets: ['env', 'react', 'stage-2'] },
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

    resolve: {
        alias: {
            src : path.resolve(__dirname, 'src'),
            Components : path.resolve(__dirname, 'src/Components'),
            Scenes : path.resolve(__dirname, 'src/Scenes'),
            Reducers : path.resolve(__dirname, 'src/Reducers'),
            Actions :  path.resolve(__dirname, 'src/Actions'),
            styles : path.resolve(__dirname, 'src/styles'),
            resources : path.resolve(__dirname, 'resources'),
        },
        extensions: ['.js', '.jsx'],
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'app.css',
            allChunks: true,
        }),
    ],

};
