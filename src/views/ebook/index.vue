<template>
  <div class="ebook" ref="book">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
      <ebook-mask></ebook-mask>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookMask from '../../components/ebook/EbookMask'
import { getBookObject, setBookObject } from '../../utils/localStorage'
import { ebookMixin } from '../../utils/mixin'
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu,
    EbookMask
  },
  mixins: [
    ebookMixin
  ],
  watch: {
    offsetY(newval) {
      if (!this.menuvisible && this.bookAvailable) {
        if (newval > 0) {
          this.$refs.book.style.top = `${newval}px`
          this.$refs.book.style.transition = 'all 0.2s ease'
          setTimeout(() => { this.$refs.book.style.transition = 'all 0.2s ease' }, 200)
        } else if (newval === 0) {
          this.$refs.book.style.top = `0px`
        }
      }
    }
  },
  methods: {
    startLoopReadTime() {
      let readtime = 0
      if (getBookObject(this.filename, 'readtime')) {
        readtime = getBookObject(this.filename, 'readtime')
      }
      this.task = setInterval(() => {
        readtime++
        if (readtime % 30 === 0) {
          setBookObject(this.filename, 'readtime', readtime)
        }
      }, 1000)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss">
.ebook{
  position: absolute;
  top:0px;
  left: 0px
}
</style>
