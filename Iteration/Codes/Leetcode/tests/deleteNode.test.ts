/*
 * Description: 450：删除二叉搜索树中的节点
 * Url: https://leetcode.cn/problems/delete-node-in-a-bst/
 * Created: 2023-04-04 22:14:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import deleteNode from "../deleteNode";
describe("删除二叉搜索树中的节点 测试", () => {
  it("deleteNode function", () => {
    expect(deleteNode([5, 3, 6, 2, 4, null, 7], 3));
    expect(deleteNode([5, 3, 6, 2, 4, null, 7], 0));
    expect(deleteNode([], 0));
  });
});
