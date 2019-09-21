<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input class="slide-contents-search-input"
               type="text"
               :placeholder="$t('book.searchHint')"
               @click="showSearchPage()"
               v-model="searchText"
               @keyup.enter="search()"
               ref="searchInput">
      </div>
      <div class="slide-contents-search-cancel"
            @click="hideSearchPage()"
            v-if="searchVisible">{{$t("book.cancel")}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-if="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t("book.haveRead2")}}</span>
        </div>
      </div>
    </div>
    <scroll class="slide-contents-list" :top="175" :bottom="48" ref="scroll" v-if="!searchVisible">
      <div class="slide-contents-item"  v-for="(item, index) in navigation" :key="index"
       :style="cataloguepad(item.level)">
        <span class="slide-contents-item-label" :class="{'selected': section === index}"
        @click="displayRendition(item.href)">{{ item.label}}</span>
        <span class="slide-contents-item-page">{{ item.page}}</span>
      </div>
    </scroll>

    <!--搜索列表-->
    <scroll class="slide-search-list" :top="85" :bottom="48" ref="scroll" v-show="searchVisible">
      <div class="slide-search-item" v-for="(item, index) in searchList"
           :key="index" v-html="item.excerpt" @click="displayRendition(item.cfi,true)">
      </div>
    </scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../../components/Scroll'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [
    ebookMixin
  ],
  components: {
    Scroll
  },
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: null
    }
  },
  methods: {
    displayRendition(href, highlight = false) {
      this.display(href, () => {
        this.hideMenuTitle()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(href)
        }
      })
    },
    showSearchPage() {
      this.searchVisible = true
    },
    hideSearchPage() {
      this.searchVisible = false
      this.searchList = null
      this.searchText = null
    },
    cataloguepad(level) {
      return { marginLeft: `${px2rem((level || 0)) * 15}rem` }
    },
    search() {
      this.doSearch(this.searchText).then((results) => {
        this.searchList = results
        this.searchList.map((item) => {
          item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
          return item
        })
      })
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item =>
          item.load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item)))
      ).then(results => Promise.resolve([].concat.apply([], results)))
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.ebook-slide-contents{
    width: 100%;
    box-sizing: border-box;
    .slide-contents-search-wrapper{
            display: flex;
            margin: px2rem(20) 0;
            padding: 0 px2rem(15);
            width:100%;
            box-sizing: border-box;
        .slide-contents-search-input-wrapper{
            flex: 1;
            display: flex;
            border-radius: px2rem(3);
            justify-content: center;
            align-items: center;
            padding: px2rem(12) 0px;
            .slide-contents-search-icon{
                flex: 0 0 px2rem(28);
                font-size: px2rem(12)
            }
            .slide-contents-search-input{
                background: transparent;
                outline: none;
                border:none;
            }
        }
    }
    .slide-contents-search-cancel{
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include center
    }
    .slide-contents-book-wrapper{
        display: flex;
        width:100%;
        height: px2rem(90);
        padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
        box-sizing: border-box;
        .slide-contents-book-img-wrapper{
          flex: 0 0 px2rem(65);
          padding: 0px px2rem(10);
          box-sizing: border-box;
          .slide-contents-book-img{
            width:px2rem(45);
            height: px2rem(60)
          }
        }
        .slide-contents-book-info-wrapper{
          flex: 1;
          .slide-contents-book-title{
            font-size: px2rem(14);
            .slide-contents-book-title-text{
                display:-webkit-box;
                text-overflow:ellipsis;
                overflow:hidden;
                width: px2rem(155);
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;

            }
          }
          .slide-contents-book-author{
            font-size: px2rem(12);
            .slide-contents-book-author-text{
                display:-webkit-box;
                text-overflow:ellipsis;
                overflow:hidden;
                width: px2rem(155);
                -webkit-line-clamp: 2;
                -webkit-box-orient:vertical;
            }
          }
        }
        .slide-contents-book-progress-wrapper{
          flex: 0 0 px2rem(70);
            display: flex;
            align-items: center;
            justify-content: center;
          .slide-contents-book-progress{
            .progress{
              font-size: px2rem(14);
              line-height: px2rem(16);
            }
            .progress-text{
              font-size: px2rem(12);
              line-height: px2rem(14);
              margin-left: px2rem(2);
            }
          }
          .slide-contents-book-time{
            font-size: px2rem(12);
            line-height: px2rem(14);
            margin-top: px2rem(5);
          }
        }
    }
    .slide-contents-list{
      width: 100%;
      .slide-contents-item{
        display: flex;
        padding: px2rem(20) px2rem(10);
        box-sizing: border-box;
        width: 100%;
        .slide-contents-item-label{
          flex: 1;
          width: 100%;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
        .slide-contents-item-page{
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right;

        }
      }
    }
    .slide-search-list{
      .slide-search-item{
        padding: px2rem(10) px2rem(10);
        font-size: px2rem(14)
      }
    }
}

</style>
