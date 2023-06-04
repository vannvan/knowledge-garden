## forever
> [https://www.npmjs.com/package/forever](https://www.npmjs.com/package/forever)

启动服务
> forever start app.js

常用options
```yaml
actions:
  start               Start SCRIPT as a daemon
  stop                Stop the daemon SCRIPT by Id|Uid|Pid|Index|Script
  stopall             Stop all running forever scripts
  restart             Restart the daemon SCRIPT
  restartall          Restart all running forever scripts
  list                List all running forever scripts
  config              Lists all forever user configuration
  set <key> <val>     Sets the specified forever config <key>
  clear <key>         Clears the specified forever config <key>
  logs                Lists log files for all forever processes
```
## pm2
> [https://www.npmjs.com/package/pm2](https://www.npmjs.com/package/pm2)

启动服务
>  pm2 start app.js

常用options
```yaml
pm2 stop     <app_name|namespace|id|'all'|json_conf>
pm2 restart  <app_name|namespace|id|'all'|json_conf>
pm2 delete   <app_name|namespace|id|'all'|json_conf>
pm2 reload all
pm2 logs
```
## supervisor
> [https://www.npmjs.com/package/supervisor](https://www.npmjs.com/package/supervisor)

启动服务
> supervisor app/server.js

## nohup 内置应用
启动服务
> nohup node server.js


