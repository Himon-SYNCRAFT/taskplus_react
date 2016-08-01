var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack']
        },
        reporters: ['dots'],
        webpack: {
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015'],
                    }
                }]
            },
            watch: true
        },
        webpackServer: {
            noInfo: true
        },
        autoWatch: true,
    });
};
