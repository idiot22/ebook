<template>
  <div class="ebook">
      <ebook-title></ebook-title>
      <ebook-reader></ebook-reader>
      <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import EbookMenu from '../../components/ebook/EbookMenu'
import { getBookObject, setBookObject} from '../../utils/localStorage';
import { ebookMixin } from '../../utils/mixin'
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  mixins: [
    ebookMixin
  ],
  methods:{
    startLoopReadTime() {
      let readtime = 0
      if(getBookObject(this.filename,"readtime")){
          readtime = getBookObject(this.filename,"readtime")
      }
      this.task = setInterval(() => {
          readtime++
          if (readtime % 30 === 0) {
            setBookObject(this.filename, "readtime",readtime)
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

<style>

</style>
