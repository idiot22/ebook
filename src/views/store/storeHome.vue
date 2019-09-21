<template>
  <div class="home">
      <search-bar @showCard="showCard"></search-bar>
      <scroll :top='scrollTop' :bottom="0" @onScroll="onScroll">
          <div class="home-wraper">
            <div :style="{backgroundImage:bgUrl}" id="imgbanner"></div>
          </div>
          <guess-you-like :data="guessYouLikeData"></guess-you-like>
          <recommend :data="recommendData"></recommend>
          <featured :data="featuredData" class="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')"></featured>
          <div v-for="(item,index) in categoryBookData" :key="index">
            <categoryBook :data="item" class="categorybook"></categoryBook>
          </div>
          <category :data="categoryData"></category>
      </scroll>
      <flap-card @close='closeCard' v-if="flapCardVisible" :randomBook="randomBook"></flap-card>
  </div>
</template>

<script>
import searchBar from '../../components/bookStore/searchBar'
import guessYouLike from '../../components/bookStore/guessYouLike'
import recommend from '../../components/bookStore/recommend'
import featured from '../../components/bookStore/featured'
import categoryBook from '../../components/bookStore/categoryBook'
import category from '../../components/bookStore/category'
import Scroll from '../../components/Scroll'
import { ebookMixin } from '../../utils/mixin'
import flapCard from '../../components/bookStore/flapCard'
import { home } from '../../api/book'
export default {
  mixins: [
    ebookMixin
  ],
  data() {
    return {
      flapCardVisible: false,
      randomBook: 0,
      bannerUrl: null,
      guessYouLikeData: null,
      recommendData: null,
      featuredData: null,
      categoryBookData: null,
      categoryData: null
    }
  },
  components: {
    searchBar,
    Scroll,
    flapCard,
    guessYouLike,
    recommend,
    featured,
    categoryBook,
    category
  },
  computed: {
    scrollTop() {
      if (this.offsetY > 0) {
        return 92
      } else {
        return 50
      }
    },
    bgUrl() {
      return `url(${this.bannerUrl})`
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
    closeCard(e) {
      this.flapCardVisible = e
    },
    showCard(e) {
      this.flapCardVisible = e
    }
  },
  mounted() {
    home().then((res) => {
      if (res && res.status === 200) {
        let data = res.data
        this.bannerUrl = data.banner
        console.log(data)
        this.guessYouLikeData = data.guessYouLike
        let randomIndex = Math.floor(Math.random() * data.random.length)
        this.randomBook = data.random[randomIndex]
        this.recommendData = data.recommend
        this.featuredData = data.featured
        this.categoryBookData = data.categoryList
        this.categoryData = data.categories
      }
    })
  }
}
</script>

<style lang='scss'>
@import '../../assets/styles/global';
.home{
  width:100%
}
#imgbanner{
  width: 90%;
  height: px2rem(155);
  background-repeat:no-repeat;
  background-size:100% 100%;
  box-sizing: border-box;
  margin:5%;
}
.featured{
  margin-top:px2rem(40)
}
.categorybook{
  margin-top: px2rem(40)
}
</style>
