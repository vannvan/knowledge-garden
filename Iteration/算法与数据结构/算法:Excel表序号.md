# 算法:Excel表序号 
## Excel表序号
> 给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 _该列名称对应的列序号_ 。
> A -> 1 
> B -> 2
> C -> 3 
> ... 
> Z -> 26 
> AA -> 27 
> AB -> 28 
> 来源：[https://leetcode.cn/problems/excel-sheet-column-number/](https://leetcode.cn/problems/excel-sheet-column-number/)

分析过程

“FXSHRXW” 中的每个字母对应的序号分别是：[6,24,19,8,18,24,23]，其中(A-Z分别对应1-26)，则列名称对应的列序号为
23×260+24×261+18×262+8×263+19×264+24×265+6×266=2147483647
### 代码实现
```javascript
function titleToNumber(columnTitle: string): number {
  let number = 0
  let mul = 1
  for (let i = columnTitle.length - 1; i >= 0; i--) {
    // k是该字母在1-26中的位置
    let k: number = columnTitle[i].charCodeAt(0) - 'A'.charCodeAt(0) + 1
    number += k * mul
    mul *= 26
  }

  return number
}
```
## Excel表名称
> 给你一个整数 columnNumber ，返回它在 Excel 表中相对应的列名称。
> A -> 1 
> B -> 2 
> C -> 3 
> ... 
> Z -> 26 
> AA -> 27 
> AB -> 28  
> 来源：[https://leetcode.cn/problems/excel-sheet-column-title/](https://leetcode.cn/problems/excel-sheet-column-title/)

分析过程，根据上题序号名称转数字可得，2147483647的反推过程为
> 2147483647 % 26 = 23  -> W  下一位基准 下一位基准 floor((2147483647-23) / 26) ->   82595524
> 82595524 % 26 = 24 -> X   下一位基准 floor((82595524 - 24) / 26) -> 3176750
> 3176750 % 26 = 18 -> R    下一位基准 fllor((3176750 - 18) / 26) ->  122182
> 122182 % 26 = 8 -> H  下一位基准floor((122182 - 8) / 26) -> 4699
> ...
> 以此类推可得 ['W', 'X', 'R', 'H', 'S', 'X', 'F'] 反转即可

### 代码实现
```javascript
function convertToTitle1(columnNumber: number): string {
  let ans: string[] = []
  while (columnNumber > 0) {
    // 需要确保0<=a0<=25
    const a0 = ((columnNumber - 1) % 26) + 1
    ans.push(String.fromCharCode(a0 - 1 + 'A'.charCodeAt(0)))
    columnNumber = Math.floor((columnNumber - a0) / 26)
    console.log('columnNumber', columnNumber)
  }
  ans.reverse()
  return ans.join('')
}


// 26进制的思路
function convertToTitle(columnNumber: number): string {
  let ans: string[] = []
  while (columnNumber >= 1) {
    columnNumber--
    ans.push(String.fromCharCode((columnNumber % 26) + 'A'.charCodeAt(0)))
    columnNumber /= 26
  }

  ans.reverse()
  return ans.join('')
}
```

//TODO 还没完全消化

