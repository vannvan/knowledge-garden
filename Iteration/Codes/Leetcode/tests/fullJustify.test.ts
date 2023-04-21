/*
 * Description: 68：文本左右对齐
 * Url: https://leetcode.cn/problems/text-justification/
 * Created: 2023-04-20 23:20:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-04-21 23:29:05
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
import fullJustify from '../fullJustify'
describe('文本左右对齐 测试', () => {
  it('fullJustify function', () => {
    expect(
      fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16)
    ).toEqual(['This    is    an', 'example  of text', 'justification.  '])
    expect(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16)).toEqual([
      'What   must   be',
      'acknowledgment  ',
      'shall be        ',
    ])
    expect(
      fullJustify(
        [
          'Science',
          'is',
          'what',
          'we',
          'understand',
          'well',
          'enough',
          'to',
          'explain',
          'to',
          'a',
          'computer.',
          'Art',
          'is',
          'everything',
          'else',
          'we',
          'do',
        ],
        20
      )
    ).toEqual([
      'Science  is  what we',
      'understand      well',
      'enough to explain to',
      'a  computer.  Art is',
      'everything  else  we',
      'do                  ',
    ])
  })
})
