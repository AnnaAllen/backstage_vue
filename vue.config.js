module.exports = {
    publicPath: '/',
    devServer: {
      // contentBase: path.join(__dirname, 'dist'), // 用于指定服务器资源的根目录，打包后文件会被放到dist文件夹下
      port: 8081, // 这个参数用来配置启动端口
      host: '0.0.0.0',
      headers: {
        'x-foo': '123'
      },
      /* 
      1. 当一个请求url的 协议、域名、端口 三者之间任意一个与当前页面url不同即为跨域
      2. proxy 这个配置项用来解决跨域问题
       */
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // 目标接口的域名
          // secure: true, // 当接口使用https协议的时候使用该参数
          changeOrigin: true, // 是否跨域
          pathRewrite: {
            '^/api': '/' // 重写路径
          }
        },
      }
    }
  }
  