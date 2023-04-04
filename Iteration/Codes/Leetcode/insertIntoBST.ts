/*
 * Description: 784：二叉搜索树中的插入操作
 * Url: https://leetcode.cn/problems/insert-into-a-binary-search-tree/
 * Tags: 树  二叉搜索树  二叉树
 * Created: 2023-04-04 21:59:01
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-04 22:03:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import { TreeNode } from './utils/tree'

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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {
  // Think for yourself for 5 minutes...
  if (root === null) return new TreeNode(val)
  if (root.val < val) {
    root.right = insertIntoBST(root.right, val)
  }
  if (root.val > val) {
    root.left = insertIntoBST(root.left, val)
  }

  return root
}
export default insertIntoBST
