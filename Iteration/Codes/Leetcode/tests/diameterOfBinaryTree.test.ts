/*
 * Description: 543：二叉树的直径
 * Url: https://leetcode.cn/problems/diameter-of-binary-tree/
 * Created: 2023-04-12 22:18:35
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import diameterOfBinaryTree from "../diameterOfBinaryTree";
describe("二叉树的直径 测试", () => {
  it("diameterOfBinaryTree function", () => {
    expect(diameterOfBinaryTree([1, 2, 3, 4, 5]));
    expect(diameterOfBinaryTree([1, 2]));
  });
});
