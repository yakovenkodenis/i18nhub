const { resolve } = require('path');


const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        pathinfo: true
    },

    context: resolve(__dirname, 'app'),

    cache: true,
    debug: true,
    devtool: isProd ? 'sourcemap' : 'eval',

    stats: {
        colors: true,
        reasons: true
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.styl$/, loader: 'style!css!stylus' },
            { test: /\.json$/, loader: 'json' }
        ]
    }
}
