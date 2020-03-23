const config = require('./webpack.config');
const har = require('har-express');
 
const devServer = {
    // historyApiFallback: false,
    serveIndex: true,
    // before: function (app, server, compiler) {
    //     if (process.env.HAR) {
    //         app.use(har.getMiddleware(process.env.HAR));
    //     }        
    // },
};

if (process.env.API_URL) {
    const target = process.env.API_URL;
    let headers = {};

    devServer.proxy = {
        '/api': {
            target,
            changeOrigin: true,
            headers,
        },
        '/api/v1/stream-websocket': {
            target,
            ws: true,
            changeOrigin: true,
            secure: false,
            xfwd: true,
            headers,
        },
    };
    
}
module.exports = {
    ...config,
    // mode: 'development',
    devServer,
};