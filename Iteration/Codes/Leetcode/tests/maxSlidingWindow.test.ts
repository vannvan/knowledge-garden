/*
 * Description: 滑动窗口最大值
 * Url: https://leetcode.cn/problems/sliding-window-maximum/
 * Created: 2023-03-04 20:47:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 21:23:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxSlidingWindow from '../maxSlidingWindow'
describe('滑动窗口最大值 测试', () => {
  it('maxSlidingWindow function', () => {
    console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))
    // return
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7])
    expect(maxSlidingWindow([1], 1)).toEqual([1])
  })
})
