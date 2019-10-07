<template>
  <div class="shelf-search-wrapper">
    <div class="shelf-search" :class="{selecttop:isInputClick}">
        <div class="search-wrapper">
                <div class="icon-search-wrapper">
                    <span class="icon-search icon"></span>
                </div>
                <div class="search-input-wrapper">
                    <input class="search-input" type="text" :placeholder="$t('shelf.search')"
                            @click="onSearchClick" v-model="searchText" ref="searchInput"
                        >
                </div>
                <div class="icon-clear-wrapper" v-show="searchText" @click='clearSearchText'>
                    <span class="icon-close-circle-fill icon"></span>
                </div>
        </div>
        <div class="icon-clock-wrapper" v-show="!isInputClick">
            <span class="icon-cn icon" v-if="lang === 'cn'" @click="changelocale2en"></span>
            <span class="icon-en icon" @click="changelocale2cn" v-else ></span>
        </div>
        <div class="cancel-btn-wrapper" v-show="isInputClick" @click="notClick">
            <span class="cancel-btn">{{$t('shelf.cancel')}}</span>
        </div>
        <transition name='shelf-slide-up'>
            <div class="shelf-search-tab-wrapper">
                <div class="tabitem" v-for="(item, index) in tablist" :key="index"
                    @click="searchItem(index)"
                    :class="{selectitem:index == selectItemIndex}"
                    v-show="isInputClick">
                        {{item.content}}
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
import { getLocale, setLocale } from '../../utils/localStorage'
import { ebookStore } from '../../utils/mixin'
export default {
  mixins: [
    ebookStore
  ],
  computed: {
    tablist() {
      return [
        { id: 0,
          content: this.$t('shelf.default') },
        { id: 1,
          content: this.$t('shelf.progress') },
        { id: 2,
          content: this.$t('shelf.purchase') }
      ]
    }
  },
  data() {
    return {
      searchText: null,
      isInputClick: false,
      lang: null,
      selectItemIndex: 0
    }
  },
  methods: {
    onSearchClick() {
      this.isInputClick = true
      this.setShelfTitleVisible(false)
      this.$emit('searchClick', this.isInputClick)
    },
    notClick() {
      this.isInputClick = false
      this.setShelfTitleVisible(true)
      this.$emit('searchClick', this.isInputClick)
    },
    clearSearchText() {
      this.searchText = null
    },
    changelocale2en() {
      this.$i18n.locale = 'en'
      this.lang = 'en'
      setLocale('en')
    },
    changelocale2cn() {
      this.$i18n.locale = 'cn'
      this.lang = 'cn'
      setLocale('cn')
    },
    searchItem(index) {
      this.selectItemIndex = index
    }
  },
  mouned() {
    this.lang = getLocale()
  }
}
</script>

<style lang='scss'>
@import '../../assets/styles/global';
.shelf-search-wrapper{
    position: relative;
    background: white;
}
.shelf-search{
    position: absolute;
    top:  px2rem(42);
    display: flex;
    width:100%;
    transition: top 0.2s linear;
    background: white;
    &.selecttop{
        position: fixed;
        top:0px;
        z-index:100
    }
    .search-wrapper{
        display: flex;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(5);
        align-items: center;
        height: px2rem(40);
        flex: 1;
        .icon-search-wrapper{
            flex:0 0 px2rem(22);
            display: flex;
            align-items: center;
            padding: 0px 0px 0px px2rem(10);
            .icon-search{
                justify-content: flex-start;
            }
        }
        .search-input-wrapper{
            flex:1;
            padding: 0 px2rem(10);
            box-sizing: border-box;
            @include center;
            .search-input{
                outline: none;
                background: transparent;
                border:none;
                font-size:px2rem(14);
                width:100%
            }
        }
        .icon-clear-wrapper{
            flex:0 0 px2rem(24);
            display: flex;
            align-items: center;
            padding: 0px px2rem(10);
        }
    }
    .cancel-btn-wrapper{
        font-size:12px;
        display: flex;
        align-items: center;
        padding:0px px2rem(10);
        font-size:px2rem(16);
        color: rgb(34, 152, 207)
    }
    .icon-clock-wrapper{
        padding:0px px2rem(10);
        font-size:px2rem(16) ;
        display: flex;
        align-items: center;
    }
}
.shelf-search-tab-wrapper{
    position: absolute;
    top:px2rem(55);
    display: flex;
    width: 100%;
    background:white;
    padding: px2rem(10) 0px;
    .tabitem{
        font-size:px2rem(14);
        width: 30%;
        text-align: center;
    }
    .selectitem{
        color:rgb(0, 162, 255)
    }
}
</style>
