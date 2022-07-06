#!/usr/bin/env node

import meow from 'meow'
import boxen from 'boxen'

const cli = meow(
  `
	Usage
	  $ npm run start 

	Options
    --add, -a   add a task
    --list, -l  show task list
    --wip, -w
    --done, -d
    --remove, -r

	Examples
	  $ npm run start -- --help
`,
  {
    importMeta: import.meta,
    flags: {
      list: {
        type: 'boolean',
        alias: 'l',
        default: true,
      },
      add: {
        type: 'string',
        alias: 'a',
      },
      wip: {
        type: 'string',
        alias: 'w',
      },
      done: {
        type: 'string',
        alias: 'd',
      },
      remove: {
        type: 'string',
        alias: 'r',
      },
    },
  }
)

console.log(cli)

const text = `
- a
- b
- c
- d
`

console.log(
  boxen(text, {
    title: 'list',
    titleAlignment: 'center',
    padding: 1,
    borderStyle: 'round',
  })
)
