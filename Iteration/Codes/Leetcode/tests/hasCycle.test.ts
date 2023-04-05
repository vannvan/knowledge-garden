/*
 * Description: 141：环形链表
 * Url: https://leetcode.cn/problems/linked-list-cycle/
 * Created: 2023-04-05 17:46:49
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import hasCycle from "../hasCycle";
describe("环形链表 测试", () => {
  it("hasCycle function", () => {
    expect(hasCycle([3, 2, 0, -4], 1));
    expect(hasCycle([1, 2], 0));
    expect(hasCycle([1], -1));
  });
});
