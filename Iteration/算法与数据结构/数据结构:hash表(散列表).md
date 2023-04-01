# 数据结构:hash表(散列表) 
概念：
> [https://www.yuque.com/vannvan/tools/vh7v1ihxmexcft9o#yVcmv](https://www.yuque.com/vannvan/tools/vh7v1ihxmexcft9o#yVcmv)

hash函数的构造准则：简单、均匀。

1. 散列函数的计算简单，快速；
2. 使哈希地址均匀地分布在地址集{0,1，…，m-1}上，并且冲突最小。** **
## 常用方法

1. put(key,value)  添加
2. get(key)  获取值
3. remove(key)  删除
## 代码实现
```javascript
/*
 * Description:  hash表
 * Created: 2023-02-16 11:52:57
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 14:39:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}:${this.value}]`
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.loseloseHashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    if (!key) return undefined
    const valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  remove(key) {
    if (!key) return undefined
    const hashCode = this.hashCode(key)
    if (hashCode != null) {
      delete this.table[hashCode]
      return true
    }
    return false
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }

    let code = 0
    const str = this.toString(key)
    for (let i = 0; i < str.length; i++) {
      code += str.charCodeAt(i)
    }
    return code % 37 // 大概率保证不产生重复值
  }

  toString(item) {
    if (item === null) {
      return 'NULL'
    } else if (item === undefined) {
      return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`
    }
    return item.toString()
  }
}

const ht = new HashTable()

ht.put(2, 2)
ht.put('hello', 'hello-1')
ht.put('world', 'world-1')

ht.remove('world')

console.log('get', ht.get('hello'))

console.log('get', ht.get('world'))

```

## 冲突
由于hash插入新值时无法完全确保新key与已存储的key不冲突，因此当不同值在散列表中对应位置相同的时候，我们称为**冲突**。
### 分离链接
#### 概念解释
分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面。是最简单的方法，但是需要开辟额外的空间。
当采用分离链接的方法处理冲突时，相同位置的散列表的值存储关系如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1676530557254-5f33ef2f-ee74-4931-9b90-ab1f1b52a333.png#averageHue=%23f2f2f2&clientId=uc4c54c4d-decf-4&from=paste&height=250&id=u0d13aa71&name=image.png&originHeight=622&originWidth=1494&originalType=binary&ratio=2&rotation=0&showTitle=false&size=151143&status=done&style=none&taskId=u5cc629cd-f774-4d47-9207-d3b622ff846&title=&width=600)
#### 代码演示
注意put方法演示当遇到冲突时如何用分离链接法处理
```javascript
/*
 * Description: 分离链接处理hash冲突，关键方法
 * Created: 2023-02-16 14:58:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 15:40:47
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}:${this.value}]`
  }
}

class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
  add(data) {
    let node = new Node(data)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      // 从头开始捋一遍，添加到最后
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
  }

  getHead() {
    return this.head
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      if (this.table[position] == undefined) {
        this.table[position] = new LinkedList()
      }
      // 注意这里，前面相同key已经用Node节点占坑了，此时添加就用链表方法加
      this.table[position].add(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    // 这里其实应该更严格判断连表是否为空，先省略
    if (linkedList != null) {
      const current = linkedList.getHead()
      while (current != null) {
        if (current.data.key === key) {
          return current.data.value
        }
      }
      current = current.next
    }
    return undefined
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }

    let code = 0
    const str = this.toString(key)
    for (let i = 0; i < str.length; i++) {
      code += str.charCodeAt(i)
    }
    return code % 37 // 大概率保证不产生重复值
  }

  toString(item) {
    if (item === null) {
      return 'NULL'
    } else if (item === undefined) {
      return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`
    }
    return item.toString()
  }
}

const ht = new HashTable()

ht.put('Nathan', 'hello-1')
ht.put('Sargeras', 'hello-2')
ht.put('hello', 'hello-3')

// console.dir(ht)

console.log('get', ht.get('Nathan'))
console.log('get', ht.get('hello'))

```

### 线性探查
#### 概念解释
之所以称作线性，是因为它处理冲突的方法是将元素直接存储到表中，而不是在单独的数据结构中。当尝试往表中position位置添加数据的时候，如果position已经被占了，就尝试position+1，position+2，直到找到表中空闲的位置，大致原理如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1553840/1676534554630-20342afa-2833-4cbc-b525-71980039b5a7.png#averageHue=%23eaeaea&clientId=ub8a55041-797f-4&from=paste&height=368&id=u43aa0de9&name=image.png&originHeight=576&originWidth=940&originalType=binary&ratio=2&rotation=0&showTitle=false&size=134197&status=done&style=none&taskId=uddc82f8f-6e06-4322-b60d-a198267d377&title=&width=600)

#### 代码演示
```javascript
/*
 * Description: hash表 线性排查处理冲突
 * Created: 2023-02-16 16:03:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-16 16:20:13
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class ValuePair {
  constructor(key, value) {
    this.key = key
    this.value = value
  }

  toString() {
    return `[#${this.key}:${this.value}]`
  }
}

class HashTable {
  constructor() {
    this.table = {}
  }

  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key)
      // 没被占直接添加
      if (this.table[position] === undefined) {
        this.table[position] = new ValuePair(key, value)
      } else {
        let index = position + 1
        // 一直找到没被占的位置
        while (this.table[index] != null) {
          index++
        }
        this.table[index] = new ValuePair(key, value)
      }
      return true
    }
    return false
    //
  }

  get(key) {
    const position = this.hashCode(key)
    if (this.table[position]) {
      if (this.table[position].key === key) {
        return this.table[position].value
      } else {
        let index = position + 1
        while (this.table[index] != null && this.table[index].key !== key) {
          i++
        }
        if (this.table[index] != null && this.table[index].key === key) {
          return this.table[index].value
        }
      }
    }
    return undefined
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }

    let code = 0
    const str = this.toString(key)
    for (let i = 0; i < str.length; i++) {
      code += str.charCodeAt(i)
    }
    return code % 37 // 大概率保证不产生重复值
  }

  toString(item) {
    if (item === null) {
      return 'NULL'
    } else if (item === undefined) {
      return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
      return `${item}`
    }
    return item.toString()
  }
}

const ht = new HashTable()
ht.put('hello', 'hello-1')
ht.put('Nathan', 'world-1')
ht.put('Sargeras', 'world-2')

console.dir(ht)

console.log('get', ht.get('hello'))

console.log('get', ht.get('Nathan'))

console.log('get', ht.get('Sargeras'))

```

## 常用构造方法
所谓构造方法即hash表的地址生成方法，常用的构造方法包括：直接定址法、相乘取整法、平方取中法、除留余数法、伪随机数法、数字分析法和分段折叠法。
### 直接定址法
> H(key) = a*key + b

其中a和b为常数，这种哈希函数叫做自身函数。当a=1，b=0时，H(key)=key。 

### 相乘取整法
首先用关键字key乘上某个常数A(0 < A < 1)，并抽取出key*A的小数部分；然后用m乘以该小数后取整。
### 平方取整法
 当无法确定关键字中哪几位分布较均匀时，先求出关键字的平方值，然后按需要取平方值的中间几位作为哈希地址。
举例：将一组关键字(0100，0110，1010，1001，0111)
平方后得(0010000，0012100，1020100，1002001，0012321)
若取表长为1000，则可取中间的三位数作为散列地址集：(100，121，201，020，123)。

### 除留余数法
> H(key) = key MOD p (p ≤ m)。

MOD表示求余数。这是一种最简单，也最常用的构造哈希函数的方法。它不仅可以对关键字直接取模，也可在对关键字进行折迭、平方取中等运算之后取模。温馨提示，在使用除留余数法时，对p的选择很重要，一般情况下可以选p为质数或不包含小于20的质因素的合数。

### 伪随机法
> H(key) = random (key)

其中random为伪随机函数。通常，当关键字长度不等时采用此法构造哈希函数较恰当。 

### 数字分析法
假设已经知道哈希表中所有的关键字值，而且关键字值都是数字，则可以取关键字值的若干位数字组成哈希地址，这种方法叫做数字分析法。
举例：有1000个记录，关键字为10位十进制整数x1x2…x10，如哈希表长度为2000。假设经过分析，各关键字中 x3、x5和x7的取值分布近似随机，则可去哈希函数为：h(key)=h(x1x2…x10)=x3x5x7。例如，h(3778597189)=757，h(9166372560)=632。 

### 分段叠加法
举例：根据国际标准图书编号（ISBN）建立一个哈希表。如一个国际标准图书编号 0-4**42-20**586-4的哈希地址为：
使用移位叠加 5864 +4220+04 =1 0088，故H（0-442-20586-4）= 0088（将分割后的每一部分的最低位对齐）。
使用边界叠加法叠加 5864 +0224+04 =6092，故H（0-442-20586-4）= 6092（从一端向另一端沿分割界来回叠加）。

## 资料



