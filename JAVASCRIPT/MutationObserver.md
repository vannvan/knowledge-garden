### API

```js
const observer = new MutationObserver(function (mutations, observer) {
  mutations.forEach(function (mutation) {
    console.log(mutation.target); // target: 发生变动的 DOM 节点
  });
});

observer.observe(document.documentElement, {
  childList: true, //子节点的变动（指新增，删除或者更改）
  attributes: true, // 属性的变动
  characterData: true, // 节点内容或节点文本的变动
  subtree: true, // 表示是否将该观察器应用于该节点的所有后代节点
  attributeOldValue: false, // 表示观察 attributes 变动时，是否需要记录变动前的属性值
  characterDataOldValue: false, // 表示观察 characterData 变动时，是否需要记录变动前的值。
  attributeFilter: false, // 表示需要观察的特定属性，比如['class','src']
});

observer.disconnect(); // 用来停止观察。调用该方法后，DOM 再发生变动则不会触发观察器

```

