/*
 * Description: Tapable包公开了许多Hook类，可用于为插件创建钩子。
 * Created: 2023-12-25 16:33:22
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-12-25 16:34:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */


const { SyncHook } = require("tapable"); //这是一个同步钩子

//step1：实例化钩子函数，可以在这里定义形参
const syncHook = new SyncHook(["author"]);

// step2 ：注册事件
syncHook.tap("handler1", (name) => {
  console.log("动作1:", name);
});

syncHook.tap("handler2", (name) => {
  console.log("动作2:", name);
});

//step3：触发事件
syncHook.call("哈哈哈");