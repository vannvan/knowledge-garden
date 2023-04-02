/*
 * Description: 106：从中序与后序遍历序列构造二叉树
 * Url: https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 * Tags: 树  数组  哈希表  分治  二叉树
 * Created: 2023-04-02 21:15:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:17:22
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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // Think for yourself for 5 minutes...
  if (!inorder.length) return null
  const rootVal = postorder.pop()
  const rootIndex = inorder.indexOf(rootVal)
  const root = new TreeNode(rootVal) // 创建中间节点
  root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex)) // 创建左节点
  root.right = buildTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex)) // 创建右节点
  return root
}
export default buildTree
