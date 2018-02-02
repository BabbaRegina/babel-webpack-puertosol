var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['babel-polyfill','./server/currency-convert.js']
        
    },
    output: {
        path: path.resolve(__dirname, 'build'), 
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['env', 'stage-0']
            }
        }]
    }
};