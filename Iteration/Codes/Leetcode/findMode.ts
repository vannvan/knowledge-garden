/*
 * Description: 501：二叉搜索树中的众数
 * Url: https://leetcode.cn/problems/find-mode-in-binary-search-tree/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-04 15:12:09
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 15:37:42
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * 一般的思路
 * @param root
 * @returns
 */
function findMode1(root: TreeNode | null): number[] {
  // Think for yourself for 5 minutes...
  // q1. 众数
  // q2. 可能存在多个数字出现次数一样 [1,2,2,3,3]   此时2和3都是众数

  const ans: number[] = []

  const hash = {}

  const traversal = (node: TreeNode) => {
    if (!node) return

    hash[node.val] = (hash[node.val] || 0) + 1

    node.left && traversal(node.left)
    node.right && traversal(node.right)
  }

  traversal(root)

  // 排序
  let max = 0
  for (const key in hash) {
    max = Math.max(hash[key], max)
  }

  // 将那些最大次数的push
  for (const key in hash) {
    if (hash[key] === max) {
      ans.push(Number(key))
    }
  }

  return ans
}

/**
 * 利用BST的性质
 * @param root
 */
function findMode(root: TreeNode | null): number[] {
  let count = 0
  let maxCount = 1
  let pre = root
  let ans = []

  const traversal = (node: TreeNode) => {
    if (node === null) return

    traversal(node.left)

    // 单层递归的逻辑
    if (pre.val === node.val) {
      count++
    } else {
      count = 1
    }

    pre = node

    if (count === maxCount) {
      ans.push(node.val)
    }

    // 遇到了出现次数更多的数字
    if (count > maxCount) {
      ans = []
      maxCount = count
      ans.push(node.val)
    }
    traversal(node.right)
  }

  traversal(root)

  return ans
}
export default findMode
