import Storage from 'web-storage-cache'
const localStorage = new Storage()

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}
export function setBookObject(fileName, key, value) {
  let book = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}
export function getBookObject(fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

export function getLocale() {
  return getLocalStorage('locale')
}
export function setLocale(value) {
  return setLocalStorage('locale', value)
}

export function getTheme() {
  return getLocalStorage('theme')
}
export function setTheme(value) {
  return setLocalStorage('theme', value)
}

export function saveMetadata(filename, value) {
  return setBookObject(filename, 'metadata', value)
}

// 书架书本缓存
export function getShelfBook() {
  return getLocalStorage('shelf')
}

export function saveShelfBook(data) {
  return setLocalStorage('shelf', data)
}
