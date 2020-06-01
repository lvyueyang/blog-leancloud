const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    publicPath: './',
    devServer: {
        port: 8090,
        proxy: {
            '/api': {
                // target: 'https://leancloud.api.lvyueyang.top',
                target: 'https://OnhS1BDz.api.lncldglobal.com',
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
