/*
 * Description: 114：二叉树展开为链表
 * Url: https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/
 * Created: 2023-04-10 23:02:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import flatten from "../flatten";
describe("二叉树展开为链表 测试", () => {
  it("flatten function", () => {
    expect(flatten([1, 2, 5, 3, 4, null, 6]));
    expect(flatten([]));
    expect(flatten([0]));
  });
});
