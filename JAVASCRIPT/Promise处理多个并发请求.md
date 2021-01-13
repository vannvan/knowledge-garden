### get方法
```js
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params: params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        failed(err)
        reject(err)
      })
      .finally(() => {
        window._VV.$store.commit('setRequestStatus', false)
      })
  })
}
```

### 并发方法
```js

function multiRequest(urls = [], maxNum) {
  // 请求总数量
  const len = urls.length
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false)
  // 当前完成的数量
  let count = 0

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next()
    }
    function next() {
      let current = count++
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result)
        return
      }
      const url = urls[current]
      console.log(`开始 ${current}`, new Date().toLocaleString())
      get(url)
        .then((res) => {
          // 保存请求结果
          result[current] = res
          console.log(`完成 ${current}`, new Date().toLocaleString())
          // 请求没有全部完成, 就递归
          if (current < len) {
            next()
          }
        })
        .catch((err) => {
          console.log(`结束 ${current}`, new Date().toLocaleString())
          result[current] = err
          // 请求没有全部完成, 就递归
          if (current < len) {
            next()
          }
        })
    }
  })
}
```

### 使用

```js
multiRequest(
  [
    '/store/info/auth',
    '/store/info/auth',
    '/store/info/auth',
    '/store/info/auth',
    '/store/info/auth',
    '/store/info/auth',
    '/store/info/auth'
  ],
  5
)
```

