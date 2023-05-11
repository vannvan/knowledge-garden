/*
 * Description: 207：课程表
 * Url: https://leetcode.cn/problems/course-schedule/
 * Created: 2023-05-11 23:29:33
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-11 23:30:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import canFinish from '../canFinish'
describe('课程表 测试', () => {
  it('canFinish function', () => {
    expect(canFinish(2, [[1, 0]])).toEqual(true)
    expect(
      canFinish(2, [
        [1, 0],
        [0, 1],
      ])
    ).toEqual(false)
  })
})
