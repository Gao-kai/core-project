import LoadingComponent from '../components/loading.vue';

/**
 * 
 * @param {*} AsyncFn 在配置路由的时候传入的函数 ()=>import("xxx.vue") 此函数执行会返回一个Promise实例
 * @returns 
 */
const Loadable = (AsyncFn) => {
    let AsyncComponent  = ()=>(
        {
            // 需要加载的组件 (应该是一个 `Promise` 对象)
            component: AsyncFn(),
            // 异步组件加载时使用的组件
            loading: LoadingComponent,
            // 加载失败时使用的组件
            error: null,
            // 展示加载时组件的延时时间。默认值是 200 (毫秒)
            delay: 0,
            // 如果提供了超时时间且组件加载也超时了，
            // 则使用加载失败时使用的组件。默认值是：`Infinity`
            timeout: 3000,
        }
    )

    // debugger;
    /* 
        Loadable接收一个需要被异步懒加载的组件
        执行完成之后返回一个新的组件x
        这个新的组件会被挂在路由配置表中
        当path命中之后 就会加载这个返回的组件x
        渲染时会首先调用render函数优先级高 最终将带有loading效果的组件进行加载
        h方法的参数是一个函数的时候  就将其当做函数组件进行渲染
    */
    return {
        render(h){
            return h(AsyncComponent);
        }
    }
};


export default Loadable;