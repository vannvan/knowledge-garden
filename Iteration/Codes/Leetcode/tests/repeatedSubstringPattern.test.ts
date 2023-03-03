/*
 * Description: 重复的子字符串
 * Url: https://leetcode.cn/problems/repeated-substring-pattern/
 * Created: 2023-03-03 21:06:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import repeatedSubstringPattern from "../repeatedSubstringPattern";
describe("重复的子字符串 测试", () => {
  it("repeatedSubstringPattern function", () => {
    expect(repeatedSubstringPattern("abab"));
    expect(repeatedSubstringPattern("aba"));
    expect(repeatedSubstringPattern("abcabcabcabc"));
  });
});
