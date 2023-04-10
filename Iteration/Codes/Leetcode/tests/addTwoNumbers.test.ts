/*
 * Description: 2：两数相加
 * Url: https://leetcode.cn/problems/add-two-numbers/
 * Created: 2023-04-10 20:45:53
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import addTwoNumbers from "../addTwoNumbers";
describe("两数相加 测试", () => {
  it("addTwoNumbers function", () => {
    expect(addTwoNumbers([2, 4, 3], [5, 6, 4]));
    expect(addTwoNumbers([0], [0]));
    expect(addTwoNumbers([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]));
  });
});
