/*
 * Description: 平衡二叉树
 * Created: 2023-02-16 23:02:56
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-02-17 21:05:32
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

// import BinarySearchTree from './binarySearchTree'

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
}

class Node {
  constructor(data) {
    this.root = this
    this.data = data
    this.left = null
    this.right = null
  }
}
class AVLTree {
  constructor() {
    this.root = null
  }

  insert(data) {
    this.root = this.insertNode(this.root, data)
  }

  insertNode(node, data) {
    if (node == null) {
      return new Node(data)
    } else if (data < node.data) {
      // console.log('小于')
      // 往左添加
      node.left = this.insertNode(node.left, data)
    } else if (data > node.data) {
      // console.log('大于')
      // 往右添加
      node.right = this.insertNode(node.right, data)
    } else {
      return node
    }
    const balanceFactor = this.getBalance(node)
    // 左边高度差过大 5
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 如果插入值小于左边的值
      console.log('左边高度差过大')
      if (data < node.left.data) {
        node = this.rotationLL(node)
      } else {
        return this.rotationLR(node)
      }
    }

    // 右边高度过大 1
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      console.log('右边高度过大')
      if (data > node.right.data) {
        node = this.rotationRR(node)
      } else {
        return this.rotationRL(node)
      }
    }
    return node
  }

  removeNode(node, data) {
    node = this.remove(node, data)
    // console.dir(node)
    if (node == null) {
      return node
    }

    const balanceFactor = this.getBalance(node)

    console.log('删除完的平衡因子', balanceFactor)

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalance(node.left) === BalanceFactor.BALANCED ||
        this.getBalance(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node)
      }
      if (this.getBalance(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node)
      }
    }

    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalance(node.right) === BalanceFactor.BALANCED ||
        this.getBalance(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node)
      }

      if (this.getBalance(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node)
      }
    }
    return node
  }

  /**
   * 移除节点
   * @param {*} data
   * @returns
   */
  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) return null
      if (node.data === data) {
        // 没有左右子节点，指向null移除它
        if (node.left === null && node.right === null) return null
        // 它没有左节点，需要把它的引用改为右节点
        if (node.left === null) return node.right
        // 他没有右节点，需要把它的引用改为左节点
        if (node.right === null) return node.left
        // 有左右节点，当找到了要移除的节点后,需要找到它右边子树最小的节点,即它的继承者
        if (node.left !== null && node.right !== null) {
          let _node = this.minNode(node.right)
          node.data = _node.data // 用右侧子树最小的节点的键去更新node的键
          node.right = removeNode(node.right, data) // 更新完node的键后，树中存在了两个相同的键，因此需要移除多余的键
          return node
        }
      } else if (data < node.data) {
        // 目标key小于当前节点的值则沿着树的左边找
        node.left = removeNode(node.left, data)
        return node
      } else {
        // 目标key大于当前节点的值则沿着树的右边找
        node.right = removeNode(node.right, data)
        return node
      }
    }
    // 返回已处理完的树
    return removeNode(this.root, data)
  }
  minNode(node) {
    let current = node
    while (current != null && current.left != null) {
      current = current.left
    }
    return current.data
  }

  /**
   * 获取节点高度
   * @param {*} node
   * @returns
   */
  getNodeHeight(node) {
    if (node == null) {
      return -1
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }

  getBalance(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    console.log(`${node.data}的平衡因子为:`, heightDifference)
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }

  /**
   * 左旋
   * 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的
   * @param {*} node
   */
  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }

  /**
   * 右旋
   * 它出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
   * @param {*} node
   */
  rotationRR(node) {
    console.log('右旋', node.data)
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  /**
   * 先右再左
   * 出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
   * @param {*} node
   */
  rotationRL(node) {
    node.left = this.rotationLL(node)
    return this.rotationRR(node)
  }

  /**
   * 先左再右
   * 出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
   */
  rotationLR(node) {
    node.right = this.rotationRR(node)
    return this.rotationLL(node)
  }
}

const avl = new AVLTree()

const datas = [3, 5, 7, 15, 24, 56, 11, 33, 42, 2, 4, 6, 12]

datas.forEach((item) => {
  avl.insert(item)
})

// avl.removeNode(12)

console.dir(avl)
