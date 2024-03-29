```json
{
  "jsx": "react",
  "compilerOptions": {
    "jsx": "react",
    // 不报告执行不到的代码错误。
    "allowUnreachableCode": true,
    // 必须标注为null类型,才可以赋值为null
    "strictNullChecks": true,
    // 严格模式, 强烈建议开启
    "strict": true,
    // 支持别名导入:
    // import * as React from "react"
    "esModuleInterop": true,
    // 目标js的版本
    "target": "es5",
    // 目标代码的模块结构版本
    "module": "commonjs",
    // 在表达式和声明上有隐含的 any类型时报错。
    "noImplicitAny": true,
    // 删除注释
    "removeComments": true,
    // 保留 const和 enum声明
    "preserveConstEnums": false,
    // 生成sourceMap
    "sourceMap": true,
    // 目标文件所在路径
    "outDir": "./lib",
    // 编译过程中需要引入的库文件的列表
    "lib": ["dom", "es7"],
    // 额外支持解构/forof等功能
    "downlevelIteration": true,
    // 是否生成声明文件
    "declaration": true,
    // 声明文件路径
    "declarationDir": "./lib",
    // 此处设置为node,才能解析import xx from 'xx'
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "paths": {
      "*": ["types/*"],
      "@/*": ["src/*"]
      // "@cps/*": ["components/*"],
      // "@redux/*": ["redux/*"],
      // "@utils/*": ["utils/*"],
      // "@css/*": ["assets/css/*"],
      // "@images/*": ["assets/images/*"],
      // "@api/*": ["api/*"],
      // "@cpsCommon/*": ["components/common/*"],
      // "@common/*": ["common/*"],
      // "@typings/*": ["typings/*"],
      // "@config/*": ["config/*"],
      // "@views/*": ["views/*"],
      // "@router/*": ["router/*"]
    }
  },
  "include": [
    "mock/**/*",
    "src/**/*",
    "config/**/*",
    ".umirc.ts",
    "typings.d.ts"
  ]
}

```

