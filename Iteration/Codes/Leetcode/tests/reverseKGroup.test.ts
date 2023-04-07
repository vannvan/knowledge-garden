/*
 * Description: 25：K 个一组翻转链表
 * Url: https://leetcode.cn/problems/reverse-nodes-in-k-group/
 * Created: 2023-04-07 20:40:52
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import reverseKGroup from "../reverseKGroup";
describe("K 个一组翻转链表 测试", () => {
  it("reverseKGroup function", () => {
    expect(reverseKGroup([1, 2, 3, 4, 5], 2));
    expect(reverseKGroup([1, 2, 3, 4, 5], 3));
  });
});
