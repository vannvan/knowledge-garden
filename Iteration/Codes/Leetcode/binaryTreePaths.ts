/*
 * Description: 257：二叉树的所有路径
 * Url: https://leetcode.cn/problems/binary-tree-paths/
 * Tags: 树  深度优先搜索  字符串  回溯  二叉树
 * Created: 2023-04-02 12:58:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 13:27:12
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

function binaryTreePaths1(root: TreeNode | null): string[] {
  // Think for yourself for 5 minutes...

  const ans: string[] = []
  const track = []

  const traverse = (node: TreeNode) => {
    track.push(node.val)
    if (node.left === null && node.right === null && node.val) {
      let path = track.join('->')
      // console.log('path', path)
      ans.push(path)
      return
    }

    if (node.left) {
      traverse(node.left)
      track.pop()
    }

    if (node.right) {
      traverse(node.right)
      track.pop()
    }
  }

  traverse(root)

  return ans
}

function binaryTreePaths(root: TreeNode | null): string[] {
  const ans: string[] = []

  const traverse = (node: TreeNode, path: string) => {
    // 递归到叶子节点就终止
    if (node.left === null && node.right === null && node.val !== null) {
      path += node.val
      ans.push(path)
      return
    }
    path += node.val + '->'
    node.left && traverse(node.left, path)
    node.right && traverse(node.right, path)
  }

  traverse(root, '')

  return ans
}

export default binaryTreePaths
