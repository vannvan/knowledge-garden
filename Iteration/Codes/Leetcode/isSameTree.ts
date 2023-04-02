/*
 * Description: 100：相同的树
 * Url: https://leetcode.cn/problems/same-tree/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 13:46:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 13:57:19
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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  // Think for yourself for 5 minutes...

  const compare = (left: TreeNode, right: TreeNode): boolean => {
    // q1. 左右两侧都是null
    // q2. 左有值，右为null / 左为null，右有值
    // q3. 左右都有值，判断是否相等
    if (left === null && right !== null) {
      return false
    } else if (left !== null && right === null) {
      return false
    } else if (left === null && right === null) {
      return true
    } else if (left.val !== right.val) {
      return false
    }

    // 注意这里和对称二叉树的区别
    const outSide = compare(left.left, right.left)
    const inSide = compare(left.right, right.right)
    return outSide && inSide
  }

  return compare(p, q)
}
export default isSameTree
