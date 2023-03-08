/*
 * Description: 打开转盘锁
 * Url: https://leetcode.cn/problems/open-the-lock/
 * Created: 2023-03-08 20:36:37
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-08 20:55:29
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import openLock from '../openLock'
describe('打开转盘锁 测试', () => {
  it('openLock function', () => {
    let s = openLock(['0201', '0101', '0102', '1212', '2002'], '0202')
    // console.log('s', s)
    expect(openLock(['0201', '0101', '0102', '1212', '2002'], '0202')).toEqual(6)
    expect(openLock(['8888'], '0009')).toEqual(1)
    expect(
      openLock(['8887', '8889', '8878', '8898', '8788', '8988', '7888', '9888'], '8888')
    ).toEqual(-1)
  })
})
