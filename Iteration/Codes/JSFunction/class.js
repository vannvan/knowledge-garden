/*
 * Description:
 * Created: 2023-05-02 19:25:14
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-02 19:27:16
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
class User {
  static name = 'bob'
  static staticMethod() {
    console.log(this === User)
  }
}

console.log(User.name) // bob
User.staticMethod() // true

const u = new User()
console.log(u.name) // undefined
