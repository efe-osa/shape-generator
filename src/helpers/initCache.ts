import {DBSchema, openDB} from 'idb'
import {Circle, Polygon} from '../types'

const cacheName = 'shapeGeneratorDB'
const version = 1
const tableName = 'shapes'

interface TData extends DBSchema {
  shapes: {
    key: number
    value: Polygon | Circle
  }
}

async function initialiseCache() {
  try {
    const db = await openDB<TData>(cacheName, version, {
      upgrade(db) {
        db.createObjectStore(tableName, {
          keyPath: 'id',
          autoIncrement: true,
        })
      },
    })
    return db
  } catch (error) {
    console.log(`Unable to open ${tableName} object store`)
    return error
  }
}

export function IDBService() {
  let idbCache = initialiseCache()

  const getAll = async () => {
    try {
      const values = (await idbCache).getAll(tableName)
      return await values
    } catch (err) {
      return err
    }
  }

  const get = async (key: number) => {
    try {
      const value = (await idbCache).get(tableName, key)
      return value
    } catch (reason) {
      return reason
    }
  }

  const add = async (value: Polygon | Circle | any, key: number) => {
    try {
      const store = (await idbCache)
        .transaction(tableName, 'readwrite')
        .objectStore(tableName)
      store.add(value, key)
    } catch (err) {
      return err.message
    }
  }

  const update = async (key: number, value: Polygon | Circle) => {
    const store = (await idbCache)
      .transaction(tableName, 'readwrite')
      .objectStore(tableName)
    try {
      store.put(value, key)
    } catch (err) {
      return err.message
    }
  }

  const remove = async (key: number) => {
    return (await idbCache)
      .transaction(tableName, 'readwrite')
      .objectStore(tableName)
      .delete(key)
  }
  return {getAll, get, add, remove, update}
}
