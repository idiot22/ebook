<template>
    <div class="book2">
        <div class="book2-list">
            <div class="book2-wraper" v-for="(item,index) in bookList" :key='index'>
                <img :src="item.cover" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: [
    'data'
  ],
  computed: {
    bookList() {
      return this.data.itemList
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
.book2{
    width:100%;
    height:100%;
    overflow: hidden;
    .book2-list{
        display: flex;
        flex-flow: row wrap;
        padding: px2rem(5) px2rem(2) px2rem(2) px2rem(2);
        .book2-wraper{
            width:33.33%;
            height: 100%;
            flex: 0 0 33.33%;
            padding: 0px px2rem(2) px2rem(0) px2rem(2);
            box-sizing: border-box;
            img{
                width: 100%;
                height:100%
            }
        }
    }

}
</style>
