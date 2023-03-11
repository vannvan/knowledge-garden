/*
 * Description: 890：柠檬水找零
 * Url: https://leetcode.cn/problems/lemonade-change/
 * Created: 2023-03-11 16:18:25
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-11 16:30:15
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import lemonadeChange from '../lemonadeChange'
describe('柠檬水找零 测试', () => {
  it('lemonadeChange function', () => {
    expect(lemonadeChange([5, 5, 5, 10, 20])).toEqual(true)
    expect(lemonadeChange([5, 5, 10, 10, 20])).toEqual(false)
  })
})
