## 前言



在使用vue.js开发前端项目时，再结合webpack搞起各种依赖、各种插件进行开发，无疑给前端开发带来了很多便捷，就在解决跨域这个问题上，相信众多用vue.js的前端同僚们同我一样尝到了甜头，开发环境全靠proxyTable一通配置简直不要太酸爽。还不明所以然的新手们可能还没搞清我说的是什么，就是下面这几行配置:

```js
proxyTable: {
      '/api': {
        target: 'http://113.113.113.113:5000', //假的接口地址哈
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
```



我们的跨域竟然就这样完美的解决了，然后就开始愉快的请求后端的接口啦！！



## 回到正题

具体场景：公司的一个h5项目是部署在客户端的，但是部署后出现bug了，由于多人协同开发且赶进度竟然是打包后因为CSS的问题多个页面布局乱了，但是开发环境并没有问题啊，怎么打完包样式就乱了？那就打开dist下的index.html看看呗，复现一下bug，想都不用想，页面没数据怎么复现，再去造一套假数据？作为一个不喜欢这样折腾的人必然是不想做这种事情的。



就不劳烦后端了，咱自己解决！



`nginx`还是要会一些些的，自己配置一下，分分钟解决，哈哈！



```nginx
 server {
        listen       8082;
        server_name  127.0.0.1;  //咱自己nginx服务器地址

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
    location /app-api {
            rewrite  ^.+app-api/?(.*)$ /$1 break;
            include  uwsgi_params;
            proxy_pass   http://113.113.113.113:5001/;  //后端接口地址
            //关键部分start
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
            add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,token';
        	//关键部分end
            //以下配置参见nginx配置文档哈
            #Proxy Settings
            proxy_redirect     off;
            proxy_set_header   Host             $host;
            proxy_set_header   X-Real-IP        $remote_addr;
            proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
            proxy_set_header   Connection       close;
            proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
            proxy_max_temp_file_size 0;
            proxy_connect_timeout      90;
            proxy_send_timeout         90;
            proxy_read_timeout         90;
            proxy_buffer_size          4k;
            proxy_buffers              4 32k;
            proxy_busy_buffers_size    64k;
            proxy_temp_file_write_size 64k;
       }
}
```



目的是把后端接口用`nginx`再代理一遍，咱自己用`nginx`间接允许一下跨域请求！


> start nginx  //在nginx目录启动服务


通常我们会做一个统一的管理接口的js文件，如下形式

```js
var BASE_URL = '/api';
var isPro = process.env.NODE_ENV === 'production'
if(isPro){
  BASE_URL= 'http://113.113.113.113:5000',  //线上或者测试地址
  //BASE_URL= 'http://127.0.0.1:8020',  //nginx代理地址
  //当我们需要打包后依然能正常调接口的时候用这个	
}
const UrlConfig = {
  getToken:BASE_URL + "某接口"
}
export default {
  UrlConfig
};

```


至此，就把打包后接口跨域的问题优雅的解决啦。

## 结语

因为公司的前后端项目通常都放在同一台服务器，或者不在同一台服务器的时候跨域也是靠后端的同志们去解决的，所以很少在生产环境中靠前端解决跨域的这项需求。不过我分享的这个小技巧也只适用于以上类似场景中，归根结底还是要在多人协同开发的过程中提前规划好公共以及个人的编程规范，尽量保证开发环境和生产环境是一致的，就可以摆脱很多类似的问题。