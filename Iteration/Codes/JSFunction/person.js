/*
 * Description:
 * Created: 2023-05-02 12:41:42
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-02 15:32:33
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

function Person(name) {
  var o = new Object()
  o.say = function () {
    console.log(name)
  }
  return o
}
var person1 = new Person('hanmeimei')
person1.name // undefined
person1.say() //hanmeimei
