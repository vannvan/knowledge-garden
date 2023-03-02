/*
 * Description: 替换空格
 * Url: https://leetcode.cn/problems/ti-huan-kong-ge-lcof/
 * Created: 2023-03-02 19:19:13
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-02 19:38:17
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function replaceSpace(s: string): string {
  let arr = Array.from(s)
  let emptyCount = 0
  // 计算空格数
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ' ') {
      emptyCount++
    }
  }
  let left = arr.length - 1
  let right = arr.length + emptyCount * 2 - 1 // 空格本身就占了一位所以只需要扩充两位
  while (left >= 0) {
    if (arr[left] == ' ') {
      arr[right--] = '0'
      arr[right--] = '2'
      arr[right--] = '%'
      left--
    } else {
      arr[right--] = arr[left--]
    }
  }

  return arr.join('')
}
export default replaceSpace
