export function pluralize (name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise (storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('gamology', 1)
    let db, transaction, store

    request.onupgradeneeded = function (event) {
      const db = request.result

      db.createObjectStore('games', { autoIncrement: true })
      db.createObjectStore('genre', { autoIncrement: true })
    }

    request.onerror = function (event) {
      console.log('error', event)
    }

    request.onsuccess = function (event) {
      db = request.result

      transaction = db.transaction(storeName, 'readwrite')

      store = transaction.objectStore(storeName)

      db.onerror = function (event) {
        console.log('error', event)
      }

      let all
      switch (method) {
        case 'get':
          all = store.getAll()
          all.onsuccess = function () {
            resolve(all.result)
          }
          break

        case 'put':
          store.put(object)
          resolve(object)
          break

        case 'delete':
          store.delete(object.id)
          break

        default:
          console.log('Not a Method')
          break
      }

      transaction.oncomplete = function () {
        db.close()
      }
    }
  })
}
