const path = require('node:path')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
        },
        popup: {
            import: './src/popup/index.tsx',
            filename: 'popup/popup.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
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
                },
            ]
        }),
        new HtmlWebpackPlugin({
            chunks: ['popup'],
            inject: 'body',
            filename: 'popup/index.html',
            template: './src/popup/index.html'
        })
    ]
}