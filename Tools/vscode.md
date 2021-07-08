## 使用技巧

- [VSCode插件Path Autocomplete小技巧](https://segmentfault.com/a/1190000020720481)





## 配置文件

跟目录`.vscode/setting.json`

```json
{
    "i18n-ally.displayLanguage": "zh",
    "i18n-ally.localesPaths": ["./src/lang"],
    "i18n-ally.enabledParsers": [
      "js",
      "ts",
      "ini"
    ],
    "i18n-ally.keystyle": "nested",
    "path-autocomplete.pathMappings": {
        "@": "${folder}/src/",
      }
  }
```



