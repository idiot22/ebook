<template>
  <div class="popnewbook">
      <div class="pop-wraper">
          <div class="info-wraper">
              <div class="img-wraper">
                  <img :src="randomBook.cover" alt="">
              </div>
              <p class="title">{{randomBook.title}}</p>
              <p class="author">{{randomBook.author}}</p>
              <p class="publisher">{{randomBook.publisher}}</p>
          </div>
          <div class="read">
              {{$t("home.readNow")}}
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: [
    'randomBook'
  ]
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.popnewbook{
    position: absolute;
    width: 80%;
    background: white;
    border-radius: 10px;
    overflow: hidden;
        animation:flapcardshow 0.3s ease;
        @keyframes flapcardshow {
          0% {
            transform:scale(0.5)
          }
          50%{
            transform:scale(1)
          }
          70%{
            transform:scale(1.1)
          }
          100%{
            transform:100%
          }
        }
    .pop-wraper{
        width: 100%;
        height: 400px;
        border-radius: 10px;
        .info-wraper{
            padding: 20%;
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .img-wraper{
                img{
                    width:100px;
                }
            }
            .title{
                width: 100%;
                color: black;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size:px2rem(24);
                margin-bottom: 10px;
                margin-top: 10px
            }
            .author{
                width: 100%;
                color: rgb(63, 63, 63);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size:px2rem(20);
                margin-bottom: 10px;
                text-align: center
            }
            .publisher{
                width: 100%;
                color: rgb(136, 136, 136);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size:px2rem(16);
                margin-bottom: 10px;
                text-align: center
            }
        }
        .read{
            position: absolute;
            bottom:0px;
            width:100%;
            height: px2rem(50);
            text-align: center;
            color: white;
            background:rgb(62, 105, 224);
            font-size:px2rem(18);
            line-height:px2rem(50)
        }
    }
}
</style>
