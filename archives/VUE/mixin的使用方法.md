### mixin的使用方法之一

场景:简单描述下场景，比如a.component，b.component均会使用到如下代码，

mixin:

```js
import axios from 'axios';
export default(){
    data(){
        return {
            url: '', // 看这里！
            initList: [],
            pageSize: 10,
            pageNo: 1
        }
    },
    created(){
        this.initList();
    },
    methods: {
        initList(){
            let url = this.url;
            axios({
                url: url,
                data: {}
            })
            .then(res => res.data)
            .then(data => {
                this.initList = data;
            })
        },
        pageSizeChange(size){
            this.pageSize = size;
            this.initList();
        },
        pageNoChange(pageNo){
            this.pageNo = pageNo;
            this.initList();
        }
    }
}
```

a.component 使用  (在a,b组件中分别定义url，就会覆盖mixin中的url，如下：)

```js
import Mixin from 'mixin路径'
export default(){
    mixins: [Mixin],
    data(){
        url: '这里是a中的url'
    }
}
```

场景2:项目中大多数页面会用到如formatDate(),loadPage()这种方法

可使用mixin全局引入方式

mixin:

```js
const mixin = {
     methods: {
      formatDate(date, fmt) {
          console.log(date,fmt)
          if (/(y+)/.test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
          }
          let o = {
              'M+': date.getMonth() + 1,
              'd+': date.getDate(),
              'h+': date.getHours(),
              'm+': date.getMinutes(),
              's+': date.getSeconds()
          };
          for (let k in o) {
              if (new RegExp(`(${k})`).test(fmt)) {
                  let str = o[k] + '';
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
              }
          }
          return fmt;
      },
      padLeftZero(str) {
          return ('00' + str).substr(str.length);
      },
      loadPage(path,params){
        this.$router.push({
          path:path,
          query:params
        })
      }
    }
}

export default  mixin
```

main.js  (这样在每个页面就可以使用了)

```js
import mixin from 'mixin路径'
Vue.mixin(mixin)
```



