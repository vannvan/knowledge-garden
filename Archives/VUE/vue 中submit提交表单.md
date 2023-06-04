### 方法一

```vue
<form class="exportForm" ref="export" :action="exportActionUrl" method="post" @submit.prevent="onSubmit">
  <input type="hidden" :name="key" v-model="asycData[key]" v-for="(val,key) in asycData">
  <input type="submit" value="导出" class="submit-input">
</form>
 
```

 @submit.prevent="onSubmit"

 ```js
 methods: {
   onSubmit() {
   //这里可以加许多判断
          console.js(this.asycData)
          console.log('stateType',this.stateType,'queryType',this.queryType)
          if(this.stateType == '' || this.queryType == '') {
            this.errorAlert('请选择需要导出的人数类型')
            return 
          }
          //执行操作
          this.$refs.export.submit()
    },
} 

 ```

### 方法二

```js
/*
	url  请求地址
	params JSON对象
*/
buildFormExport(url, params) {
      const formObj = document.createElement("form");
      formObj.action = url
      formObj.method = "post";
      formObj.style.display = "none";
      Object.keys(params).forEach(key => {
        let formItem = document.createElement("input");
        formItem.setAttribute("type", "text");
        formItem.setAttribute("name", key);
        if (params[key]) {
          formItem.setAttribute("value", params[key]);
        }
        formObj.appendChild(formItem);
      });
      document.body.appendChild(formObj);
      formObj.submit();
      document.body.removeChild(formObj);
    }
```

