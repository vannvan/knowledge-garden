/*
 * Description: 142：环形链表 II
 * Url: https://leetcode.cn/problems/linked-list-cycle-ii/
 * Created: 2023-04-05 17:43:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import detectCycle from "../detectCycle";
describe("环形链表 II 测试", () => {
  it("detectCycle function", () => {
    expect(detectCycle([3, 2, 0, -4], 1));
    expect(detectCycle([1, 2], 0));
    expect(detectCycle([1], -1));
  });
});
