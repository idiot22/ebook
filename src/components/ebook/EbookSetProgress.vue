<template>
    <transition name="slide-up">
        <div class="setting-wrapper" v-show="menuvisible && setvisible === 2">
            <div class="setting-progress">
                <div class="read-time-wrapper">
                    <span class="read-time-text">{{getReadTime()}}</span>
                    <span class="icon-forward" ></span>
                </div>
                <div class="progress-wrapper" >
                    <div class="progress-icon-wrapper">
                        <span class="icon-back"  @click="prevSection()"></span>
                    </div>
                    <input class="progress" type="range"
                            max="100"
                            min="0"
                            step="1"
                            @input="onProgressInput($event.target.value)"
                            @change="onProgressChange($event.target.value)"
                            :value="progress"
                            :disabled="!bookAvailable"
                            ref="progress">
                    <div class="progress-icon-wrapper" >
                        <span class="icon-forward" @click="nextSection()"></span>
                    </div>
                </div>
                <div class="text-wrapper">
                    <span class="progress-section-text">{{(getSetionName != false ? getSetionName : '') + progress}}</span>
                    <span class="progress-text">%</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import { setBookObject ,getBookObject} from '../../utils/localStorage'
export default {
  mixins: [
    ebookMixin
  ],
  computed:{
    getSetionName(){
      if(this.section){
        let info = this.currentBook.section(this.section).href
        return this.currentBook.navigation.get(info).label
      }
      return false
    }
  },
  methods: {
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress(progress)
      })
    },
    displayProgress(progress) {
      const cfi = this.currentBook.locations.cfiFromPercentage(progress / 100)
      this.display(cfi)
    },
    prevSection() {
      if (this.section >= 1 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
            this.displaySection()
        })
      }
    },
    nextSection() {
      if (this.currentBook.spine.length - 1 > this.section && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
            this.displaySection()
        })
      }
    },
    onProgressChange() {},
    displaySection() {
          const sectionInfo = this.currentBook.section(this.section)
          this.display(sectionInfo.href) //mixin
    },
    getReadTime(){
      return this.$t("book.haveRead").replace("$1",this.getReadTimeByMinute())
    },
    getReadTimeByMinute(){
        if (!getBookObject(this.filename,"readtime")) {
            return 0
          } else {
            return Math.ceil(getBookObject(this.filename,"readtime") / 60)
          }
    }
  },
  updated(){
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    }
}
</script>

<style lang='scss' scoped>
  @import "../../assets/styles/global";

  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(90);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        @include center;
        font-size: px2rem(12);
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          background-size: 0 100%;
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 px2rem(22);
          font-size: px2rem(22);
          @include center;
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        font-size: px2rem(12);
        text-align: center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          line-height: px2rem(15);
          @include ellipsis
        }
        .progress-text {
        }
      }
    }
  }
</style>
