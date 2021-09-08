## 常用配置

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





## 有用的文章

- [Handsontable属性、常用配置汇总](https://blog.csdn.net/qq_41483673/article/details/103488838)
- [属性汇总](https://www.cnblogs.com/QiuJL/p/6956771.html)

