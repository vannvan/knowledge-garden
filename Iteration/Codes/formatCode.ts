/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 21:29:11
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

/**
 * 迭代法,模拟前序遍历
 */
function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  const swap = (root: TreeNode, left: TreeNode, right: TreeNode) => {
    let tmp = left
    root.left = right
    root.right = tmp
  }

  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
    swap(node, node.left, node.right)
  }

  return root
}
