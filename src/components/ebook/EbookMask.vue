<template>
  <div class="ebook-bookmark" ref="ebookBookmark">
      <div class="ebook-bookmark-text-wrapper">
          <div class="ebook-bookmark-down-wrapper" ref="iconDown">
              <span class="icon-down"></span>
          </div>
          <div class="ebook-bookmark-text">
              {{text}}
          </div>
      </div>
    <div class="ebook-bookmark-icon-wrapper">
        <ebook-mark class="aa" :color="color" :width="15" :height="35" ref="bookmark"></ebook-mark>
    </div>
  </div>
</template>

<script>
import EbookMark from '../../components/ebook/EbookMark'
import { ebookMixin } from '../../utils/mixin'
import { realPx } from '../../utils/utils'
export default {
  mixins: [
    ebookMixin
  ],
  components: {
    EbookMark
  },
  data() {
    return {
      color: 'WHITE',
      text: ''
    }
  },
  computed: {
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    }
  },
  watch: {
    offsetY(val) {
      // 吸附在顶部，不变色
      if (val >= this.height && val <= this.threshold) {
        this.$refs.bookmark.style.position = `fixed`
        this.$refs.bookmark.style.top = '0px'
        this.text = this.$t('book.pulldownAddMark')
        this.color = 'white'
      } else if (val > this.threshold) {
        this.$refs.bookmark.style.position = `fixed`
        this.$refs.bookmark.style.top = '0px'
        this.text = this.$t('book.releaseAddMark')
        this.color = 'blue'
      }
    }
  }

}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.ebook-bookmark{
    position: absolute;
    top:px2rem(-75);
    left: 0px;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    background: rgb(142, 142, 163);
    .ebook-bookmark-text-wrapper{
        position: absolute;
        right:px2rem(45);
        bottom:0px;
        display: flex;
        font-size: px2rem(14);
        color: white;
        .ebook-bookmark-down-wrapper{

        }
        .ebook-bookmark-text{

        }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(10);
      .aa{
      }
    }
}
</style>
