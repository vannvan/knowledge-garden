/*
 * Description: 1388：可被三整除的最大和
 * Url: https://leetcode.cn/problems/greatest-sum-divisible-by-three/
 * Created: 2023-03-12 21:10:02
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-12 21:34:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import maxSumDivThree from '../maxSumDivThree'
describe('可被三整除的最大和 测试', () => {
  it('maxSumDivThree function', () => {
    // expect(maxSumDivThree([3, 6, 3, 1, 8])).toEqual(18)
    maxSumDivThree([3, 6, 5, 1, 8])
    // return
    expect(maxSumDivThree([3, 6, 5, 1, 8])).toEqual(18)
    expect(maxSumDivThree([4])).toEqual(0)
    expect(maxSumDivThree([1, 2, 3, 4, 4])).toEqual(12)
  })
})
