```js
  beforeRouteEnter(to,from,next){
    window.document.body.style.backgroundColor="#fff"
    next()
  },
  beforeRouteLeave(to,from,next) {
    window.document.body.style.backgroundColor=""
    next()
  },
```

