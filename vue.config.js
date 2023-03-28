const path = require('path');
module.exports = {
  pluginOptions: { 
    /* 
      自动导入less变量的插件

      1. 功能
      在每一个用到less语法的地方(.vue文件中)自动将patterns中配置的路径匹配的文件中的less变量导入

      2. 好处
      避免在每个页面使用的时候都要在顶部导入一次common.less 比较方便 
    */
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname,'src/assets/common.less')
      ]
    }
  },
  css:{
    loaderOptions:{
      postcss:{
        /* 
          postcss-plugin-px2rem 插件 用于将页面中的px动态的转化为rem单位
          设计稿宽度为375px 那么rootValue = 37.5 转化后页面宽度就是10rem
          设计稿宽度为750px 这里rootValue = 75 转化后页面宽度还是10rem

        */
        plugins:[
          require("postcss-plugin-px2rem")({
            rootValue:37.5,
            exclude: /node_modules/,
          })
        ]
      }
    }
  }
}
