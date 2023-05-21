/*
 * Description:
 * Created: 2023-05-20 18:19:32
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-20 18:40:07
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
// class GenericNumber<T> {
//   zeroValue: T
//   add: (x: T, y: T) => T
// }

// let myGenericNumber = new GenericNumber<number>()
// // myGenericNumber.zeroValue = 0
// // myGenericNumber.add = function (x, y) {
// //   return x + y
// // }

// myGenericNumber.add()

interface objType<T1, T2> {
  money: (value: T1) => T1
  arr: () => T2[]
}
const obj2: objType<number, string> = {
  money: (val) => val,
  arr: () => ['1'],
}

console.log(obj2.money(2))
console.log(obj2.arr())

interface IResponse<T1, T2> {
  status: T1
  data: T2
}

const getUserInfo = <T>() => {
  // return ''
  return '' as T
}

const res = getUserInfo<IResponse<number, boolean>>()
