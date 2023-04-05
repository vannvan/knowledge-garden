/*
 * Description: 86：分隔链表
 * Url: https://leetcode.cn/problems/partition-list/
 * Created: 2023-04-05 18:33:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import partition from "../partition_II";
describe("分隔链表 测试", () => {
  it("partition function", () => {
    expect(partition([1, 4, 3, 2, 5, 2], 3));
    expect(partition([2, 1], 2));
  });
});
