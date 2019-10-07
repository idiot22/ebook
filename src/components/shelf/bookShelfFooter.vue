<template>
  <div class="book-shelf-footer" v-if='isEditMode'>
    <div class="book-shelf-tab-wrapper" v-for="(item, index) in tabs" :key="index" @click="onTabClick(item)">
      <div class="book-shelf-tab">
          <div class="icon-private tab-icon" :class="{'is-selected': isSelected}"
              v-if="item.index === 1 && !isPrivate"></div>
          <div class="icon-private-see tab-icon" :class="{'is-selected': isSelected}"
              v-if="item.index === 1 && isPrivate"></div>
          <div class="icon-download tab-icon" :class="{'is-selected': isSelected}"
              v-if="item.index === 2 && !isDownload"></div>
          <div class="icon-download-remove tab-icon" :class="{'is-selected': isSelected}"
              v-if="item.index === 2 && isDownload"></div>
          <div class="icon-move tab-icon" :class="{'is-selected': isSelected}" v-if="item.index === 3"></div>
          <div class="icon-shelf tab-icon" :class="{'is-selected': isSelected}" v-if="item.index === 4"></div>
          <div class="tab-text" :class="{'remove-text': item.index === 4, 'is-selected': isSelected}">{{label(item)}}
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ebookStore } from '../../utils/mixin'
import { saveShelfBook } from '../../utils/localStorage'
import { download } from '../../api/book'
import { removeLocalForage } from '../../utils/localForage'
export default {
  mixins: [
    ebookStore
  ],
  data() {
    return {
      popupComponent: null,
      readToast: null
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2
        },
        {
          label: this.$t('shelf.move'),
          index: 3
        },
        {
          label: this.$t('shelf.remove'),
          index: 4
        }
      ]
    },
    isSelected() {
      return this.shelfSelected.length >= 1
    },
    isPrivate() {
      if (this.isSelected) {
        return this.shelfSelected.every(item => item.private)
      } else {
        return false
      }
    },
    isDownload() {
      if (this.isSelected) {
        return this.shelfSelected.every(item => item.cache)
      } else {
        return false
      }
    }
  },
  methods: {
    setPrivate() {
      if (this.isPrivate) {
        this.shelfSelected.forEach((item) => {
          item.private = false
        })
        this.toast(
          { text: this.$t('shelf.closePrivateSuccess') }
        ).show()
      } else {
        this.shelfSelected.forEach((item) => {
          item.private = true
        })
        this.toast(
          { text: this.$t('shelf.setPrivateSuccess') }
        ).show()
      }
      saveShelfBook(this.shelfList)
      this.popupComponent.hide()
      this.setIsEditMode(false)
    },
    hidePopup() {
      this.popupComponent.hide()
    },
    showPrivateRead() {
      if (this.isSelected) {
        if (!this.isPrivate) {
          this.popupComponent = this.popup({
            title: this.$t('shelf.setPrivateTitle'),
            btn: [
              {
                text: this.$t('shelf.open'),
                click: () => {
                  this.setPrivate()
                }
              },
              {
                text: this.$t('shelf.cancel'),
                click: () => {
                  this.hidePopup()
                }
              }
            ]
          }).show()
        } else {
          this.popupComponent = this.popup({
            title: this.$t('shelf.closePrivateTitle'),
            btn: [
              {
                text: this.$t('shelf.close'),
                click: () => {
                  this.setPrivate()
                }
              },
              {
                text: this.$t('shelf.cancel'),
                click: () => {
                  this.hidePopup()
                }
              }
            ]
          }).show()
        }
      }
    },
    setDownloadRead() {
      this.shelfSelected.forEach((item) => {
        item.cache = true
        console.log(item)
        this.downloadBook(item).then(() => {
          setTimeout(this.readToast.remove(), 200)
        })
      })
      setTimeout(() => {
        this.toast(
          { text: this.$t('shelf.setDownloadSuccess') }
        ).show()
      }, 500)

      saveShelfBook(this.shelfList)
      this.popupComponent.hide()
      this.setIsEditMode(false)
    },
    setRemoveBook() {
      this.shelfSelected.forEach((item) => {
        item.cache = false
      })
      this.shelfSelected.forEach((item) => {
        removeLocalForage(item.fileName, () => { console.log('清除成功') }, (err) => {
          console.log(err)
        })
      })
      this.toast(
        { text: this.$t('shelf.removeDownloadSuccess') }
      ).show()
      saveShelfBook(this.shelfList)
      this.popupComponent.hide()
      this.setIsEditMode(false)
    },
    downloadBook(book) {
      let text = ''
      this.readToast = this.toast({
        text
      })
      this.readToast.continueShow()
      return new Promise((resolve, reject) => {
        download(book, (book) => {
          console.log(book)
          this.readToast.remove()
          resolve(book)
        }, reject, (progressEvent) => {
          this.readToast.updateText(`下载${Math.floor((progressEvent.loaded / progressEvent.total) * 100)}%`)
        })
      })
    },
    showDownloadRead() {
      if (this.isSelected) {
        if (!this.isDownload) {
          this.popupComponent = this.popup({
            title: this.$t('shelf.setDownloadTitle'),
            btn: [
              {
                text: this.$t('shelf.open'),
                click: () => {
                  this.setDownloadRead()
                }
              },
              {
                text: this.$t('shelf.cancel'),
                click: () => {
                  this.hidePopup()
                }
              }
            ]
          }).show()
        } else {
          this.popupComponent = this.popup({
            title: this.$t('shelf.removeDownloadTitle'),
            btn: [
              {
                text: this.$t('shelf.delete'),
                type: 'danger',
                click: () => {
                  this.setRemoveBook()
                }
              },
              {
                text: this.$t('shelf.cancel'),
                click: () => {
                  this.hidePopup()
                }
              }
            ]
          }).show()
        }
      }
    },
    showMoveRead() {
      this.groupDialog({
        groupName: '书籍分组'
      }).show()
    },
    showMoveoutShelf() {
      if (this.isSelected) {
        this.popupComponent = this.popup({
          title: this.shelfSelected.length === 1 ? this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`) : this.$t('shelf.removeBookTitle').replace('$1', '所选书籍'),
          btn: [
            { text: this.$t('shelf.removeBook'),
              type: 'danger',
              click: () => {
                this.moveoutShelf()
              } },
            {
              text: this.$t('shelf.cancel'),
              click: () => {
                this.hidePopup()
              }
            }
          ]
        }).show()
      }
    },
    moveoutShelf() {
      let list = this.shelfList.filter((book) => {
        return this.shelfSelected.every((item) => {
          return item.bookId !== book.bookId
        })
      })
      this.setShelfList(list)
      saveShelfBook(list)
      this.popupComponent.hide()
      this.setIsEditMode(false)
    },
    onTabClick(item) {
      switch (item.index) {
        case 1:
          this.showPrivateRead()
          break
        case 2:
          this.showDownloadRead()
          break
        case 3:
          this.showMoveRead()
          break
        case 4:
          this.showMoveoutShelf()
          break
        default:
          break
      }
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label
        case 2:
          return this.isDownload ? item.label2 : item.label
        default:
          return item.label
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global';
  .book-shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(40);
    background: white;
    padding: px2rem(8);
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
    .book-shelf-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;
      .book-shelf-tab {
        width: 100%;
        height: 100%;
        @include columnCenter;
        .tab-icon {
          text-align: center;
          font-size: px2rem(20);
          color: #666;
          opacity: .5;
          &.icon-shelf {
            color: $color-pink;
          }
          &.icon-download {
            font-size: px2rem(22);
          }
          &.is-selected {
            opacity: 1;
          }
        }
        .tab-text {
          text-align: center;
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
          opacity: .5;
          &.remove-text {
            color: $color-pink;
          }
          &.is-selected {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
