#!/usr/bin/env node

import meow from 'meow'

// file extension needed to use "import" keyword in nodejs
import { add, remove, showList, showStorePath, updateStatus } from '../lib/index.js'

const cli = meow(
  `
	Usage
	  $ npm run start 

	Options
    --list, -l    show task list
    --add, -a     add a task
    --wip, -w
    --done, -d
    --remove, -r
    --store-path  show store file path

    --plain-text, -p

	Examples
	  $ npm run start -- --help
`,
  {
    importMeta: import.meta,
    flags: {
      list: {
        type: 'boolean',
        alias: 'l',
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
      storePath: {
        type: 'boolean',
      },
      lsTodo: {
        type: 'boolean',
      },
      lsWip: {
        type: 'boolean',
      },
      lsDone: {
        type: 'boolean',
      },
    },
  }
)

const handleCliFlags = () => {
  const flagCount = Object.entries(cli.flags).filter(([, v]) => !!v).length

  if (flagCount > 1) {
    console.error('[ERROR]: Multiple flags are not allowed.')
    process.exit(1)
  }

  if (cli.flags.list) {
    showList()
    return
  }

  if (cli.flags.add) {
    add(cli.flags.add)
    return
  }

  if (cli.flags.wip) {
    updateStatus(cli.flags.wip, 'wip')
    return
  }

  if (cli.flags.done) {
    updateStatus(cli.flags.done, 'done')
    return
  }

  if (cli.flags.remove) {
    remove(cli.flags.remove)
    return
  }

  if (cli.flags.storePath) {
    showStorePath()
    return
  }
}

handleCliFlags()
