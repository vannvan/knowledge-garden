/*
 * Description: 669：修剪二叉搜索树
 * Url: https://leetcode.cn/problems/trim-a-binary-search-tree/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-04-04 22:35:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 22:41:12
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

function trimBST(root: TreeNode | null, low: number, high: number): TreeNode | null {
  // Think for yourself for 5 minutes...
  // q1. 可以转换成删掉小于low和大于high的二叉树节点

  if (root === null) return null
  const x = root.val

  if (x > high) {
    return trimBST(root.left, low, high)
  }

  if (x < low) {
    return trimBST(root.right, low, high)
  }

  root.left = trimBST(root.left, low, high)
  root.right = trimBST(root.right, low, high)
  return root
}
export default trimBST
