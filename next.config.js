const { resolve } = require('path');
const { EnvironmentPlugin } = require('webpack');
const withPlugins = require('next-compose-plugins');
const progressBar = require('next-progressbar');

const {
    APP_ENV,
    APP_URL,
    SERVER_URL
} = require('./config/env');

const nextConfig = {
    webpack: (config, { isServer }) => {
        config.resolve.alias['~'] = resolve(__dirname, 'src');

        config.plugins.push(
            new EnvironmentPlugin({
                APP_ENV,
                APP_URL,
                SERVER_URL,
            }),
        );

        config.module.rules.unshift({
            test: /\.js?$/,
            resolve: {
                extensions: ['.js'],
            },
        });

        return config;
    }
}

module.exports = withPlugins(
    [
        [progressBar]
    ],
    nextConfig
);
