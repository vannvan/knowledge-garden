/*
 * Description:
 * Created: 2023-05-23 19:36:54
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-23 19:41:45
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */

interface IApp {
  name: string
  init(appName: string): void
  start(): void
}

class App implements IApp {
  name: string
  constructor() {
    this.name = ''
  }

  init(appName: string): void {
    //
  }
  start(): void {
    //
  }
}
