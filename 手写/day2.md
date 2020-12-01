```js
const debounce = function(fn, wait) {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}


const throttle = function(fn, wait) {
    let flag = true
    return (...args) => {
        if (!flag) return
        flag = false
        setTimeout(() => {
            fn.apply(this, args)
            flag = true
        }, wait)
    }
}


const instance_of = function(L, R) {
    var O = L.prototype
    L = L.__proto__
    while (true) {
        if (L === null) return false
        if (O === L) return true
        L = L.__proto__
    }
}
```

