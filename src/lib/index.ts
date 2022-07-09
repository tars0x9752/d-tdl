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

const getTaskList = () => {
  const _taskList = store.get('taskList') ?? []

  const taskList = _taskList.map((v, i) => {
    return {
      ...v,
      id: `${i + 1}`,
    }
  })

  store.set('taskList', taskList)

  return taskList
}

const hasTargetId = (targetId: string, taskList: Task[]) => {
  const res = taskList.find((task) => task.id === targetId)

  if (res === undefined) {
    console.error('[ERROR]: Invalid id.')
    process.exit(1)
  }
}

export const add = (text: string) => {
  const taskList = getTaskList()

  const newTask: Task = {
    id: `${taskList.length + 1}`,
    text,
    status: 'todo',
  }

  store.set('taskList', [...taskList, newTask])
}

export const updateStatus = (targetId: string, status: TaskStatus) => {
  const taskList = getTaskList()

  hasTargetId(targetId, taskList)

  const updated = taskList.map((task) => {
    const isTarget = task.id === targetId

    return {
      ...task,
      status: isTarget ? status : task.status,
    }
  })

  store.set('taskList', updated)
}

export const remove = (targetId: string) => {
  const taskList = getTaskList()

  hasTargetId(targetId, taskList)

  const updated = taskList.filter((task) => task.id !== targetId)

  store.set('taskList', updated)
}

export const showList = () => {
  const taskList = getTaskList()

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
