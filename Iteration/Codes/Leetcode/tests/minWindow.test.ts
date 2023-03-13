/*
 * Description: 76：最小覆盖子串
 * Url: https://leetcode.cn/problems/minimum-window-substring/
 * Created: 2023-03-13 23:24:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import minWindow from "../minWindow";
describe("最小覆盖子串 测试", () => {
  it("minWindow function", () => {
    expect(minWindow("ADOBECODEBANC", "ABC"));
    expect(minWindow("a", "a"));
    expect(minWindow("a", "aa"));
  });
});
