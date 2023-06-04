## 安装

> npm install shelljs –save -dev

### 1.自动push  (放至build文件夹下,shell,js)

```js
#!/usr/bin/env node
var name = process.argv[2] || 'Auto-commit';
var shell = require("shelljs");
var exec = shell.exec;

if (exec('git add .').code !== 0) {
  echo('Error: Git add failed');
  exit(1);
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
if (exec('git push').code !== 0) {
  echo('Error: Git commit failed');
  exit(1);
}
exec(`echo git success ${name}`);

```

package.json中加

> "push": "node build/shell.js"

## 一些颜色

> echo -e "\033[0m none \033[0m"
> echo -e "\033[30m black \033[0m"
> echo -e "\033[1;30m dark_gray \033[0m"
> echo -e "\033[0;34m blue \033[0m"
> echo -e "\033[1;34m light_blue \033[0m"
> echo -e "\033[0;32m green \033[0m"
> echo -e "\033[1;32m light_green \033[0m"
> echo -e "\033[0;36m cyan \033[0m"
> echo -e "\033[1;36m light_cyan \033[0m"
>
> echo -e "\033[0;31m red \033[0m"
> echo -e "\033[1;31m light_red \033[0m"
> echo -e "\033[0;35m purple \033[0m"
> echo -e "\033[1;35m light_purple \033[0m"
> echo -e "\033[0;33m brown \033[0m"
> echo -e "\033[1;33m yellow \033[0m"
> echo -e "\033[0;37m light_gray \033[0m"
> echo -e "\033[1;37m white \033[0m"
> echo -e "\033[0m none \033[0m"
> echo -e "\033[0m none \033[0m"
> echo -e "\033[0m none \033[0m"
> echo -e "\033[0m none \033[0m"
> echo -e "\033[0m none \033[0m"
>
> echo -e "\033[40;37m 黑底白字 \033[0m"
> echo -e "\033[41;30m 红底黑字 \033[0m"
> echo -e "\033[42;34m 绿底蓝字 \033[0m"
> echo -e "\033[43;34m 黄底蓝字 \033[0m"
> echo -e "\033[44;30m 蓝底黑字 \033[0m"
> echo -e "\033[45;30m 紫底黑字 \033[0m"
> echo -e "\033[46;30m 天蓝底黑字 \033[0m"
> echo -e "\033[47;34m 白底蓝字 \033[0m"
> echo -e "\033[4;31m 下划线红字 \033[0m"
> echo -e "\033[5;31m 红字在闪烁 \033[0m"
>
> echo -e "\033[8m 消隐 \033[0m "

## 效果

![](https://raw.githubusercontent.com/MagicDavid20/ResForBlog/master/shell_color/sample1.jpg)

## 预先定义颜色变量

```shell
RED_COLOR='\E[1;31m'  
YELOW_COLOR='\E[1;33m' 
BLUE_COLOR='\E[1;34m'  
RESET='\E[0m'

#需要使用echo -e
echo -e  "${RED_COLOR}===david say red color===${RESET}"
echo -e  "${YELOW_COLOR}===david say yelow color===${RESET}"
echo -e  "${BLUE_COLOR}===david say green color===${RESET}"
```



