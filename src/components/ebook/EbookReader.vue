<template>
  <div class="ebook-reader">
     <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
import { getBookObject, getTheme } from '../../utils/localStorage'
import { changeCss } from '../../utils/book'
global.ePub = Epub
export default {
  mixins: [
    ebookMixin
  ],
  methods: {
    prePage() {
      if (this.rendition) {
        this.rendition.prev().then(()=>{
          this.refreshProgress()
        })
        this.hideMenuTitle()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(()=>{
          this.refreshProgress()
        })
        this.hideMenuTitle()
      }
    },
    showMenuTitle() {
      if (this.menuvisible) {
        this.setVisible(-1)
      }
      this.setMenuVisible(!this.menuvisible)
    },
    hideMenuTitle() { // 实现翻页的时候隐藏
      this.$store.dispatch('setMenuVisible', false)
      this.setVisible(-1)
      this.setFontFamilyVisible(false)
    },
    initFont() {
      let fontSize = getBookObject(this.filename, 'fontSize') || this.defaultFontSize
      let fontFamily = getBookObject(this.filename, 'fontFamily') || this.defaultFontFamily
      this.currentBook.rendition.themes.fontSize(fontSize + 'px')
      this.currentBook.rendition.themes.font(fontFamily)
      this.setDefaultFontSize(fontSize)
      this.setDefaultFontFamily(fontFamily)
    },
    initTheme() {
      this.themeList.forEach((item) => {
        this.rendition.themes.register(item.name, item.style)
      })
      if (getTheme('theme')) {
        let theme = getTheme('theme')
        this.rendition.themes.select(theme)
        this.setDefaultTheme(theme)
      } else {
        this.rendition.themes.select(this.defaultTheme)
      }
      changeCss(this.defaultTheme)
    },
    initGesture() {
      this.rendition.on('touchstart', (event) => { // 开始触碰使得x坐标及时间
        this.touchX = event.changedTouches[0].clientX
        this.touchtime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => { // 开始触碰使得x坐标及时间
        this.x = event.changedTouches[0].clientX - this.touchX
        this.time = event.timeStamp - this.touchtime
        if (this.x > 40 && this.time < 500) {
          this.prePage()
        } else if (this.x < -40 && this.time < 500) {
          this.nextPage()
        } else {
          this.showMenuTitle()
          this.setFontFamilyVisible(false)
        }
        // event.preventDefault()
        event.stopPropagation()
      })
    },
    initRendition() {
      const baseURL = 'http://localhost:80'
      let url = baseURL + '/ebook/' + this.filename + '.epub'
      this.book = new Epub(url) // 通过url来new一本书
      this.rendition = this.book.renderTo('read', { // 渲染到dom中
        width: innerWidth,
        height: innerHeight,
        method: 'defaut'
      })
    },
    initCss() {
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          // console.log(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
        })
      })
    },
    initEpub() {
      this.initRendition()
      // this.book.rendition.themes.fontSize(this.defaultFontSize + 'px')
// 显示书本
      this.setCurrentBook(this.book)
      let location = getBookObject(this.filename,"startCfi")
      this.display(location,()=>{
        this.initFont()
        this.initTheme()
      })
      
      this.initGesture()
      this.initCss()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getBookObject(this.filename, 'fontSize') / 16))
      }).then((locations) => {
        this.setBookAvailable(true)
        this.refreshProgress()
      })
    }
  },
  mounted() {
    let filename = this.$route.params.filename.split('|').join('/') // 获取filename
    this.setFilename(filename).then(() => { // 改变filename之后初始化epub
      this.initEpub()
    })
  }
}
</script>

<style>

</style>
