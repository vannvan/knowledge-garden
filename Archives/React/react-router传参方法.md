### params

```js
<Route path='/path/:name' component={Path}/>
<link to="/path/2">xxx</Link>
this.props.history.push({pathname:"/path/" + name});
读取参数用:this.props.match.params.name
```

优势 ： 刷新地址栏，参数依然存在

缺点:只能传字符串，并且，如果传的值太多的话，url会变得长而丑陋。

### query

```js
<Route path='/query' component={Query}/>
<Link to={{ path : ' /query' , query : { name : 'sunny' }}}>
this.props.history.push({pathname:"/query",query: { name : 'sunny' }});
读取参数用: this.props.location.query.name
```

优势：传参优雅，传递参数可传对象；

缺点：刷新地址栏，参数丢失

### state

```js
<Route path='/sort ' component={Sort}/>
<Link to={{ path : ' /sort ' , state : { name : 'sunny' }}}> 
this.props.history.push({pathname:"/sort ",state : { name : 'sunny' }});
读取参数用: this.props.location.query.state 
```

优缺点同query

### search

```js
<Route path='/web/departManange ' component={DepartManange}/>
<link to="web/departManange?tenantId=12121212">xxx</Link>
this.props.history.push({pathname:"/web/departManange?tenantId" + row.tenantId});
读取参数用: this.props.location.search
```

优缺点同params





[react-router v6 新老版本对比](https://blog.csdn.net/wanjun_007/article/details/126997853)