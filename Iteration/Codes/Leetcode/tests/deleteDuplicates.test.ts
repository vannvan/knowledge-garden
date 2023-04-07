/*
 * Description: 83：删除排序链表中的重复元素
 * Url: https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
 * Created: 2023-04-07 22:25:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import deleteDuplicates from "../deleteDuplicates";
describe("删除排序链表中的重复元素 测试", () => {
  it("deleteDuplicates function", () => {
    expect(deleteDuplicates([1, 1, 2]));
    expect(deleteDuplicates([1, 1, 2, 3, 3]));
  });
});
