const path = require('node:path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports =  {
    mode: 'production',
    entry: {
        serviceWorker: {
            import: './src/service-worker/index.ts',
            filename: 'service-worker.js'
        },
        videoHandler: {
            import: './src/content/video-handler/index.ts',
            filename: 'content/video-handler.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src', 'manifest.json'),
                    to: path.resolve(__dirname, 'dist', 'manifest.json')
                }
            ]
        })
    ]
}