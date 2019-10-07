<template>
  <transition name='fade'>
    <div class="title">
        <div class="title-wraper" v-if='shelfTitleVisible' :class="{shadow:shelfShadow}">
            <span class="clear" @click="clearCache" v-if='currentType === 1'>{{$t("shelf.clearCache")}}</span>
            <span class="clear" @click="back" v-else>{{$t("shelf.back")}}</span>
            <div class="title-text">
                <span class="title">{{$t("shelf.title")}}</span>
                <span v-show="isEditMode" class="select">{{readbooks}}</span>
            </div>
            <span class="edit" @click="toggleEdit">{{this.isEditMode ? $t("shelf.cancel") : $t("shelf.edit")}}</span>
        </div>
    </div>
  </transition>
</template>

<script>
import { ebookStore, storeShelfMixin } from '../../utils/mixin'
import { clearLocalForage } from '../../utils/localForage'
import { clearLocalStorage } from '../../utils/localStorage'

export default {
  mixins: [
    ebookStore,
    storeShelfMixin
  ],
  props: [
    'shelfShadow'
  ],
  data() {
    return {
    }
  },
  watch: {
    shelfShadow(newval) {
      console.log(111)
    }
  },
  methods: {
    toggleEdit() {
      this.setIsEditMode(!this.isEditMode)
      if (!this.isEditMode) {
        this.setShelfSelected([])
      }
    },
    clearCache() {
      clearLocalForage()
      clearLocalStorage()
      this.setShelfSelected([])
      this.toast({
        text: '清除缓存成功'
      }).show()
    },
    back() {
      this.$router.go(-1)
    }
  },
  computed: {
    readbooks() {
      return this.shelfSelected.length > 1 ? this.$t('shelf.haveSelectedBooks').replace('$1', this.shelfSelected.length) : this.$t('shelf.haveSelectedBook').replace('$1', this.shelfSelected.length)
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.title{

    width: 100%;
    .title-wraper{
        position: absolute;
        top:0px;
        z-index: 300;
        padding: 10px 10px;
        width:100%;
        box-sizing: border-box;
        height: px2rem(42);
        display: flex;
        align-items: center;
        background: white;
        &.shadow{
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1)
        }
        .title-text{
            flex: 1;
            display: flex;
            flex-direction: column;
            text-align: center;
            .title{
                font-size:px2rem(16);
                color:black;
                font-weight: 500;
                text-align: center;
            }
            .select{
                font-size: px2rem(10);
                font-weight: 500;
                text-align: center;
            }
        }
        .clear{
            padding: pz2rem(10) 0px;
            font-size: px2rem(16);
            font-weight: 500;
        }
        .edit{
            padding: pz2rem(10) 0px;
            font-size: px2rem(16);
            font-weight: 500;
        }
    }
}
</style>
