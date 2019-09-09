export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

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
