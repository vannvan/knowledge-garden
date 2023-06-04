```html
<span style="font-size: medium;"><html>  
  
<head>  
    <title>JS效果-浏览器标题栏闪烁</title>  
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />  
  
    <script type="text/javascript">   
  
    // 使用message对象封装消息  
    var message={   
        time: 0,   
        title: document.title,   
        timer: null,   
  
        // 显示新消息提示   
        show:function(){   
            var title = message.title.replace("【　　　】", "").replace("【新消息】", "");  
            // 定时器，设置消息切换频率闪烁效果就此产生   
            message.timer = setTimeout(  
                function() {   
                    message.time++;  
                    message.show();   
  
                    if (message.time % 2 == 0) {   
                        document.title = "【新消息】" + title   
                    }  
                    else{   
                        document.title = "【　　　】" + title   
                    };   
                },   
                600 // 闪烁时间差  
            );   
            return [message.timer, message.title];   
        },   
  
        // 取消新消息提示   
        clear: function(){   
            clearTimeout(message.timer);   
            document.title = message.title;   
        }   
    };   
  
    message.show();   
  
    // 页面加载时绑定点击事件，单击取消闪烁提示  
    function bind() {  
        document.onclick = function(){  
            message.clear();   
        };   
    }   
  
    </script>  
  
</head>  
  
    <body onload="bind();">  
        点击页面取消消息闪烁提示  
    </body>  
  
</html></span>  
```

