<template>
    <transition name="slide-down">
      <div class="title-wrapper" v-show="this.menuvisible">
        <div class="left">
          <span class="icon-back "></span>
        </div>
        <div class="right">
          <div class="icon-wrapper">
            <span class="icon-shelf "></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-cart "></span>
          </div>
          <div class="icon-wrapper">
            <span class="icon-more "></span>
          </div>
        </div>
      </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [
    ebookMixin
  ],
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: true
    }
  }

}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    align-items: center;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(5) px2rem(8) rgba(0, 0, 0, .10);
    font-size: px2rem(20);
    .left {
      flex: 0 0 px2rem(60);
      @include center;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-shelf {
          font-size: px2rem(22);
        }
      }
    }
  }
</style>
