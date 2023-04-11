/*
 * Description: 234：回文链表
 * Url: https://leetcode.cn/problems/palindrome-linked-list/
 * Created: 2023-04-11 20:39:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import isPalindrome from "../isPalindrome_II";
describe("回文链表 测试", () => {
  it("isPalindrome function", () => {
    expect(isPalindrome([1, 2, 2, 1]));
    expect(isPalindrome([1, 2]));
  });
});
