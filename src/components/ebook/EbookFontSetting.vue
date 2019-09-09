<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuvisible && setvisible === 0">
      <div class="setting-font-size">
        <div class="preview leftA" ref="left">
          <span ref="leftText">A</span>
        </div>
        <div class="select">
          <div class="select-wrapper" v-for="(item, index) in fontSizeList" :key="index"
               ref="item"
               @click="setFontSize(item)"
               >
            <div class="line" ></div>
            <div class="point-wrapper">
              <div class="point" v-show="defaultFontSize === item.fontSize">
                <div class="small-point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview rightA" ref="right">
          <span  ref="rightText">A</span>
        </div>
      </div>
      <div class="setting-font-family" @click.stop="showFontFamilySetting">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text"></span>
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward">{{this.defaultFontFamily}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { FONT_SIZE_LIST } from '../../utils/book'
import { setBookObject } from '../../utils/localStorage'
export default {
  mixins: [
    ebookMixin
  ],
  data() {
    return {
      fontSizeList: FONT_SIZE_LIST
    }
  },
  methods: {
    setFontSize(item) {
      this.setDefaultFontSize(JSON.parse(JSON.stringify(item)).fontSize) // 控制圆点显示
      this.currentBook.rendition.themes.fontSize(this.defaultFontSize + 'px')
      setBookObject(this.filename, 'fontSize', this.defaultFontSize)
    },
    showFontFamilySetting() {
      this.setFontFamilyVisible(true)
    }
  },
  mounted() {
    console.log(this.setvisible)
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
   .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: px2rem(90);
    box-shadow: 0 -0.13333rem 0.26667rem rgba(0,0,0,0.08);
    background: white;
    .setting-font-size {
      flex: 2;
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .leftA{
          font-size: px2rem(18);
          line-height: px2rem(60);
      }
      .select {
        display: flex;
        flex: 1;
        .select-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          &:first-child {
            .line {
              &:first-child {
                border-top: none;
              }
            }
          }
          &:last-child {
            .line {
              &:last-child {
                border-top: none;
              }
            }
          }
          .line {
            flex: 1;
            height: 0;
            border-top: px2rem(1) solid #ccc;
          }
          .point-wrapper {
            position: relative;
            flex: 0 0 0;
            width: 0;
            height: px2rem(7);
            border-left: px2rem(1) solid #ccc;
            .point {
              position: absolute;
              top: px2rem(-8);
              left: px2rem(-10);
              width: px2rem(20);
              height: px2rem(20);
              border-radius: 50%;
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
              @include center;
              .small-point {
                width: px2rem(5);
                height: px2rem(5);
                border-radius: 50%;
                background: black;
              }
            }
          }
        }
      }
    }
    .setting-font-family {
      flex: 1;
      font-size: px2rem(14);
      @include center;
      .setting-font-family-text-wrapper {
        @include center;
      }
      .setting-font-family-icon-wrapper {
        @include center;
      }
    }
  }
</style>
