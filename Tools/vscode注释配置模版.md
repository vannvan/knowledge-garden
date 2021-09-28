## 适用于公司

```json
// .vscode/settings.json
{
  "psi-header.config": {
    "forceToTop": true,
    "blankLinesAfter": 3,
    "license": "Custom"
  },
  "psi-header.changes-tracking": {
    "isActive": true,
    "modAuthor": "Modified By: ",
    "modDate": "Last Modified: ",
    "modDateFormat": "date",
    "include": [],
    "exclude": ["markdown", "json", "less", "sass", "css"],
    "excludeGlob": ["out/**", "src/**/*.xyz", "components/**/*.mk"],
    "autoHeader": "autoSave"
  },
  "psi-header.license-text": ["May the force be with you."],
  "psi-header.variables": [
    ["company", "www.mogulinker.com"],
    ["author", "van"],
    ["authoremail", "shiww@mogulinker.com"]
  ],
  "psi-header.lang-config": [
    {
      "language": "javascript",
      "begin": "/**",
      "prefix": " * ",
      "end": " */",
      "blankLinesAfter": 2,
      "forceToTop": false
    },
    {
      "language": "javascript",
      "mapTo": "javascript"
    },
    {
      "language": "javascriptreact",
      "mapTo": "javascript"
    },
    {
      "language": "typescriptreact",
      "mapTo": "javascript"
    }
  ],
  "psi-header.templates": [
    {
      "language": "javascript",
      "template": [
        "Description: ",
        "Created: <<filecreated('YYYY-MM-DD HH:mm:ss')>>",
        "Author: <<author>>",
        "Email : <<authoremail>>",
        "-----",
        "Last Modified: <<dateformat('YYYY-MM-DD HH:mm:ss')>>",
        "Modified By: <<author>>",
        "-----",
        "Copyright (c) <<year>> <<company>>"
      ]
    },
    {
      "language": "typescriptreact",
      "mapTo": "javascript"
    },
    {
      "language": "typescript",
      "mapTo": "javascript"
    },
    {
      "language": "javascriptreact",
      "mapTo": "javascript"
    }
  ]
}
```

## 适用于个人

```json
// .vscode/settings.json
{
  "psi-header.config": {
    "forceToTop": true,
    "blankLinesAfter": 3,
    "license": "Custom"
  },
  "psi-header.changes-tracking": {
    "isActive": true,
    "modAuthor": "Modified By: ",
    "modDate": "Last Modified: ",
    "modDateFormat": "date",
    "include": [],
    "exclude": ["markdown", "json", "less", "sass", "css"],
    "excludeGlob": ["out/**", "src/**/*.xyz", "components/**/*.mk"],
    "autoHeader": "autoSave"
  },
  "psi-header.license-text": ["May the force be with you."],
  "psi-header.variables": [
    ["company", "https://github.com/vannvan"],
    ["author", "van"],
    ["authoremail", "adoerww@gamil.com"]
  ],
  "psi-header.lang-config": [
    {
      "language": "javascript",
      "begin": "/**",
      "prefix": " * ",
      "end": " */",
      "blankLinesAfter": 2,
      "forceToTop": false
    },
    {
      "language": "javascript",
      "mapTo": "javascript"
    },
    {
      "language": "javascriptreact",
      "mapTo": "javascript"
    },
    {
      "language": "typescriptreact",
      "mapTo": "javascript"
    }
  ],
  "psi-header.templates": [
    {
      "language": "javascript",
      "template": [
        "Description: ",
        "Created: <<filecreated('YYYY-MM-DD HH:mm:ss')>>",
        "Author: <<author>>",
        "Email : <<authoremail>>",
        "-----",
        "Last Modified: <<dateformat('YYYY-MM-DD HH:mm:ss')>>",
        "Modified By: <<author>>",
        "-----",
        "Copyright (c) <<year>> <<company>>"
      ]
    },
    {
      "language": "typescriptreact",
      "mapTo": "javascript"
    },
    {
      "language": "typescript",
      "mapTo": "javascript"
    },
    {
      "language": "javascriptreact",
      "mapTo": "javascript"
    }
  ]
}
```



## 配置文档

[psi-header-github](https://github.com/davidquinn/psi-header)