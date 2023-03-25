/*
 * Description: 204：计数质数
 * Url: https://leetcode.cn/problems/count-primes/
 * Created: 2023-03-25 16:49:06
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-25 16:49:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import countPrimes from '../countPrimes'
describe('计数质数 测试', () => {
  it('countPrimes function', () => {
    expect(countPrimes(10)).toEqual(4)
    expect(countPrimes(0)).toEqual(0)
    expect(countPrimes(1)).toEqual(0)
  })
})
