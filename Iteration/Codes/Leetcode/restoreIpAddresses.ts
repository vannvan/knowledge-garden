/*
 * Description: 复原 IP 地址
 * Url: https://leetcode.cn/problems/restore-ip-addresses/
 * Tags: 字符串  回溯
 * Created: 2023-03-07 21:10:36
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-03-07 22:02:50
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

let count = 0

function restoreIpAddresses1(s: string): string[] {
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
    // console.log('track', track)
    if (track.length > 4) return
    if (isValid(track)) {
      res.push(track.join('.'))
      return
    }
    count += 1

    for (let i = startIndex; i < str.length; i++) {
      const nextStr = str.slice(startIndex, i + 1)
      // 剪枝
      // 如果当前数字长度大于3 且大于255 不满足条件
      if (nextStr.length > 3 && +nextStr > 255) continue

      // 如果当前长度大于1 且第一位是0 不满足条件
      if (nextStr.length > 1 && nextStr[0] === '0') continue

      track.push(nextStr)
      backTrack(str, i + 1)
      track.pop()
    }
  }

  backTrack(s, 0)
  console.log('res', res, `${count}次`)
  return res
}

//
function restoreIpAddresses(s: string): string[] {
  const res: string[] = []

  const track: string[] = []

  const backTrack = (str: string, startIndex: number) => {
    if (track.length > 4) return
    console.log('track', track)
    if (track.length === 4 && startIndex == str.length) {
      res.push(track.join('.'))
      return
    }
    count += 1

    for (let i = startIndex; i < str.length; i++) {
      const nextStr = str.slice(startIndex, i + 1)
      if (nextStr.length > 3 && +nextStr > 255) continue
      if (nextStr.length > 1 && nextStr[0] === '0') continue
      track.push(nextStr)
      backTrack(str, i + 1)
      track.pop()
    }
  }

  backTrack(s, 0)
  return res
}

export default restoreIpAddresses
