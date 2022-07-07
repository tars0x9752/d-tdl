#!/usr/bin/env node

import meow from 'meow'

// file extension needed to use "import" keyword in nodejs
import { add, showList, showStorePath, updateStatus } from '../lib/index.js'

const cli = meow(
  `
	Usage
	  $ npm run start 

	Options
    --add, -a     add a task
    --list, -l    show task list
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
        default: true,
        isMultiple: false,
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

      /**
       * disable boxen or not
       */
      plainText: {
        type: 'boolean',
        alias: 'p',
        default: false,
      },
    },
  }
)

const handleCliFlags = () => {
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

  if (cli.flags.list) {
    showList()
    return
  }

  if (cli.flags.storePath) {
    showStorePath()
    return
  }
}

handleCliFlags()
