/*
 * Description:
 * Created: 2023-02-17 22:30:34
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-17 22:30:51
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
class AVLTree {
  constructor(num) {
    // this.root = {};
    this.value = num
    this.height = 1
    this.leftChild = null
    this.rightChild = null
  }

  addNum(num) {
    let result = this
    let point = new AVLTree(num) //创建节点 每一个节点都是一颗树
    if (point.value > this.value) {
      if (this.rightChild == null) {
        this.rightChild = point
      } else {
        result.rightChild = this.rightChild.addNum(num)
      }
      let balanceFactor = this.getBalance(this.rightChild, this.leftChild) //该树下面的左右节点平衡值
      if (balanceFactor == 2) {
        //差值过大 不平衡
        if (point.value > this.rightChild.value) {
          result = this.RR()
        } else {
          result = this.RL()
        }
      }
    } else if (point.value < this.value) {
      if (this.leftChild == null) {
        this.leftChild = point
      } else {
        result.leftChild = this.leftChild.addNum(num)
      }
      let balanceFactor = this.getBalance(this.leftChild, this.rightChild)
      if (balanceFactor == 2) {
        if (point.value < this.leftChild.value) {
          result = this.LL()
        } else {
          result = this.LR()
        }
      }
    } else {
      throw '输入了重复的值'
    }
    this.height = this.getMax(this.leftChild, this.rightChild) + 1
    return result
  }

  deleteNum(num) {
    var result = this
    if (num > this.value) {
      result.rightChild = this.rightChild.deleteNum(num)
    } else if (num < this.value) {
      result.leftChild = this.leftChild.deleteNum(num)
    } else {
      if (num !== this.value) {
        throw '输入了没有的值'
      }
      if (result.leftChild !== null) {
        let current = result.leftChild
        while (true) {
          //不停的找到左节点的最右子节点 到底
          if (current.rightChild) {
            current = current.rightChild
          } else {
            break
          }
        }
        result.value = current.value
        result.leftChild = result.leftChild.deleteNum(current.value)
      } else if (result.rightChild !== null) {
        let current = result.rightChild
        while (true) {
          if (current.leftChild) {
            current = current.leftChild
          } else {
            break
          }
        }
        result.value = current.value
        result.rightChild = result.rightChild.deleteNum(current.value)
      } else {
        console.log('delete' + result) // 最后子叶节点
        return null
      }
    }

    if (result.getBalance(result.leftChild, result.rightChild) == 2) {
      //再平衡
      if (
        result.getHeight(result.leftChild.rightChild) -
          result.getHeight(result.leftChild.leftChild) ==
        1
      ) {
        result = result.LR()
      } else {
        result = result.LL()
      }
    } else if (result.getBalance(result.leftChild, result.rightChild) == -2) {
      if (
        result.getHeight(result.rightChild.leftChild) -
          result.getHeight(result.rightChild.rightChild) ==
        1
      ) {
        result = result.RL()
      } else {
        result = result.RR()
      }
    } else {
      console.log('is balance')
    }
    result.height = this.getMax(this.leftChild, this.rightChild) + 1
    return result
  }
  getMax(a, b) {
    let aHeight, bHeight
    if (!a) {
      aHeight = 0
    } else {
      aHeight = a.height
    }
    if (!b) {
      bHeight = 0
    } else {
      bHeight = b.height
    }
    return aHeight > bHeight ? aHeight : bHeight
  }
  getBalance(a, b) {
    let aValue, bValue
    if (!a) {
      aValue = 0
    } else {
      aValue = a.height
    }
    if (!b) {
      bValue = 0
    } else {
      bValue = b.height
    }
    return aValue - bValue
  }
  getHeight(a) {
    if (a) {
      return a.height
    }
    return 0
  }
  RR() {
    let a = this
    let b = this.rightChild
    a.rightChild = b.leftChild
    b.leftChild = a
    a.height = a.getMax(a.rightChild, a.leftChild) + 1
    b.height = b.getMax(b.rightChild, b.rightChild) + 1
    return b
  }
  RL() {
    let a = this
    a.rightChild = a.rightChild.LL()
    a = a.RR()
    return a
  }
  LL() {
    let a = this
    let b = this.leftChild
    a.leftChild = b.rightChild
    b.rightChild = a
    a.height = a.getMax(a.rightChild, a.leftChild) + 1
    b.height = b.getMax(b.rightChild, b.rightChild) + 1
    return b
  }
  LR() {
    let a = this
    a.leftChild = a.leftChild.RR()
    a = a.LL()
    return a
  }
}

//使用方法
function createTree(arr) {
  let result
  arr.forEach((child, index) => {
    if (index === 0) {
      result = new AVLTree(child)
    } else {
      result = result.addNum(child)
    }
  })
  return result
}
var arr = [1, 3, 5, 7, 15, 24, 56, 11, 33, 42, 2, 4, 6, 12]
var tree = createTree(arr)

console.dir(tree)
