const style = {
    test: /\.(sass|scss)$/,
    use: [
        {
            loader: 'style-loader',
        },
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
};

const plugins = [];

module.exports = {
    style,
    plugins,
}
