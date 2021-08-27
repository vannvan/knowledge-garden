### 所有的 interface 起始为 I,而 types 起始为 T

```tsx

  interface  IData  {

  /* ... */

  }

  type  TField  =  /* ... */
```

### class 或 组件的 interface 应该包含它的名字

```tsx

interface  IApiService  {

  getUser():  IUser;

}

class  ApiService  implements  IApiService  {

  /* ... */

}
```

