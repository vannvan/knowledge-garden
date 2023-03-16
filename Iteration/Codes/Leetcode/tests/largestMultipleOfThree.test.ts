/*
 * Description: 1277：形成三的最大倍数
 * Url: https://leetcode.cn/problems/largest-multiple-of-three/
 * Created: 2023-03-16 20:12:18
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-16 21:21:01
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import largestMultipleOfThree from '../largestMultipleOfThree'
describe('形成三的最大倍数 测试', () => {
  it('largestMultipleOfThree function', () => {
    largestMultipleOfThree([8, 6, 7, 1, 0])
    expect(largestMultipleOfThree([1, 1, 1, 2])).toEqual('111')
    expect(largestMultipleOfThree([0, 0, 0, 0, 1])).toEqual('0')

    expect(largestMultipleOfThree([8, 1, 9])).toEqual('981')
    expect(largestMultipleOfThree([8, 6, 7, 1, 0])).toEqual('8760')
    expect(largestMultipleOfThree([1])).toEqual('')
    expect(largestMultipleOfThree([1, 2])).toEqual('21')
    expect(largestMultipleOfThree([1, 2, 3])).toEqual('321')
    expect(largestMultipleOfThree([3, 4, 2, 1])).toEqual('432')
    expect(largestMultipleOfThree([0, 0, 0, 0])).toEqual('0')
  })
})
