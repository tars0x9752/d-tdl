#!/usr/bin/env node

import boxen from 'boxen'

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
