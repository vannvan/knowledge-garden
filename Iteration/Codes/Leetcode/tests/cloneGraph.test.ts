/*
 * Description: 133：克隆图
 * Url: https://leetcode.cn/problems/clone-graph/
 * Created: 2023-05-11 23:13:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-03 11:10:10
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import cloneGraph from "../cloneGraph";
describe("克隆图 测试", () => {
  it("cloneGraph function", () => {
    expect(
      cloneGraph([
        [2, 4],
        [1, 3],
        [2, 4],
        [1, 3],
      ])
    );
    expect(cloneGraph([[]]));
    expect(cloneGraph([]));
  });
});
