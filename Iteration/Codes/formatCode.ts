/*
 * Description: 用来转换代码格式
 * Created: 2023-03-31 21:25:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-31 23:42:31
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function minDepth(root: TreeNode | null): number {
  if (root === null) return 0
  let leftDepth = minDepth(root.left)
  let rightDepth = minDepth(root.right)

  return root.left == null || root.right == null
    ? leftDepth + rightDepth + 1
    : Math.min(leftDepth, rightDepth) + 1
}
