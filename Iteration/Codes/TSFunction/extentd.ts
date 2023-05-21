/*
 * Description:
 * Created: 2023-05-21 15:34:21
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-21 16:15:37
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

class Person {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }

  say(word: string) {
    console.log(word)
  }

  private work() {
    console.log('work hard')
  }
}

const p = new Person('zhangsan')
p.name = 'ss'

class Student extends Person {
  hobby: string
  constructor(name: string, hobby: string) {
    super(name)
    this.hobby = hobby
  }
  getHobby() {
    return this.hobby
  }
}

const xiaoming = new Student('xiaoming', 'play game')

xiaoming.say(`I like ${xiaoming.getHobby()}`)
xiaoming.work()
