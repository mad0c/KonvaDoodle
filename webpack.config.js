const path = require('path');

module.exports = {
    entry: './src/main.js',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
};