/*
 * Description: 复原 IP 地址
 * Url: https://leetcode.cn/problems/restore-ip-addresses/
 * Tags: 字符串  回溯
 * Created: 2023-03-07 21:10:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 21:35:12
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function restoreIpAddresses(s: string): string[] {
  // Think for yourself for 5 minutes...

  // 1. 不能多于4个整数
  // 2. 每一位在0-255范围内

  const res: string[] = []

  const isValid = (strArr: string[]) => {
    return (
      strArr.length == 4 &&
      strArr.join('') == s &&
      strArr.every(
        (item) => /^(0|[1-9][0-9]*)$/.test(item) && Number(item) >= 0 && Number(item) <= 255
      )
    )
  }

  const track: string[] = []

  const backTrack = (str: string, startIndex: number) => {
    if (isValid(track)) {
      res.push(track.join('.'))
    }

    for (let i = startIndex; i < str.length; i++) {
      track.push(str.slice(startIndex, i + 1))
      backTrack(str, i + 1)
      track.pop()
    }
  }

  backTrack(s, 0)
  console.log('res', res)

  return res
}
export default restoreIpAddresses
