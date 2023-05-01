/*
 * Description: 138：复制带随机指针的链表
 * Url: https://leetcode.cn/problems/copy-list-with-random-pointer/
 * Created: 2023-05-01 23:08:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import copyRandomList from "../copyRandomList";
describe("复制带随机指针的链表 测试", () => {
  it("copyRandomList function", () => {
    expect(
      copyRandomList([
        [7, null],
        [13, 0],
        [11, 4],
        [10, 2],
        [1, 0],
      ])
    );
    expect(
      copyRandomList([
        [1, 1],
        [2, 1],
      ])
    );
    expect(
      copyRandomList([
        [3, null],
        [3, 0],
        [3, null],
      ])
    );
  });
});
