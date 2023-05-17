/*
 * Description: 662：二叉树最大宽度
 * Url: https://leetcode.cn/problems/maximum-width-of-binary-tree/
 * Created: 2023-05-17 21:33:12
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import widthOfBinaryTree from "../widthOfBinaryTree";
describe("二叉树最大宽度 测试", () => {
  it("widthOfBinaryTree function", () => {
    expect(widthOfBinaryTree([1, 3, 2, 5, 3, null, 9]));
    expect(widthOfBinaryTree([1, 3, 2, 5, null, null, 9, 6, null, 7]));
    expect(widthOfBinaryTree([1, 3, 2, 5]));
  });
});
