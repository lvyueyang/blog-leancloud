const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: './',
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_SERVE,
                changOrigin: true,
            }
        }
    },
    css: {
        extract: true,
        sourceMap: true,
    },
    configureWebpack: {
        plugins: [
            // new BundleAnalyzerPlugin()
        ]
    }
}
