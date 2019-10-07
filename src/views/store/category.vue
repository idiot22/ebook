<template>
  <div class="book-shelf">
      <shelf-title :shelfShadow='shelfTitleShadow'></shelf-title>
      <scroll :top="0" :bottom="0" @onScroll='scroll'>
          <shelflist :posTop="40" :data="shelfCategory.itemList"></shelflist>
      </scroll>
      <book-shelf-footer></book-shelf-footer>
  </div>
</template>

<script>
import shelfTitle from '../../components/shelf/shelfTitle'
import shelfSearch from '../../components/shelf/shelfSearch'
import Scroll from '../../components/Scroll'
import shelflist from '../../components/shelf/shelfList'
// import { shelf } from '../../api/book'
import bookShelfFooter from '../../components/shelf/bookShelfFooter'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [
    storeShelfMixin
  ],
  data() {
    return {
      isSearchInputClick: false,
      shelfTitleShadow: false,
      shelfSearchShadow: false
    }
  },
  components: {
    shelfTitle,
    shelfSearch,
    Scroll,
    shelflist,
    bookShelfFooter
  },
  methods: {
    scroll(offsetY) {
      if (offsetY > 0 && this.isSearchInputClick) {
        this.shelfTitleShadow = true
      } else if (offsetY <= 0 && this.isSearchInputClick) {
        this.shelfTitleShadow = false
      }
      if (offsetY > 0 && !this.isSearchInputClick) {
        this.shelfSearchShadow = true
      } else if (offsetY <= 0 && !this.isSearchInputClick) {
        this.shelfSearchShadow = false
      }
    },
    searchClick(e) {
      this.isSearchInputClick = e
    }
  },
  mounted() {
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
  }
}
</script>

<style>

</style>
