/*
 * Description: 102：二叉树的层序遍历
 * Url: https://leetcode.cn/problems/binary-tree-level-order-traversal/
 * Tags: 树  广度优先搜索  二叉树
 * Created: 2023-04-02 21:31:03
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-02 21:35:09
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

function levelOrder(root: TreeNode | null): number[][] {
  // Think for yourself for 5 minutes...
  //二叉树的层序遍历
  const ans: number[][] = []
  const queue: TreeNode[] = []

  queue.push(root)

  if (root === null) {
    return ans
  }
  while (queue.length !== 0) {
    // 记录当前层级节点数,下面queue长度是会变的，因此要在这里存一份
    const length = queue.length
    // 存放每一层的节点
    const curLevel = []
    for (let i = 0; i < length; i++) {
      const node = queue.shift()
      curLevel.push(node.val)
      // 存放当前层下一层的节点
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    //把每一层的结果放到结果数组
    ans.push(curLevel)
  }
  console.log(ans)
  return ans
}
export default levelOrder
