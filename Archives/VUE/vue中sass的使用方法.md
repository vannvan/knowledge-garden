引入sass及loader

```json
"node-sass": "^4.11.0",
"sass": "^1.17.0",
"sass-loader": "^7.1.0",
"sass-resources-loader": "^2.0.0",
```

assets文件夹

scss文件形式

common.scss内容

```scss
@import './mixin.scss';
@import './icomoon.css';
@import './logistics-management.scss';

```

icommon.scss  （图标文件）

mixin.scss  

fonts文件夹

必要的字体文件

utils.js

第57行开始

```js
function resolveResouce(name) {
    return path.resolve(__dirname, '../src/assets/scss/' + name);
  }
  function generateSassResourceLoader() {
      var loaders = [
   cssLoader,
   // 'postcss-loader',
   'sass-loader',
   {
       loader: 'sass-resources-loader',
       options: {
         // it need a absolute path
         resources: [resolveResouce('common.scss')]    
       }
   }
      ];
      if (options.extract) {
   return ExtractTextPlugin.extract({
     use: loaders,
     fallback: 'vue-style-loader'
   })
      } else {
   return ['vue-style-loader'].concat(loaders)
      }
  }
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
```

这样就可以使用全局使用sass了 





