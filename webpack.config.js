const webpack = {
    mode: 'development',
    entry: './main/main.js',
    target: 'electron-dev',
    module: {
        rules: [{
            test: /\.js$/,
            include: /src/,
            //use: [{ loader: 'ts-loader' }]
        }]
    },
    output: {
        path: __dirname + '/src',
        filename: 'main.js'
    },
    externals: [
        nodeExternals()
    ]
}

export default webpack;