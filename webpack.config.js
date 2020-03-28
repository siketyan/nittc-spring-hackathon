const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const config = require('./config.json');

const preprocessor = content => {
    content = content.toString();

    Object.keys(config).forEach(key => {
        content = content.replace(
            new RegExp(
                `{{\\s*${key}\\s*}}`,
                'gi',
            ),
            config[key],
        );
    });

    return content;
};

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'public'),
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    preprocessor,
                },
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.s[ca]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|woff2?|[to]tf|png|svg|jpe?g|gif)$/i,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: './src/static',
                transform: preprocessor,
            },
        ]),
    ],
};
