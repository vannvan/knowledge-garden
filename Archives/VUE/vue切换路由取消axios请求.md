### 需配合vuex使用

```js
//记录取消请求操作
store.registerModule('requestAction',{
  state: {
    cancelTokenArr:[]
  },
  mutations: {
    pushToken: (state, src) => {
        state.cancelTokenArr.push(src.cancelToken)
    },
    clearToken: ({cancelTokenArr}) => {
        cancelTokenArr.forEach(item => {
            item('路由跳转取消请求')
        })
        cancelTokenArr = []
    }
    }
})
```

### 在请求拦截中新增,

```js
config.cancelToken = new Axios.CancelToken((cancel) => {
            store.commit('pushToken', {
                cancelToken: cancel
            })
})
//这段在return config之前
```

###  路由配置

```js
 
router.beforeEach(({ meta, path, fullPath }, from, next) => {
    store.commit('clearToken')// 取消请求
    next()
})
```

### 开发环境响应拦截查看一下状态

```js
if (error.message === '路由跳转取消请求') { // 判断是否为路由跳转取消网络请求
            console.log('路由跳转取消请求' + error)
    } else {
        // return Promise.reject(error)
        let {status} = error.response
        if(error) {
          const errorMsg = {
            404:'请求地址不存在',
            502:'网络错误(502)',
            503:'服务不可用(503)',
            504:'网络超时(504)'
          }
          setAuthError(status,errorMsg[status] || '连接出错'+status)
        }
    }
```

