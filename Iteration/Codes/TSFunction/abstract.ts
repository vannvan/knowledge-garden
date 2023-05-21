/*
 * Description:
 * Created: 2023-05-21 15:50:47
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-21 15:55:38
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
interface IPerson {
  name: string
  say(): void
}

class Person1 implements IPerson {
  name: string = 'Lance'
  say(): void {
    console.log(`我的名字叫${this.name}`)
  }
}

let p = new Person1()
p.say()
