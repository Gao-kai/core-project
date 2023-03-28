# 项目亮点设计

## 移动端响应式原理实现





## vue add 安装插件
vue add会修改默认配置 弹出一个vue.config.js
vue add style-resources-loader
等于安装了下面这个插件：
vue-cli-plugin-style-resources-loader

## px2rem postcss-plugin-px2rem lib-flexable
自动将变量转入rem



## loading效果
组件切换 
重新请求js文件
异步组件 

## 路由切换时的加载loading如何实现 异步组件工厂函数
将一个异步函数组件交给h函数渲染 就可以加载该组件

## v-model和单向数据流
v-model用在子组件上，其实本质还是语法糖，就等于：
当前子组件绑定了一个属性为value的属性，比如:value="父组件中的变量"
当前子组件绑定了一个事件名为change的方法，比如@change="父组件中的事件处理函数"

子组件不能直接修改父组件的数据 必须保证单向数据流


```js
<custom-input v-model="searchText"></custom-input>

// 等价于
// 绑定value属性 值为searchText变量的值 绑定input或者change事件 事件处理函数中会将$event的值源源不断的赋值给searchText
<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```


## 单向数据流和


数据只能由父传递给子 然后子修改
子 emit通知父亲 进行修改 子不能直接修改父传入的数据

```js
// 爷爷组件index.vue中 下面两种写法一样

<HomeHeader :value="value" @input="input"></HomeHeader>
<HomeHeader v-model="value"></HomeHeader>

// 子组件HomeHeader中 下面两种写法一样
<van-dropdown-item v-model="value" :options="option1" /> 
<van-dropdown-item :value="value" @change="change" :options="option" />

// van-dropdown-item组件内部会基于props.value来决定视图展示和当前选中
```

数据总是从爷爷组件出发  到子组件 子组件再给van-dropdown-item组件
van-dropdown-item组件监听了用户切换事件一旦切换就会派发自定义事件change通知子组件HomeHeader修改
这里将v-model结构成了:value="value" @change="change"
在子组件HomeHeader的change事件中 再次派发自定义事件input给爷爷组件index.vue
爷爷组件v-model的语法糖默认就是input事件监听中 获取到值之后直接赋值给自己的value属性

那么数据由再一次从爷爷组件依次流向子组件流向van-dropdown-item组件，van-dropdown-item组件内部value变化视图更新


## v-model
加在表单元素上：
input text 等于input事件和value属性
radio 等于change事件和checked属性
chexkbox 等于change事件和checked属性
select 等于change事件和option属性

加在组件上：
等于给该组件绑定了value属性和input事件，当然这个事件名可以改
当事件触发的时候会自动将参数赋值给value属性绑定的值，并继续传递给子组件使用

## 持久化
组件级别的切换 也就是虚拟节点不重新渲染 可以使用keep-alive
但是数据的持久化 得借助于vuex和locastoreg
或者vuex中自己写一个插件 将要持久化的数据保存起来

首页选了一个列表
切到了其他页面
再次回到首页 还应该展示这个列表 而不是初始的列表


## vuex + v-model
vuex的值不可以直接渲染到v-model上 因为v-model的值必须有getter和setter函数
所以我们可以使用计算属性做一层包装

 <HomeHeader v-model="selectValue"></HomeHeader> 报错 Computed property "selectValue" was assigned to but it has no setter.

```js
<HomeHeader v-model="currentSelectedValue"></HomeHeader>
currentSelectedValue:{
    get(){
        return this.selectValue;
    },
    set(value){
        this[types.SET_SELECT_VALUE](value)
    }
}
```

## axios封装
见注释


## 组件切换缓存
组件切换 
优先去vuex中取
取不到 再去发起请求比较好


state
action-type
api
actions
mutations

实现接口层的缓存 将接口数据存在vuex中 避免来回切换页面重新请求数据

## 取消请求
B页面切到A页面又快速切到B页面 此时A页面的请求没有任何意义了 需要取消掉

## 路由钩子权限
   
## 权限
菜单权限
按钮权限
用户登录等访问哪些页面的权限

每次在访问任意页面之前先拉取下权限
先校验权限是否存在 如果权限存在 才进行相关操作
路由钩子实现

## 登录状态持久化
用户登录
登录成功将用户信息存储到vuex中
跳转到用户页面 从vuex中取值进行展示

切换到首页 再回来 此时vuex中的值不会变化
但是刷新一次 vuex中的值就没有了 就要重新登录 但是local中的token存在

那么我就高一个路由前置钩子
每次路由切换 进行validate token
如果token 没有 那么就直接去登录页面登录即可
如果token 有 那么就把token挂到请求头上 然后发起请求
返回校验的结果 如果校验ok 那么属性vuex中的用户信息
校验失败 也刷新vuex中的用户信息 此时重置vuex中的信息 

## 登录级别 路由鉴权
如果当前访问的是登录页
并且已经登录过了 那么就需要路由做一次拦截
返回其他页面

不管是否有权限都可以访问有些页面 这不合理

## 登录后 再分级别 菜单动态路由添加
动态

auth要和后台商量好


## 小问题
直接去访问动态添加的路由页面 比如profile/points的时候  会展示一个空页面 

直接访问 进入路由
触发路由钩子
有登陆权限 没有菜单权限 衣蛾一刷新菜单权限丢失了
此时重新去动态加载路由
动态加载的时候是 组件是异步加载的
需要等组件加载完成之后再跳转，而不是直接next跳转了 就没访问到
这里搞一个黑科技 重新访问一次 
next({
    ...to,
    replace:true
});

去这个页面 然后再去一次 并用这一次的覆盖上一次的 
这时候又会重新走一遍路由钩子触发的过程
这时候组件也加载好了 菜单权限也有了就直接走到next去了


## 自定义指令