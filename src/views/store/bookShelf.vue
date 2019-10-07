<template>
  <div class="book-shelf">
      <shelf-title :shelfShadow='shelfTitleShadow'></shelf-title>
      <scroll :top="0" :bottom="0" @onScroll='scroll'>
          <shelf-search @searchClick="searchClick" :shelfShadow='shelfSearchShadow'></shelf-search>
          <shelflist  :posTop="100" :data="shelfList"></shelflist>
      </scroll>
      <book-shelf-footer></book-shelf-footer>
  </div>
</template>

<script>
import shelfTitle from '../../components/shelf/shelfTitle'
import shelfSearch from '../../components/shelf/shelfSearch'
import Scroll from '../../components/Scroll'
import shelflist from '../../components/shelf/shelfList'
import { storeShelfMixin } from '../../utils/mixin'
import bookShelfFooter from '../../components/shelf/bookShelfFooter'
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
    this.setShelfCategory([])
    this.setCurrentType(1)
  }
}
</script>

<style>

</style>
