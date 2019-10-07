<template>
    <div class="book">
        <img :src="data.cover" alt="">
    </div>
</template>

<script>
export default {
  props: [
    'data'
  ]
}
</script>

<style lang='scss'>
@import '../../assets/styles/global';
.book{
    width: 100%;
    height:100%;

    img{
        width:100%;
        height: 100%;
    }
}
</style>
