(1).在App.vue中加入：

```vue
<template>
  <div id="app">
    <!--<router-view/>-->
    <!--页面返回不刷新-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
```

(2).index.js页面

```js
export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: index,
    meta: {
      keepAlive: true
    }
  },
```

这样在index.vue中，mounted方发只走一次，在浏览器上实现了返回原来滚动位置的目的。但是在手机上测试，发现没用，

解决手机上实现目的的方法：

```js
//在页面离开时记录滚动位置
beforeRouteLeave (to, from, next) {
    this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    next()
},
```

```js
//进入该页面时，用之前保存的滚动位置赋值
beforeRouteEnter (to, from, next) {
    next(vm => {
      document.body.scrollTop = vm.scrollTop
    })
  },
```

