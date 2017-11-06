const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const dev = require('./webpack.dev.js');
const prod = require('./webpack.prod.js');
const production = process.argv.indexOf('-p') !== -1;
const plugins = production ? prod.plugins : dev.plugins;
const styleRules = production ? prod.style : dev.style;

module.exports = {
    entry: ['./src/index.jsx', './src/styles/main.scss'],
    output: {
        filename: 'app.js'
    },
    watch: !production,
    module: {
        rules: [

            {
                test: /\.(jsx|js)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: { presets: ['env', 'stage-2', 'react'] },
                }],
            },
            styleRules,
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

    plugins,
};
