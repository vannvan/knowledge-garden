/*
 * Description: 103：二叉树的锯齿形层序遍历
 * Url: https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/
 * Created: 2023-05-03 21:53:27
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import zigzagLevelOrder from "../zigzagLevelOrder";
describe("二叉树的锯齿形层序遍历 测试", () => {
  it("zigzagLevelOrder function", () => {
    expect(zigzagLevelOrder([3, 9, 20, null, null, 15, 7]));
    expect(zigzagLevelOrder([1]));
    expect(zigzagLevelOrder([]));
  });
});
