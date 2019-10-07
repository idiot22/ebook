import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

export function home() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/home`
  })
}

export function detail(book) {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}
export function list() {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
export function shelf() {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}

// 下载书本
export function download(book, onSuccess, onFail, onProgress) {
  if (onProgress == null) {
    onProgress = onFail
    onFail = null
  }
  axios.create({
    methods: 'get',
    baseURL: process.env.VUE_APP_EPUB_URL,
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: ProgressEvent => {
      if (onProgress) {
        onProgress(ProgressEvent)
      }
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      // eslint-disable-next-line no-undef
      setLocalForage(book.fileName, blob, () => {
        if (onSuccess) {
          onSuccess(book)
        }
        console.log(blob)
      }, err => {
        if (onFail) {
          onFail(err)
        }
      })
    }).catch(err => {
      if (onFail) {
        onFail(err)
      }
    })
}

export function flatList() {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
  })
}
