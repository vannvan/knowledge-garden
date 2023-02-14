/**
 *  二叉树遍历
 */

const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'C',
    },
    right: {
      val: 'D',
    },
  },
  right: {
    val: 'E',
    left: {
      val: 'F',
    },
    right: {
      val: 'G',
    },
  },
}

// 所谓 先 中 后 序遍历，就是根节点的遍历顺序不同

// 先序遍历
const order1 = (root) => {
  if (!root) return
  console.log('current value', root.val)
  order1(root.left)
  order1(root.right)
}

// 中序遍历
const order2 = (root) => {
  if (!root) return
  order2(root.left)
  console.log('current value', root.val)
  order2(root.right)
}

// 后序遍历
const order3 = (root) => {
  if (!root) return
  order3(root.left)
  order3(root.right)
  console.log('current value', root.val)
}

order1(root)
