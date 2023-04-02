/*
 * Description: 105：从前序与中序遍历序列构造二叉树
 * Url: https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Tags: 树  数组  哈希表  分治  二叉树
 * Created: 2023-04-02 21:37:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:42:16
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // Think for yourself for 5 minutes...
  if (!preorder.length) return null
  const rootVal = preorder.shift() // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
  const index = inorder.indexOf(rootVal) // 获取中间节点在中序遍历中的下标
  const root = new TreeNode(rootVal) // 创建中间节点
  root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index)) // 创建左节点
  root.right = buildTree(preorder.slice(index), inorder.slice(index + 1)) // 创建右节点
  return root
}
export default buildTree
