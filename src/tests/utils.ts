import {Circle} from './../types'
import {IDBService} from '../helpers/initCache'
const selectInput = (value: string, name?: string) => {
  return {
    target: {
      value,
      name,
    },
  } as any
}
const circleAttr: Circle = {
  id: 1,
  radius: 20,
  type: 'circle',
  colour: '#000000',
}
const db = IDBService()

export {db, circleAttr, selectInput}
