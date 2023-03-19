/*
 * Description: 739：每日温度
 * Url: https://leetcode.cn/problems/daily-temperatures/
 * Created: 2023-03-19 14:46:10
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-19 15:20:46
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import dailyTemperatures from '../dailyTemperatures'
describe('每日温度 测试', () => {
  it('dailyTemperatures function', () => {
    dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0])
    expect(dailyTemperatures([30, 40, 50, 60])).toEqual([1, 1, 1, 0])
    expect(dailyTemperatures([30, 60, 90])).toEqual([1, 1, 0])
  })
})
