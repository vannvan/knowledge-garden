/*
 * Description: 226：翻转二叉树
 * Url: https://leetcode.cn/problems/invert-binary-tree/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 14:13:38
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:17:31
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

function invertTree(root: TreeNode | null): TreeNode | null {
  // Think for yourself for 5 minutes...
  if (!root) return null

  const leftTree = invertTree(root.left)
  const rightTree = invertTree(root.right)
  root.left = rightTree
  root.right = leftTree

  return root
}
export default invertTree
