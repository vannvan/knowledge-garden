/*
 * Description: 148：排序链表
 * Url: https://leetcode.cn/problems/sort-list/
 * Created: 2023-04-15 18:47:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import sortList from "../sortList";
describe("排序链表 测试", () => {
  it("sortList function", () => {
    expect(sortList([4, 2, 1, 3]));
    expect(sortList([-1, 5, 3, 4, 0]));
    expect(sortList([]));
  });
});
