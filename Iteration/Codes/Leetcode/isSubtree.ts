/*
 * Description: 572：另一棵树的子树
 * Url: https://leetcode.cn/problems/subtree-of-another-tree/
 * Tags: 树  深度优先搜索  二叉树  字符串匹配  哈希函数
 * Created: 2023-04-02 13:59:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:07:52
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

import isSameTree from './isSameTree'

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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  // Think for yourself for 5 minutes...
  if (!root || !subRoot) {
    return false
  }

  if (isSameTree(root, subRoot)) {
    return true
  }
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}
export default isSubtree
