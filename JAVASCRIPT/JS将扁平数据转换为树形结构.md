### 扁平数据示例1

```js
var menu_list = [{
      id: '1',
      menu_name: '设置',
      menu_url: 'setting',
      parent_id: 0
    }, {
      id: '1-1',
      menu_name: '权限设置',
      menu_url: 'setting.permission',
      parent_id: '1'
    }, {
      id: '1-1-1',
      menu_name: '用户管理列表',
      menu_url: 'setting.permission.user_list',
      parent_id: '1-1'
    }, {
      id: '1-1-2',
      menu_name: '用户管理新增',
      menu_url: 'setting.permission.user_add',
      parent_id: '1-1'
    }, {
      id: '1-1-3',
      menu_name: '角色管理列表',
      menu_url: 'setting.permission.role_list',
      parent_id: '1-1'
    }, {
      id: '1-2',
      menu_name: '菜单设置',
      menu_url: 'setting.menu',
      parent_id: '1'
    }, {
      id: '1-2-1',
      menu_name: '菜单列表',
      menu_url: 'setting.menu.menu_list',
      parent_id: '1-2'
    }, {
      id: '1-2-2',
      menu_name: '菜单添加',
      menu_url: 'setting.menu.menu_add',
      parent_id: '1-2'
    }, {
      id: '2',
      menu_name: '订单',
      menu_url: 'order',
      parent_id: 0
    }, {
      id: '2-1',
      menu_name: '报单审核',
      menu_url: 'order.orderreview',
      parent_id: '2'
    }, {
      id: '2-2',
      menu_name: '退款管理',
      menu_url: 'order.refundmanagement',
      parent_id: '2'
    }
]
```

#### 实现算法 buildTree

```js
/**
 * 将一维的扁平数组转换为多层级对象
 * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parent_id两个属性 
 * @return {[type]} tree 多层级树状结构
 */
function buildTree(list){
	let temp = {};
	let tree = {};
	for(let i in list){
		temp[list[i].id] = list[i];
	}
	for(let i in temp){
		if(temp[i].parent_id) {
			if(!temp[temp[i].parent_id].children) {
				temp[temp[i].parent_id].children = new Object();
			}
			temp[temp[i].parent_id].children[temp[i].id] = temp[i];
		} else {
			tree[temp[i].id] =  temp[i];
		}
	}
	return tree;
}

原文：https://blog.csdn.net/qq_37746973/article/details/78662177 
```

#### 实现算法2

```js
  buildTree(list){
      let map = {};
      list.forEach(item => {
        if (!map[item.id]) {
          map[item.id] = item;
        }
      });
      list.forEach(item => {
        if (item.parent_id !== 0) {
          map[item.parent_id].children ? map[item.parent_id].children.push(item) : map[item.parent_id].children = [item];
        }
      });
      return list.filter(item => {
        if (item.parent_id === 0) {
          return item;
        }
      })
    }
```

### 扁平数据示例2

```js
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
```

#### 实现算法

```js
const nest = (items, id = null, link = 'parent_id') =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
```

```js
buildTree = (source, id, parentId, children) => {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    let branchArr = cloneData.filter(child => father[id] == child[parentId]);
    branchArr.length > 0 ? father[children] = branchArr : ''
    return father[parentId] == 0        // 如果第一层不是parentId=0，请自行修改
  })
}
```
