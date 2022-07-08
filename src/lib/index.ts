#!/usr/bin/env node

import Conf, { Schema } from 'conf'
import { Store, Task, TaskStatus } from '../types/store'

const schema: Schema<Store> = {
  taskList: {
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'text', 'status'],
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
        },
        text: {
          type: 'string',
        },
        status: {
          type: 'string',
          enum: ['todo', 'wip', 'done'],
        },
      },
    },
  },
}

const store = new Conf<Store>({ configName: 'store', schema })

const taskList = store.get('taskList') ?? []

export const add = (text: string) => {
  const newTask: Task = {
    id: `${taskList.length + 1}`,
    text,
    status: 'todo',
  }

  store.set('taskList', [...taskList, newTask])
}

export const updateStatus = (targetId: string, status: TaskStatus) => {
  const updated = taskList.map((task) => {
    const isTarget = task.id === targetId

    return {
      ...task,
      status: isTarget ? status : task.status,
    }
  })

  store.set('taskList', updated)
}

export const showList = () => {
  const text = taskList
    .map((task) => {
      return `
╭─ [id: ${task.id} - ${task.status}]
╰─ ${task.text}`
    })
    .join('\n')

  console.log(text)
}

export const showStorePath = () => {
  console.log('store path:', store.path)
}
