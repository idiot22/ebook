<template>
    <transition name="fade">
        <div class="slide-content-wrapper" v-show="menuvisible && setvisible === 3">
            <transition name="slide-right">
                <div class='content' v-if="setvisible === 3 ">
                    <div class="content-page-wrapper" v-if='bookAvailable'>
                        <div class="content-page">
                            <component :is="tab === 1 ? content : bookmark"></component>
                        </div>
                        <div class="content-page-tab">
                            <div class="content-page-tab-item"
                                :class="{'selected':tab === 1}"
                                @click="selectTab(1)">
                                {{ $t("book.navigation") }}
                            </div>
                            <div class="content-page-tab-item"
                                :class="{'selected':tab === 2}"
                                @click="selectTab(2)">
                                {{ $t("book.bookmark") }}
                            </div>
                        </div>
                    </div>
                    <div class="load" v-else>
                        <ebook-loading></ebook-loading>
                    </div>
                </div>
            </transition>
            <div class="content-bg" @click="hideMenuTitle()"></div>
        </div>
    </transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import EbookSliderContent from '../ebook/EbookSliderContent'
import EbookSliderBookMark from '../ebook/EbookSliderBookMark'
import EbookLoading from '../ebook/EbookLoading'
export default {
  mixins: [
    ebookMixin
  ],
  components: {
    EbookSliderContent,
    EbookSliderBookMark,
    EbookLoading
  },
  data() {
    return {
      tab: 1,
      content: EbookSliderContent,
      bookmark: EbookSliderBookMark
    }
  },
  methods: {
    selectTab(tab) {
      this.tab = tab
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
    .slide-content-wrapper{
        position: absolute;
        left:0px;
        top: 0px;
        z-index: 400;
        display: flex;
        width:100%;
        height: 100%;
    }
    .content{
        flex:0 0 85%;
        height: 100%;
        overflow: hidden;
        .content-page-wrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            .content-page{
                flex:1;
                width:100%;
            }
            .content-page-tab{
                display: flex;
                width: 100%;
                flex: 0 0 px2rem(48);
                .content-page-tab-item{
                    @include center;
                    flex:1;
                    font-size: px2rem(12);

                }
            }
        }
    }
    .content-bg{
        flex: 0 0 15%;
        height: 100%
    }
    .load{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
</style>
