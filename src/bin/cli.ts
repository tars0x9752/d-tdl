#!/usr/bin/env node

import meow from 'meow'
import { main } from '../lib/index.js' // .js extension needed to use "import" keyword in nodejs

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

console.log(cli)

main()
