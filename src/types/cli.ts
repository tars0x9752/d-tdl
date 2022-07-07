export type CliFlags = {
  list: {
    type: 'boolean'
    alias: string
    default: true
  }
  add: {
    type: 'string'
    alias: string
  }
  wip: {
    type: 'string'
    alias: string
  }
  done: {
    type: 'string'
    alias: string
  }
  remove: {
    type: 'string'
    alias: string
  }
  storePath: {
    type: 'boolean'
  }
  plainText: {
    type: 'boolean'
  }
}
