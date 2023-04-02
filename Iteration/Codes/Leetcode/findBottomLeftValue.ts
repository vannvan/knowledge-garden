/*
 * Description: 513：找树左下角的值
 * Url: https://leetcode.cn/problems/find-bottom-left-tree-value/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-04-02 17:44:26
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 18:03:19
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
 * 迭代法
 * @param root
 * @returns
 */
function findBottomLeftValue1(root: TreeNode | null): number {
  // Think for yourself for 5 minutes...
  // q1. 最底层 最左边的值
  if (root === null) return 0
  let target = 0
  const queue: TreeNode[] = [root]

  while (queue.length) {
    const length = queue.length

    for (let i = 0; i < length; i++) {
      const node = queue.shift()
      if (i === 0 && node.val) {
        target = node.val
      }
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return target
}

/**
 * 递归法
 * @param root
 */
function findBottomLeftValue(root: TreeNode | null): number {
  let ans: number = 0

  const dfs = (node: TreeNode, depth: number) => {
    if (node.left === null && node.right === null) {
      if (depth > maxDepth) {
        maxDepth = depth
        ans = node.val
      }
      return
    }

    node.left && dfs(node.left, depth + 1)
    node.right && dfs(node.right, depth + 1)
  }

  let maxDepth = 0
  if (root === null) return 0
  dfs(root, 1)
  return ans
}

export default findBottomLeftValue
