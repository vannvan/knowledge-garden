/*
 * Description: 114：二叉树展开为链表
 * Url: https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/
 * Tags: 栈  树  深度优先搜索  链表  二叉树
 * Created: 2023-04-10 23:02:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-10 23:08:18
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

const preOrder = (root: TreeNode, list: TreeNode[]) => {
  if (!root) return
  list.push(root)
  root.left && preOrder(root.left, list)
  root.right && preOrder(root.right, list)
}

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  // Think for yourself for 5 minutes...
  const list = []
  preOrder(root, list)
  for (let i = 1; i < list.length; i++) {
    const pre = list[i - 1]
    const cur = list[i]
    pre.left = null
    pre.right = cur
  }
}
export default flatten
