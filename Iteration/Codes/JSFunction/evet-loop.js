/*
 * Description:
 * Created: 2023-04-30 18:00:50
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-01 17:43:24
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

console.log(1)
setTimeout(() => {
  console.log(2)
})
var p = new Promise((resolve, reject) => {
  console.log(3)
  resolve('成功')
})
p.then(() => {
  console.log(4)
})
console.log(5)
