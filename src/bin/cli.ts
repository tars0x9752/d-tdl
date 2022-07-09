#!/usr/bin/env node

import meow from 'meow'

import enq from 'enquirer'

const { prompt } = enq

// file extension needed to use "import" keyword in nodejs
import { add, remove, showList, showStorePath, updateStatus } from '../lib/index.js'

const cli = meow(
  `
	Usage
	  $ npm run start 

	Options
    --help
    --version

	Examples
	  $ npm run start -- --help
`,
  {
    importMeta: import.meta,
  }
)

const main = async () => {
  const actionList = ['list', 'add', 'done', 'wip', 'remove', 'show-store-path', 'quit'] as const

  // default
  const { action } = await prompt<{ action: typeof actionList[number] }>({
    type: 'select',
    name: 'action',
    message: 'Action',
    choices: ['list', 'add', 'done', 'wip', 'remove', 'show-store-path', 'quit'],
  })

  const handle = {
    list: () => {
      showList()
    },
    add: async () => {
      const res = await prompt<{ task: string }>({
        type: 'input',
        name: 'task',
        message: 'task',
      })

      add(res.task)
      showList()
    },
    done: async () => {
      const res = await prompt<{ id: string }>({
        type: 'input',
        name: 'id',
        message: 'done id',
      })

      updateStatus(res.id, 'done')
      showList()
    },
    wip: async () => {
      const res = await prompt<{ id: string }>({
        type: 'input',
        name: 'id',
        message: 'wip id',
      })

      updateStatus(res.id, 'wip')
      showList()
    },
    remove: async () => {
      const res = await prompt<{ id: string }>({
        type: 'input',
        name: 'id',
        message: 'remove id',
      })

      remove(res.id)
      showList()
    },
    'show-store-path': () => {
      showStorePath()
    },
    quit: () => {},
  }[action]

  handle()
}

main()
