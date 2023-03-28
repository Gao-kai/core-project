import axios from "axios";
import * as types from "@/store/action-types.js";
import store from "@/store/index.js";

/**
 * 要点：基于类进行封装
 *
 * 1. 维护请求队列的quene 全局只维护一个单例的loading
 * 2. 请求拦截器添加loading，响应拦截器取消loading
 * 3. 页面切换的时候取消请求
 * 4. 每次请求创建一个实例 避免多个请求共用一个实例的拦截器进行冲突
 */
class HttpRequest {
  constructor() {
    this.baseURL =
      process.env.NODE_ENV === "production" ? "/" : "http://www.httpbin.org/";
    this.timeout = 3000;
    this.queue = {};
  }

  request(options) {
    let instance = axios.create();

    let config = {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    };

    // 每次请求都产生独立的实例 设置请求独立的拦截器
    this.setInterceptors(instance, options.url);
    return instance(config);
  }

  setInterceptors(instance, url) {
    // 请求拦截器
    instance.interceptors.request.use((config) => {
      

      //如果队列中有值 说明前面已经有请求还没回来 那个loading还在 此时不需要重新开一个loading loading是单例的
        // 如果队列中没有值 说明请求都回来了 此时发起的请求才需要loading
      if (Object.keys(this.queue).length == 0) {
        console.log("开始持续展示全局唯一的loading----------------");
      }

      // 添加token请求头 服务端会解析出来 并交给jwt.verify验证
      let token = localStorage.getItem('usertoken')
      if(token){
        config.headers.authorization = token;
      }

      // 将当前正在请求的api加入队列
      this.queue[url] = true;

      /* 
        产生一个取消此请求的方法挂载到当前的请求配置上
        取消请求的三种方法：
        
        1. fetch API  AbortController 取消请求
        xhr.abort();

        const controller = new AbortController();
        axios.get('/foo/bar', {signal: controller.signal});
        controller.abort() // 取消请求

        2. CancelToken.source 工厂方法创建一个 cancel token
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        axios.post('/user/12345', {name: 'new name'}, {cancelToken: source.token})
        // 取消请求（message 参数是可选的）
        source.cancel('Operation canceled by the user.');

        3. 通过传递一个 executor 函数到 CancelToken 的构造函数来创建一个 cancel token
        const CancelToken = axios.CancelToken;
        let cancle;
        axios.get('/user/12345', {cancelToken: new CancelToken(function executor(c) {cancel = c;})});
        cancle();

      */
      const CancelToken = axios.CancelToken;
      config.cancelToken = new CancelToken(function executor(c) {
        // c就是可以取消请求的函数 每次请求都创建一个唯一的取消函数
        store.commit(types.SET_TOKEN,c);
      });
      // c()

      return config;
    });

    // 响应拦截器
    instance.interceptors.response.use(
      (res) => {
        // 请求结束将api移除队列
        delete this.queue[url];

        /* 
            0.5秒 发起第一个 展示loading
            1秒 发起第二个 不展示了 因为前面展示过了

            1.5秒的时候 第一个请求返回 删除队列 发现还有值 此时不关闭loading
            2秒的时候 第二个请求返回 删除队列 发现没有值了 说明所有请求都返回了 此时才应该关闭loading
        */
        // 如果删除之后当前还有正在请求的接口 那么关闭loading
        if (Object.keys(this.queue).length === 0) {
          console.log("关闭全局单例loading");
        }

        // 基于业务自定义的code进行判断 弹出message消息
        if (res.data?.code === "x0001") {
          console.log("业务错误1");
          return Promise.reject(res.data);
        } else if (res.data?.code === "x0001") {
          console.log("业务错误2");
          return Promise.reject(res.data);
        } else {
          console.log("业务ok");
          return res.data;
        }
      },
      (err) => {
        delete this.queue[url];
        // 如果当前还有正在请求的接口 那么关闭loading
        if (Object.keys(this.queue).length === 0) {
          console.log("关闭全局单例loading111");
        }
        return Promise.reject(err);
      }
    );
  }

  get(url, params) {
    return this.request({
      url,
      medthod: "get",
      ...params,
    });
  }

  post(url, data) {
    return this.request({
      url,
      medthod: "post",
      data,
    });
  }
}


export default new HttpRequest();
