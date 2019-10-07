import { getLocalStorage, setLocalStorage } from './localStorage'

export function flatBookList(bookList) {
  if (bookList) {
    let orgBookList = bookList.filter(item => {
      return item.type !== 3
    })
    const categoryList = bookList.filter(item => {
      return item.type === 2
    })
    categoryList.forEach(item => {
      const index = orgBookList.findIndex(v => {
        return v.id === item.id
      })
      if (item.itemList) {
        item.itemList.forEach(subItem => {
          orgBookList.splice(index, 0, subItem)
        })
      }
    })
    orgBookList.forEach((item, index) => {
      item.id = index + 1
    })
    orgBookList = orgBookList.filter(item => item.type !== 2)
    return orgBookList
  } else {
    return []
  }
}
export function findBook(fileName) {
  const bookList = getLocalStorage('shelf')
  return flatBookList(bookList).find(item => item.fileName === fileName)
}

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]
export const categoryList = {
  'ComputerScience': 1,
  'SocialSciences': 2,
  'Economics': 3,
  'Education': 4,
  'Engineering': 5,
  'Environment': 6,
  'Geography': 7,
  'History': 8,
  'Laws': 9,
  'LifeSciences': 10,
  'Literature': 11,
  'Biomedicine': 12,
  'BusinessandManagement': 13,
  'EarthSciences': 14,
  'MaterialsScience': 15,
  'Mathematics': 16,
  'MedicineAndPublicHealth': 17,
  'Philosophy': 18,
  'Physics': 19,
  'PoliticalScienceAndInternationalRelations': 20,
  'Psychology': 21,
  'Statistics': 22
}
export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': 'black',
          'background': 'white'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': 'black',
          'background': '#efe3d3'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': 'black',
          'background': '#c4e7c6'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000'
        }
      }
    }
  ]
}
export function addCss(href) {
  let ele = document.createElement('link')
  ele.setAttribute('href', href)
  ele.setAttribute('rel', 'stylesheet')
  ele.setAttribute('type', 'text/css')
  document.getElementsByTagName('head')[0].appendChild(ele)
}

export function removeCss(href) {
  const link = document.getElementsByTagName('link')
  for (var i = link.length; i >= 0; i--) {
    if (link[i] && link[i].getAttribute('href') != null && link[i].getAttribute('href').indexOf(href) !== -1) {
      link[i].parentNode.removeChild(link[i])
    }
  }
}

export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
}

export function changeCss(theme) {
  removeAllCss()
  switch (theme) {
    case 'Default':
      addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
      break
    case 'Gold':
      addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
      break
    case 'Eye':
      addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
      break
    case 'Night':
      addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
      break
  }
}
// 合并数组
export function expandArray(array) {
  return array.map(function(item) {
    return [].concat(item, ...expandArray(item.subitems))
  })
}

export function categoryText(category, vue) {
  switch (category) {
    case 1:
      return vue.$t('category.computerScience')
    case 2:
      return vue.$t('category.socialSciences')
    case 3:
      return vue.$t('category.economics')
    case 4:
      return vue.$t('category.education')
    case 5:
      return vue.$t('category.engineering')
    case 6:
      return vue.$t('category.environment')
    case 7:
      return vue.$t('category.geography')
    case 8:
      return vue.$t('category.history')
    case 9:
      return vue.$t('category.laws')
    case 10:
      return vue.$t('category.lifeSciences')
    case 11:
      return vue.$t('category.literature')
    case 12:
      return vue.$t('category.biomedicine')
    case 13:
      return vue.$t('category.businessandManagement')
    case 14:
      return vue.$t('category.earthSciences')
    case 15:
      return vue.$t('category.materialsScience')
    case 16:
      return vue.$t('category.mathematics')
    case 17:
      return vue.$t('category.medicineAndPublicHealth')
    case 18:
      return vue.$t('category.philosophy')
    case 19:
      return vue.$t('category.physics')
    case 20:
      return vue.$t('category.politicalScienceAndInternationalRelations')
    case 21:
      return vue.$t('category.psychology')
    case 22:
      return vue.$t('category.statistics')
  }
}

export function getCategoryName(id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

export function showBookDetail(vue, book) {
  vue.$router.push({
    path: '/store/detail',
    query: {
      fileName: book.fileName,
      category: book.category
    }
  })
}
// 添加书架加号的数据
export function addShelfData(data) {
  data.push({
    id: -1,
    type: -1
  })
  return data
}

export function toBookHome(vue) {
  console.log(333)
  vue.$router.push({
    path: '/store/storeHome'
  })
}
const BOOK_SHELF_KEY = 'shelf'
export function removeAddFromShelf(list) {
  return list.filter(item => item.type !== 3)
}

export function appendAddToShelf(list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function removeFromBookShelf(bookItem) {
  console.log(bookItem)
  let bookList = getLocalStorage('shelf')
  console.log(bookList)
  // bookList = bookList.filter(item => {
  //   if (item.itemList) {
  //     item.itemList = item.itemList.filter(subItem => subItem.fileName !== bookItem.fileName)
  //   }
  //   return item.fileName !== bookItem.fileName
  // })
  // setLocalStorage(BOOK_SHELF_KEY, bookList)
}

export function addToShelf(book) {
  let bookList = getLocalStorage(BOOK_SHELF_KEY)
  bookList = clearAddFromBookList(bookList)
  book.type = 1
  bookList.push(book)
  bookList.forEach((item, index) => {
    item.id = index + 1
  })
  appendAddToBookList(bookList)
  setLocalStorage(BOOK_SHELF_KEY, bookList)
}

export function appendAddToBookList(bookList) {
  bookList.push({
    cover: '',
    title: '',
    type: 3,
    id: Number.MAX_SAFE_INTEGER
  })
}

export function clearAddFromBookList(bookList) {
  return bookList.filter(item => {
    return item.type !== 3
  })
}
