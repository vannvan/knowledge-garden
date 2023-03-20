/*
 * Description: 682：棒球比赛
 * Url: https://leetcode.cn/problems/baseball-game/
 * Created: 2023-03-20 23:18:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-20 23:41:00
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import calPoints from '../calPoints'
describe('棒球比赛 测试', () => {
  it('calPoints function', () => {
    expect(calPoints(['5', '2', 'C', 'D', '+'])).toEqual(30)
    expect(calPoints(['5', '-2', '4', 'C', 'D', '9', '+', '+'])).toEqual(27)
    expect(calPoints(['1'])).toEqual(1)
  })
})
