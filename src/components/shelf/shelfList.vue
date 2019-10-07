<template>
  <div class="shelf-list" :style="{top:posTop+'px'}">
    <transition-group name="list"
                      tag="div"
                      id="shelf-list">
      <div class="shelf-list-item-wrapper" v-for='(item, index) in data' :key="item.id">
        <shelfbook-item :data="item" :style="{height: itemHeight}"></shelfbook-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import shelfbookItem from '../../components/shelf/shelfbookItem.vue'
import { shelf } from '../../api/book'
import { realPx } from '../../utils/utils'
import { addShelfData } from '../../utils/book'
import { ebookStore } from '../../utils/mixin'
import { getShelfBook, saveShelfBook } from '../../utils/localStorage'
export default {
  mixins: [
    ebookStore
  ],
  props: {
    posTop: Number,
    data: Array
  },
  components: {
    shelfbookItem
  },
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    if (getShelfBook() && getShelfBook().length >= 1) {
      this.setShelfList(getShelfBook())
    } else {
      shelf().then((res) => {
        if (res && res.status === 200 && res.data.bookList.length > 0) {
          saveShelfBook(res.data.bookList)
          this.setShelfList(addShelfData(res.data.bookList))
        }
      })
    }
  },
  computed: {
    itemHeight() {
      return ((window.innerWidth - realPx(120)) / 3 / 250) * 350 + 'px'
    }
  }
}
</script>

<style lang='scss'>
@import '../../assets/styles/global';
  .shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    #shelf-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .shelf-list-item-wrapper {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: px2rem(15);
        box-sizing: border-box;
        &.list-leave-active {
          display: none;
        }
        &.list-move {
          transition: transform .5s;
        }
        .shelf-list-title-wrapper {
          margin-top: px2rem(10);
        }
      }
    }
  }

</style>
