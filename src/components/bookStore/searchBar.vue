<template>
  <div>
      <div class="search-bar-wrapper" :class="{hidetitle:!titleVisible}">
        <div class="title-search-wrapper">
            <transition name="title">
                <div class="title-search-page-wrapper" v-if="titleVisible">
                    <span class="title-text">ff</span>
                    <div class="icon-shake-wrapper">
                        <span class="icon-shake icon" @click='showCard'></span>
                    </div>
                </div>
            </transition>
          <div class="icon-back-wrapper" :class="{hidetitle:titleVisible}">
            <span class="icon-back icon" @click="back"></span>
          </div>
          <div class="search-wrapper" :class="{hidetitle:!titleVisible,showshadow:shadowVisible}">
            <div class="search-blank" :class="{hidetitle:!titleVisible}">
            </div>
            <div class="search-bg">
              <span class="icon-search icon"></span>
              <input type="text" class="search" @click="showHotSearch()">
            </div>
          </div>
        </div>
      </div>
      <scroll :top='50' :bottom="0"  @onScroll="onScroll" v-if="hotSearchVisible">
        <hot-search :label="$t('home.historySearch')"
                    :btn="$t('home.clear')"
                    :hotSearch="searchList.historySearch"
                    >
        </hot-search>
      </scroll>
  </div>
</template>

<script>
import { ebookStore, ebookMixin } from '../../utils/mixin'
import hotSearch from '../../components/bookStore/hotSearch'
import Scroll from '../../components/Scroll'
export default {
  mixins: [
    ebookMixin,
    ebookStore
  ],
  components: {
    hotSearch,
    Scroll
  },
  data() {
    return {
      hotSearchVisible: false,
      titleVisible: true,
      searchList: {
        hotSearch: [
          {
            type: 1,
            text: 'Self-Reported Population Health',
            num: '1.8万'
          },
          {
            type: 1,
            text: 'Library and Information Sciences',
            num: '1.1万'
          },
          {
            type: 1,
            text: 'Global Business Strategy',
            num: '1.3万'
          },
          {
            type: 1,
            text: 'Corporate Data Quality',
            num: '1.0万'
          },
          {
            type: 1,
            text: 'Verrechnungspreise',
            num: '3.9万'
          }
        ],
        historySearch: [
          {
            type: 2,
            text: 'Computer Science'
          },
          {
            type: 1,
            text: 'Building the Infrastructure for Cloud Security'
          },
          {
            type: 2,
            text: 'ePub'
          },
          {
            type: 2,
            text: 'api'
          },
          {
            type: 2,
            text: 'Vue.js'
          },
          {
            type: 2,
            text: 'Nginx'
          },
          {
            type: 2,
            text: 'Java'
          },
          {
            type: 2,
            text: 'hdfs'
          },
          {
            type: 2,
            text: 'vuejs'
          },
          {
            type: 2,
            text: 'es6'
          },
          {
            type: 2,
            text: 'Intel'
          },
          {
            type: 1,
            text: 'Pro Git'
          },
          {
            type: 2,
            text: 'imooc'
          },
          {
            type: 2,
            text: 'Education'
          },
          {
            type: 2,
            text: 'Springer'
          },
          {
            type: 2,
            text: 'Environment'
          }
        ]
      },
      shadowVisible: false
    }
  },
  computents: {
  },
  watch: {
    offsetY(val) {
      if (val > 0) {
        this.titleVisible = false
        this.showShadow()
      } else {
        this.titleVisible = true
        this.hideShadow()
      }
    },
    hotOffsetY(val) {
      if (val > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    showCard() {
      this.$emit('showCard', true)
    },
    showShadow() {
      this.shadowVisible = true
    },
    hideShadow() {
      this.shadowVisible = false
    },
    showHotSearch() {
      this.hotSearchVisible = true
      this.titleVisible = false
      this.setOffsetY(0)
    },
    hideHotSearch() {
      this.hotSearchVisible = false
      this.titleVisible = true
    },
    back() {
      this.hideHotSearch()
    },
    onScroll(offsetY) {
      this.setHotOffsetY(offsetY)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.search-bar-wrapper{
    height: px2rem(92);
    z-index: 200;
    &.hidetitle{
        height: px2rem(50);
    }
    .title-search-wrapper{
        width:100%;
        position: absolute;
        top:0px;
        left: 0px;
        .title-search-page-wrapper{
            width: 100%;
            height: px2rem(42);
            position: relative;
            @include center;
            transition:all $ani-time $ani-type;
            .title-text{
                @include center;
                font-size:px2rem(18)
            }
            .icon-shake-wrapper{
                position: absolute;
                top:0px;
                bottom: 0px;
                right: px2rem(15);
                @include center;
            }
        }
        .icon-back-wrapper{
            position: absolute;
            left: px2rem(15);
            top:0px;
            height: px2rem(42);
            transition: top $ani-time $ani-type;
            z-index:300;
            &.hidetitle{
              top:px2rem(-4);
          }
        }
        .search-wrapper{
            position: absolute;
            top:px2rem(42);
            width:100%;
            height: px2rem(50);
            display: flex;
            padding: px2rem(5) px2rem(15);
            box-sizing:border-box;
            z-index: 200;
            transition: top $ani-time $ani-type;
            &.hidetitle{
                top:0px;
            }
            &.showshadow{
              box-shadow: 0px px2rem(2) px2rem(7) rgba(0, 0, 0, 0.1)
            }
            .search-blank{
                width:0px;
                transition: all $ani-time $ani-type;
                &.hidetitle{
                    width: 30px
                }
            }
            .search-bg{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #f4f4f4;
                border-radius: px2rem(20);
                border: px2rem(1) solid #eee;
                box-sizing: border-box;
                padding: px2rem(5) px2rem(15);
                .search{
                    flex: 1;
                    background: transparent;
                    outline:none;
                    border: none;
                }
                .icon{
                    font-size:px2rem(16);
                    padding-right:10px
                }
            }
        }
    }
}
</style>
