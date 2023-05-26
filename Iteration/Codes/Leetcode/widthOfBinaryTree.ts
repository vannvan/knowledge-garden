/*
 * Description: 662：二叉树最大宽度
 * Url: https://leetcode.cn/problems/maximum-width-of-binary-tree/
 * Tags: 树  深度优先搜索  广度优先搜索  二叉树
 * Created: 2023-05-17 21:33:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-26 22:25:06
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

function widthOfBinaryTree1(root: TreeNode | null): number {
  let ans: bigint = 0n
  const queue = []
  queue.push({ node: root, index: 1n })

  while (queue.length) {
    const length = queue.length
    let min: bigint = queue[0].index
    let max: bigint = queue[length - 1].index
    let cur = max - min + 1n

    if (cur > ans) {
      ans = cur
    }

    for (let i = 0; i < length; i++) {
      const { node, index } = queue.shift()
      if (node.left) {
        queue.push({ node: node.left, index: index * 2n })
      }
      if (node.right) {
        queue.push({ node: node.left, index: index * 2n + 1n })
      }
    }
  }

  return Number(ans)
}

function widthOfBinaryTree(root: TreeNode | null): number {
  const hash = new Map()
  const dfs = (node: TreeNode, u: bigint, depth: bigint) => {
    if (node === null) return
    if (!hash.has(depth)) hash.set(depth, u)
    if (u - hash.get(depth) + 1n > ans) {
      ans = u - hash.get(depth) + 1n
    }
    // ans = Math.max(ans, hash.get(depth) + 1)
    // u = u - hash.get(depth) + 1
    dfs(node.left, u * 2n, depth + 1n)
    dfs(node.right, u * 2n + 1n, depth + 1n)
  }

  let ans: bigint = 0n
  dfs(root, 1n, 0n)
  return Number(ans)
}

export default widthOfBinaryTree
