<template>
  <div class="book-item" :class="{shadow: data.type == 1 || data.type == 2}" @click="clickItem(data)">
      <div class="mask" v-show='isEditMode && data.type == 2'></div>
      <component :is="itemType" :data="data" ></component>
      <div class="icon-selected selected" v-show="isEditMode && data.type == 1" :class="{select:isSelect && shelfSelected.length>0}"></div>
  </div>
</template>

<script>
import shelflistitem1book from '../../components/shelf/shelflistitem1book'
import shelfListItem2book from '../../components/shelf/shelfListItem2book'
import shelfListItemAddBook from '../../components/shelf/shelfListItemAddBook'
import { toBookHome, showBookDetail } from '../../utils/book'
import { ebookStore } from '../../utils/mixin'
export default {
  mixins: [
    ebookStore
  ],
  props: [
    'data'
  ],
  data() {
    return {
      book: shelflistitem1book,
      book2: shelfListItem2book,
      addBook: shelfListItemAddBook,
      isSelect: false
    }
  },
  computed: {
    itemType() {
      return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.book2 : this.addBook)
    }
  },
  methods: {
    clickItem(data) {
      if (this.isEditMode) {
        this.isSelect = !this.isSelect
        if (this.isSelect) {
          this.shelfSelected.pushNoRepeat(this.data)
        } else {
          this.setShelfSelected(this.shelfSelected.filter((item) => item.id !== this.data.id))
        }
      } else {
        if (data.type === 1) {
          showBookDetail(this, data)
        } else if (data.type === 2) {
          this.$router.push({
            path: '/store/category',
            query: {
              title: data.title
            }
          })
        } else {
          toBookHome(this)
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.book-item{
    position: relative;
    width: 100%;
    &.shadow{
       box-shadow: 0px 4px  10px rgba(0, 0, 0, 0.2);
   }
   .selected{
       position: absolute;
       right: px2rem(5);
       bottom: px2rem(5);
       font-size: px2rem(23);
       color:rgba(182, 182, 182, 0.4)
   }
    .mask{
        position: absolute;
        top:0px;
        left:0px;
        width:100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.5);
        z-index: 100;
    }
    .select{
        color:rgb(72, 137, 221)
    }
}
</style>
