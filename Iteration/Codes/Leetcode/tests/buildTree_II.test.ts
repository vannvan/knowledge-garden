/*
 * Description: 105：从前序与中序遍历序列构造二叉树
 * Url: https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 * Created: 2023-04-02 21:37:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import buildTree from "../buildTree_II";
describe("从前序与中序遍历序列构造二叉树 测试", () => {
  it("buildTree function", () => {
    expect(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
    expect(buildTree([-1], [-1]));
  });
});
