<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper"  v-show="this.menuvisible">
        <div class="icon-wrapper">
          <span class="icon-menu icon" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress icon" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright icon" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a icon" @click="showSetting(0)">A</span>
        </div>
      </div>
    </transition>
      <ebook-font-setting></ebook-font-setting>
      <ebook-font-pop></ebook-font-pop>
      <ebook-set-theme></ebook-set-theme>
      <ebook-set-progress></ebook-set-progress>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookFontSetting from './EbookFontSetting'
import EbookFontPop from './EbookFontPop'
import EbookSetTheme from './EbookSetTheme'
import EbookSetProgress from './EbookSetProgress'
export default {
  mixins: [
    ebookMixin
  ],
  components: {
    EbookFontSetting,
    EbookFontPop,
    EbookSetTheme,
    EbookSetProgress
  },
  methods: {
    showSetting(a) {
      this.setVisible(a)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-5) px2rem(10) rgba(0, 0, 0, .08);
    font-size:px2rem(20);
    align-items: center;
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(28);
      }
      .icon-bright {
        font-size: px2rem(24);
      }
    }
  }

</style>
