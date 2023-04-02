/*
 * Description: 100289：对称的二叉树
 * Url: https://leetcode.cn/problems/dui-cheng-de-er-cha-shu-lcof/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 14:26:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 14:32:22
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

function isMirror(q: TreeNode, p: TreeNode): boolean {
  if (!q && !p) return true
  if (!q || !p) return false

  return q.val === p.val && isMirror(q.left, p.right) && isMirror(q.right, p.left)
}

function isSymmetric(root: TreeNode | null): boolean {
  // Think for yourself for 5 minutes...
  return isMirror(root, root)
}
export default isSymmetric
