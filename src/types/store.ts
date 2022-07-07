export type TaskStatus = 'todo' | 'wip' | 'done'

export type Task = {
  id: string
  text: string
  status: TaskStatus
}

export type Store = {
  taskList: Task[]
}
