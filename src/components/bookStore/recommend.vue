<template>
  <div class="recommend">
    <title-view :label="$t('home.recommend')" :btn="$t()" @onClick="showBookCategory()"></title-view>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in data" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <div class="num sub-title" ref="num">{{$t('home.readers').replace('$1', item.readers)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from '../bookStore/title'
import { ebookStore } from '../../utils/mixin'
import { showBookDetail, getCategoryName } from '../../utils/book'
export default {
  mixins: [ebookStore],
  components: {
    TitleView
  },
  props: {
    data: Array
  },
  methods: {
    showBookDetail(item) {
      showBookDetail(this, item)
    },
    showBookCategory() {
      this.$router.push({
        path: '/store/list',
        query: {
          category: getCategoryName(this.data.category),
          categoryText: this.categoryText(this.data.category)
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .recommend {
    .recommend-list {
      display: flex;
      width: 100%;
      @include top;
      padding: 0 px2rem(5);
      box-sizing: border-box;

      .recommend-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(5);
        box-sizing: border-box;
        .img-wrapper {
          @include center;
          .img {
            width: 80%;
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);
          @include columnCenter;
          .title {
            @include ellipsisN(2);
            text-align: center;
            font-size:px2rem(16);
            color: black;
          }
          .num {
            text-align: center;
            margin-top: px2rem(5);
            font-size:px2rem(12);
            color: rgb(158, 158, 158);
          }
        }
      }
    }
  }
</style>
