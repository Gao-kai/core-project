
/**
 * require.context(directory,useSubdirectories,regExp)
 * 
 * require.context是webpack中，用来创建自己的（模块）上下文
 * 1. directory:表示检索的目录
 * 2. useSubdirectories：表示是否检索子文件夹
 * 3. regExp:匹配文件的正则表达式,一般是文件名
 * 
 * 用于自动化生成Vuex模块配置对象
 * 返回值files有一个keys方法可以打印目标路径下的文件路径 它返回一个数组，由所有可能被上下文模块处理的请求组成。
 * 返回值files自身就是一个函数 接收参数key 返回该路径默认导出的对象
 * 获取所有当前目录下.后缀为js的文件 包含子目录在内
 */
const files = require.context('.',true,/\.js$/);
const modules = {};
console.dir(files.keys());
files.keys().forEach((key)=>{
    const path = key.replace(/\.\/|\.js/g,"");
    // console.log(path);
    const [namespace,optionType] = path.split("/");

    if(path === 'index') return;

    // 代表这是一个全新的模块 全部打上namespaced标志
    if(!modules[namespace]){
        modules[namespace] = {
            namespaced:true
        }
    }
   
    // 取出导出的对象 挂载对对应的配置项上面去
    modules[namespace][optionType] = files(key).default;
})


export default modules;