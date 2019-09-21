<template>
    <div class="flap-card-wrapper">
      <div class="flap-card-bg" :class="{cardvisible:cardVisible}">
        <div class="flap-card">
            <div class="flap-card-semi-circle" v-for="(item,index) in flapCardList" :key="index" ref="circle">
                <div class="flap-card-semi-circle-left" ref="left" :style="semiCricelStyle(item,'left')"></div>
                <div class="flap-card-semi-circle-right" ref="right" :style="semiCricelStyle(item,'right')"></div>
            </div>
        </div>
      </div>
      <div class="close-btn-wrapper" @click="close">
        <span class="icon-close"></span>
      </div>
      <pop-new-book :randomBook ='randomBook' v-if="cardVisible"></pop-new-book>
    </div>
</template>

<script>
import popNewBook from '../../components/bookStore/popNewBook'

export default {
  props: [
    'randomBook'
  ],
  components: {
    popNewBook
  },
  data() {
    return {
      // 翻转卡片的样式
      flapCardList: [
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 100,
          rotateDegree: 0
        },
        {
          r: 74,
          g: 171,
          _g: 171,
          b: 255,
          imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 99,
          rotateDegree: 0
        },
        {
          r: 255,
          g: 198,
          _g: 198,
          b: 102,
          imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 98,
          rotateDegree: 0
        },
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 97,
          rotateDegree: 0
        },
        {
          r: 59,
          g: 201,
          _g: 201,
          b: 22,
          imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 96,
          rotateDegree: 0
        }
      ],
      font: 0,
      back: 1,
      clear: null,
      cardVisible: false,
      isClose: false
    }
  },
  methods: {
    close() {
      this.$emit('close', false)
      this.isClose = true
    },
    semiCricelStyle(item, direction) {
      return {
        backgroundSize: item.backgroundSize,
        backgroundColor: `rgba(${item.r},${item.g},${item.b})`,
        backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight,
        zIndex: item.zIndex
      }
    },
    // 获取card的dom然后修改css
    getCard2rend(index, card) {
      if (!this.isClose) {
        let item = this.flapCardList[index]
        let dom = (card === 'font' ? this.$refs.right : this.$refs.left)[index]
        dom.style.transform = `rotateY(${item.rotateDegree % 360}deg)`
        dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
        dom.style.zIndex = item.zIndex
      }
    },
    prepare() {
      this.flapCardList[this.back].rotateDegree += 180
      this.getCard2rend(this.back, 'back')
    },
    semiCard() {
      if (!this.isClose) {
        this.prepare()
        let clear = setInterval(() => {
          if (this.flapCardList[this.font].rotateDegree === 180 || this.isClose) {
            clearInterval(clear)
            this.next()
          }
          if (this.flapCardList[this.font].rotateDegree < 180) {
            this.flapCardList[this.font].rotateDegree += 10
            this.flapCardList[this.font]._g -= 5
            this.flapCardList[this.back].rotateDegree += 10
            if (this.flapCardList[this.font].rotateDegree === 90) {
              this.flapCardList[this.back].zIndex = 400
              this.flapCardList[this.back]._g -= 45
            } else if (this.flapCardList[this.font].rotateDegree > 90) {
              this.flapCardList[this.back]._g += 5
            }
            this.getCard2rend(this.font, 'font')
            this.getCard2rend(this.back, 'back')
          }
        }, 15)
      }
    },
    reset() {
      this.flapCardList[this.font].rotateDegree = 0
      this.flapCardList[this.font]._g = this.flapCardList[this.font].g
      this.flapCardList[this.back].rotateDegree = 0
      this.flapCardList[this.back]._g = this.flapCardList[this.back].g
      this.getCard2rend(this.font, 'font')
      this.getCard2rend(this.back, 'back')
    },
    next() {
      if (!this.isClose) {
        this.reset()
        this.font = (this.font + 1) % (this.flapCardList.length)
        this.back = (this.back + 1) % (this.flapCardList.length)
        const len = this.flapCardList.length
        let leftdoms = this.$refs.left
        let rightdoms = this.$refs.right
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.font + len) % len)
          leftdoms[index].style.zIndex = item.zIndex
          rightdoms[index].style.zIndex = item.zIndex
        })
        this.semiCard()
      }
    }
  },
  mounted() {
    this.semiCard()
    setTimeout(() => {
      this.cardVisible = true
    }, 1000)
  }
}
</script>

<style lang="scss">
@import '../../assets/styles/global';
.flap-card-wrapper{
    position:absolute;
    top:0px;
    bottom: 0px;
    left: 0px;
    right:0px;
    background:rgba(0,0,0,0.4);
    z-index:1000;
    @include center;
     .cardvisible{
      display: none
    }
    .flap-card-bg{
        width: px2rem(64);
        height: px2rem(64);
        background: white;
        border-radius: 10px;
        animation:flapcardshow 0.3s ease;

        @keyframes flapcardshow {
          0% {
            transform:scale(0.5)
          }
          50%{
            transform:scale(1)
          }
          70%{
            transform:scale(1.3)
          }
          100%{
            transform:100%
          }
        }
        .flap-card{
            position:absolute;
            top:0px;
            bottom: 0px;
            left:0px;
            right:0px;
            margin:auto;
            width:px2rem(48);
            height: px2rem(48);
            .flap-card-semi-circle{
                position: absolute;
                width:100%;
                height: 100%;
                display:flex;
                .flap-card-semi-circle-left{
                    flex:0 0 50%;
                    width:50%;
                    height: 100%;
                    background-repeat:no-repeat;
                    background-position: center right;
                    border-radius: px2rem(24) 0px 0px px2rem(24);
                    transform-origin: right;
                }
                .flap-card-semi-circle-right{
                    flex:0 0 50%;
                    width:50%;
                    height: 100%;
                    background-repeat:no-repeat;
                    background-position: center left;
                    border-radius: 0px px2rem(24) px2rem(24) 0px;
                    transform-origin: left;
                    backface-visibility: hidden;
                }
            }
        }
    }
    .close-btn-wrapper{
        width: 100%;
        position: absolute;
        bottom:5%;
        @include center;
        .icon-close{
            color:white;
            width:px2rem(45);
            height:px2rem(45);
            background: #333;
            border-radius: 50%;
            font-size:px2rem(25);
            @include center;
        }
    }
}
</style>
