/*
 * Description: 621：任务调度器
 * Url: https://leetcode.cn/problems/task-scheduler/
 * Created: 2023-04-13 21:29:19
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-13 21:29:43
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import leastInterval from '../leastInterval'
describe('任务调度器 测试', () => {
  it('leastInterval function', () => {
    expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 2)).toEqual(8)
    expect(leastInterval(['A', 'A', 'A', 'B', 'B', 'B'], 0)).toEqual(6)
    expect(leastInterval(['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'], 2)).toEqual(
      16
    )
  })
})
