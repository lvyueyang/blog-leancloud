module.exports = {
    baseUrl: './',
    devServer: {
        port: 80,
        proxy: {
            '/api': {
                target: 'https://leancloud.api.lvyueyang.top',
                changOrigin: true,
            }
        }
    }
}
