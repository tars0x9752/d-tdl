#!/usr/bin/env node

import Conf from 'conf'
import boxen from 'boxen'
import { Store } from '../types/store'

export const main = () => {
  const store = new Conf<Store>()

  console.log('store path:', store.path)

  const text = `
- a
- b
- c
- d
`

  console.log(
    boxen(text, {
      title: 'list1',
      titleAlignment: 'center',
      textAlignment: 'center',
      borderStyle: 'round',
    })
  )
}
