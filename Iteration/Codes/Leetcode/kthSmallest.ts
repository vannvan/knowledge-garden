/*
 * Description: 230：二叉搜索树中第K小的元素
 * Url: https://leetcode.cn/problems/kth-smallest-element-in-a-bst/
 * Tags: 树  深度优先搜索  二叉搜索树  二叉树
 * Created: 2023-05-03 22:34:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-03 23:46:20
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

function kthSmallest1(root: TreeNode | null, k: number): number {
  // Think for yourself for 5 minutes...
  let arr: number[] = []
  const dfs = (node: TreeNode) => {
    if (node !== null) {
      dfs(node.left)
      arr.push(node.val)
      dfs(node.right)
    }
  }
  dfs(root)

  return arr[k - 1]
}

function kthSmallest(root: TreeNode | null, k: number): number {
  const stack = []
  if (root) stack.push(root)
  let curNode = root
  while (curNode || stack.length) {
    if (curNode) {
      stack.push(curNode)
      curNode = curNode.left
    } else {
      curNode = stack.pop()
      --k
      if (k === 0) break
      curNode = curNode.right
    }
  }
  return curNode.val
}
export default kthSmallest
