module.exports = {
    devServer: {
        port: 81,     // 端口号
        proxy:{
            // 代理的
            '/api':{
                target: 'http://kcxsmv.natappfree.cc', // 代理的基础路径
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
          }
    }
}