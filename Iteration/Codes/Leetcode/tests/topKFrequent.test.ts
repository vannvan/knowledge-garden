/*
 * Description: 前 K 个高频元素
 * Url: https://leetcode.cn/problems/top-k-frequent-elements/
 * Created: 2023-03-04 22:05:04
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-04 23:40:19
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import topKFrequent from '../topKFrequent'
describe('前 K 个高频元素 测试', () => {
  it('topKFrequent function', () => {
    topKFrequent([1, 1, 1, 2, 2, 3], 2)
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2])
    expect(topKFrequent([1], 1)).toEqual([1])

    expect(topKFrequent([4, 1, -1, 2, -1, 2, 3], 2)).toEqual([-1, 2])
  })
})
