/*
 * Description: 882：山脉数组的峰顶索引
 * Url: https://leetcode.cn/problems/peak-index-in-a-mountain-array/
 * Created: 2023-05-12 23:27:15
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-12 23:28:18
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import { peakIndexInMountainArray, peakIndexInMountainArray1 } from '../peakIndexInMountainArray'
describe('山脉数组的峰顶索引 测试', () => {
  it('peakIndexInMountainArray function', () => {
    expect(peakIndexInMountainArray([0, 1, 0])).toEqual(1)
    expect(peakIndexInMountainArray([0, 2, 1, 0])).toEqual(1)
    expect(peakIndexInMountainArray([0, 10, 5, 2])).toEqual(1)
  })

  it('peakIndexInMountainArray1 function', () => {
    expect(peakIndexInMountainArray1([0, 1, 0])).toEqual(1)
    expect(peakIndexInMountainArray1([0, 2, 1, 0])).toEqual(1)
    expect(peakIndexInMountainArray1([0, 10, 5, 2])).toEqual(1)
  })
})
