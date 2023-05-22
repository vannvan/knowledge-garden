/*
 * Description:
 * Created: 2023-05-21 17:15:16
 * Author: van
 * Email : adoerww@gamil.com
 * -----
 * Last Modified: 2023-05-21 17:29:02
 * Modified By: van
 * -----
 * Copyright (c) 2023 https://github.com/vannvan
 */
interface Todo {
  title: string
  description: string
}

const todo: Pick<Todo, 'title'> = { title: '' }
