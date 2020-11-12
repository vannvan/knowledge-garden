### CLI区别



| npm (v5)                                | Yarn                            |
| :-------------------------------------- | :------------------------------ |
| `npm install`                           | `yarn install`                  |
| **(不适用)**                            | `yarn install --flat`           |
| **(不适用)**                            | `yarn install --har`            |
| `npm install --no-package-lock`         | `yarn install --no-lockfile`    |
| **(不适用)**                            | `yarn install --pure-lockfile`  |
| `npm install [package]`                 | `yarn add [package]`            |
| `npm install [package] --save-dev`      | `yarn add [package] --dev`      |
| **(不适用)**                            | `yarn add [package] --peer`     |
| `npm install [package] --save-optional` | `yarn add [package] --optional` |
| `npm install [package] --save-exact`    | `yarn add [package] --exact`    |
| **(不适用)**                            | `yarn add [package] --tilde`    |
| `npm install [package] --global`        | `yarn global add [package]`     |
| `npm update --global`                   | `yarn global upgrade`           |
| `npm rebuild`                           | `yarn install --force`          |
| `npm uninstall [package]`               | `yarn remove [package]`         |
| `npm cache clean`                       | `yarn cache clean [package]`    |
| `rm -rf node_modules && npm install`    | `yarn upgrade`                  |

## 设置为淘宝镜像

```shell
yarn config set registry https://registry.npm.taobao.org/
```

## 设置为官方镜像

```shell
yarn config set registry https://registry.yarnpkg.com
```