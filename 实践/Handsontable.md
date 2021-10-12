## 	常用配置

```js
// 模拟数据 100行 50列
var myData = Handsontable.helper.createSpreadsheetData(100, 50),
  container = document.getElementById('Handsontable-box'),
  hot;
 
hot = new Handsontable(container, {
  data: myData, // 数据
  colWidths: 100, // 列宽
  readOnly: false, // 表格只读关闭 
  rowHeaders: true, // 显示行头
  colHeaders: true, // 显示列头
  fixedRowsTop: 2, // 固定顶部2行
  fixedColumnsLeft: 2, // 固定左侧2列
  columnSorting: true, // 列排序
  sortIndicator: true, // 显示列排序箭头
  manualRowResize: true, // 行高调整
  manualColumnResize: true, // 列宽调整
  manualRowMove: true, // 行移动
  manualColumnMove: true, // 列移动
});  

```

## 工具栏操作方法对应style属性

| 文字颜色 | 水平对齐          | 垂直对齐          | 下划线          | 加粗        | 斜体       | 文字大小  | 填充颜色         |      |      |
| -------- | ----------------- | ----------------- | --------------- | ----------- | ---------- | --------- | ---------------- | ---- | ---- |
| color    | text-align        | vertical-align    | text-decoration | font-weight | font-style | font-size | background-color |      |      |
| rgb      | left/center/right | top/middle/bottom | underline       | bold        | italic     | 默认12pt  | rgb              |      |      |

## 操作单元格样式的大体过程

```js
// 传入hot实例 
const setAlign = (hot: any) => {
    console.log('selected:', hot.getSelected())
    const align = 'center'
    let selected = hot.getSelected() // 这里拿到选中的单元格
    let [startRow, startCol, endRow, endCol] = selected[0]
    // 这里要做交换的原因是因为可能是从右下往左上选的
    if (startRow > endRow) {
      ;[startRow, endRow] = [endRow, startRow]
    }
    if (startCol > endCol) {
      ;[startCol, endCol] = [endCol, startCol]
    }
    console.log(startRow, startCol, endRow, endCol)
  	// 二维表格需要两次遍历
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        let cellDef = hot.getCell(i, j)
        let td = hot.getCell(i, j)
        if (!cellDef) {
          continue
        }
        $(td).css('text-align', align)
      }
    }
  }
```



## 有用的文章

- [Handsontable属性、常用配置汇总](https://blog.csdn.net/qq_41483673/article/details/103488838)
- [属性汇总](https://www.cnblogs.com/QiuJL/p/6956771.html)
- [方法汇总-很全](https://www.cnblogs.com/tangle5500/p/11406026.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BE%B9%E6%A1%86)
- [一个完整使用教程-很不错](https://segmentfault.com/a/1190000010296353?utm_source=sf-similar-article)
- [](https://www.cnblogs.com/cosyer/p/6741546.html)
- [别人的资料](https://www.jianshu.com/p/924481947c30)
- [常用配置项笔记-详细](http://t.zoukankan.com/daowangzhizhu-pt-p-7702019.html)

