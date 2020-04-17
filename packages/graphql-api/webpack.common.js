const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts$/,
                use: 'ts-loader'
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },{
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            }
        ]
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['*', '.ts', '.js', '.mjs', '.json', '.gql', '.graphql']
    },
    optimization: {
        minimize: false
    },
    target: 'node'
};
