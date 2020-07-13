const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};