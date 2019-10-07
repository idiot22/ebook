# 微信读书开发

## 功能模块

书城，书架，书本列表，书本详情，阅读器，听书模块

## 具体功能

**书架**

可以搜索书籍，分组书籍，移动增加分组，设置私密阅读，离线下载，移动书架，移出书架，切换中英文

**阅读器**

上下翻页，切换主题，进度条移动，字体字号切换，点击目录移动到相应位置，关键字搜索

**书城**

点击随机生成书籍推荐，有精美动画，搜索动画

## 项目过程

### 配置

+ 利用nvm来管理node版本

  [nvm下载及node安装](https://www.jianshu.com/p/d0e0935b150a)

  [nvm](https://www.cnblogs.com/shanefe/p/7859539.html)
  
  ```
  nvm -v
  nvm install latest
  nvm use (node版本号)
  ```
  
+ vue-cli安装

  ```
  npm install -g @vue/cli
  ```

  ```
  npm i -g @vue/cli-service-global //原型开发，可以快速预览单个vue文件
  vue serve可以运行单个文件
  ```

+ 用cli搭建项目

  ```
  vue create wxbook
  ```

  配置项

   ![2](C:\Users\lenovo\Desktop\myproject\wxbook\微信读书\2.PNG)

  ![1](C:\Users\lenovo\Desktop\myproject\wxbook\微信读书\1.PNG)

+ 打包问题

  ```
  npm run build
  ```

  有路径问题

  新建vue.config.js

  ```
  module.exports = {
  	baseUrl: process.env.NODE_ENV === 'production' ?'./':'/'
  }
  ```


### 渲染电子书

```
npm i epubjs -S
```

### eslint

1.

```
'intent':'off' //空格忽略
'space-before-function-paren':'off'
```

### web字体和字体图标

### viewport和rem

app.vue

```
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

```
export default {
}
document.addEventListener('DOMContentLoaded',()=>{ 
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 :  fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>>
```

### global.scss和reset.scss,px2rem

reset.scss的目的是为了消除不同浏览器默认样式的不一致性

global.scss规定了整个站点的公共样式、公共方法和公共参数

### vuex

基本用法

store.js

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 10
  },
  mutations: {
    'SET_TEST': (state, newval) => {
      state.test = newval
    }
  },
  actions: {
    setTest: ({ commit, state }, newval) => {
      return commit('SET_TEST', newval)
    }
  }
})

```

app.vue

```
  mounted() {
    this.$store.dispatch('setTest', 8).then(() => {  
    //之后可以用mapactions来实现this.setTest()
      console.log(this.$store.state.test)
    })
  }
```

**模块化**

详情看代码

**使用map**

```
<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['test']) //是map返回的对象展开合并到computed当中
  }
}
```

### nginx静态服务器

[下载配置步骤](https://www.cnblogs.com/taiyonghai/p/9402734.html)

```

    server {
        listen       80;
        server_name  localhost;
        autoindex on; //使目录结构展现
        location / {
            root   ../myproject/wxbook/resourse; //相对路径
            add_header 'Access-Control-Allow-Origin' '*';
        }
    }
```

### 路由配置

```
  routes: [
    {
      path:'/ebook', // 当这个路由就异步加载这个组件
      component: ()=> import('./views/ebook/index.vue'),
      children:[{
          path:":filename",//动态路由，filename
          component: ()=> import("./components/ebook/EbookReader")
        }
      ]
    }
  ]
```

### 电子书渲染

```
import Epub from 'epubjs'
import {mapGetters} from 'vuex'
global.ePub = Epub
export default {
 computed:{
     ...mapGetters(["filename"])
 },
 methods:{
     initEpub(){
       const baseURL = 'http://192.168.1.112:80'
       let url = baseURL+'/'+this.filename+'.epub'
       this.book = new Epub(url)  //通过url来new一本书
       console.log(this.book)
       this.rendition = this.book.renderTo('read',{
           width:innerWidth,
           height:innerHeight,
           method:'defaut'
       })
       this.rendition.display()
     }
 },
 mounted(){
     let filename = this.$route.params.filename.split("|").join("/") //获取filename
     this.$store.dispatch('setFilename',filename).then(()=>{  //改变filename之后初始化epub
         this.initEpub()
     })
 }
}
```

### 左右滑页

```
      this.rendition.on('touchstart', (event) => { // 开始触碰使得x坐标及时间
        this.touchX = event.changedTouches[0].clientX
        this.touchtime = event.timeStamp
      })
      this.rendition.on('touchend', (event) => { // 开始触碰使得x坐标及时间
        this.x = event.changedTouches[0].clientX - this.touchX
        this.time = event.timeStamp - this.touchtime
        if(this.x > 40 && this.time < 500){
          this.prePage()
        }else if(this.x < -40 && this.time < 500){
          this.nextPage()
        }else{
          this.showMenuTitle()
        }
        //event.preventDefault()
        event.stopPropagation()
      })
    }
```

### 菜单和titlebar的显示

用menuvisible来控制显示

动画

```
.slide-down-enter,.slide-down-leave-to{
    transform: translate3d(0,-100%,0)
}
.slide-down-enter-to,.slide-down-leave{
    transform: translate3d(0,0,0)
}
.slide-down-enter-active,.slide-down-leave-active{
    transition: all 0.1s ease
}
```

### 字体大小设置

```
this.currentBook.rendition.themes.fontSize(this.defaultFontSize + 'px')//this.currentBook为渲染的电子书对象
```

### 字体样式设置

```
this.currentBook.rendition.themes.font(font)
//把所需样式传入
```

在ebookreader中 将字体文件导入进字体渲染器当中，字体路径要为url

```
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
```

### 环境变量的配置

在不同环境下不同的变量，就要配置环境变量，可看vue-cli3文档

新建.env.development,要以VUE_APP开头

```VUE_APP_RES_URL = 'http://localhost:80'```

调用

```process.env.VUE_APP_RES_URL```

### 字体国际化

```
npm -i vue-i18n -S
```

新建lang文件夹把转换文件放入，新建index.js写映射关系，并到vue实例注册

```
import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import {getLocale, setLocale} from '../utils/localStorage'
Vue.use(VueI18N)

const messages = {
    en,cn
}
let locale = null
if(getLocale("locale")){
    locale = getLocale("locale")
}else{
    locale = 'cn'
    setLocale("locale",locale)
}
const i18n = new VueI18N({
    locale,
    messages,
    silentTranslationWarn: true
})

export  default i18n 
```

调用

```
$t("book.setFont")
```

### 阅读器主题设置

阅读器样式

mixin.js

```
export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': 'black',
          'background': 'white',
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': 'black',
          'background': '#efe3d3',
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': 'black',
          'background': '#c4e7c6',
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000',
        }
      }
    }
  ]
}
```

### 阅读器进度条

Ebookreader//将电子书分页，以便可以定位电子书

```
 this.book.ready.then(()=>{
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getBookObject(this.filename,"fontSize")/16))
      }).then((locations)=>{
        this.setBookAvailable(true)
 })
```

html5的滑动条

```
<input class="progress" type="range"
    max="100"
    min="0"
    step="1"
    @input="onProgressInput($event.target.value)"
    @change="onProgressChange($event.target.value)"
    :value="progress"
    :disabled="!bookAvailable"
    ref="progress">
```

**滑动页面随之改变**

```
        onProgressInput(progress){ //监听滑动条滑动，progress为进度
            this.setProgress(progress).then(()=>{
                this.displayProgress(progress)
            })
        },
        displayProgress(progress){
            const cfi = this.currentBook.locations.cfiFromPercentage(progress/100) 
            //获取进去求cfi百分比再渲染
            this.currentBook.rendition.display(cfi)
        },
```

滑动时进度条颜色变化

```
        updateProgressCss(){
            this.$refs.progress.style.backgroundSize = `${this.progress}% 100%` 
        },
```

章节切换

```
    prevSection() {
      if (this.section >= 1 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
            this.displaySection()
        })
      }
    }
    
    displaySection() {
          const sectionInfo = this.currentBook.section(this.section) //可以获取章节信息
          this.currentBook.rendition.display(sectionInfo.href).then(()=>{  
          //通过章节的href渲染
            this.refreshProgress()
          })
    },
    refreshProgress() { //与进度条联动
      let current = this.currentBook.rendition.currentLocation()  //获取当前定位
      let process = this.currentBook.locations.percentageFromCfi(current.start.cfi) //获取百分比
      if(this.section === this.currentBook.spine.length - 1){
        process = 1
      }
      this.setProgress(Math.floor(process*100))
      this.updateProgressCss()
    }
```

### 阅读器进度保存

在滑动页面，进度条拉动，上下翻页时需要记录进度

进度以获取当前的cfi来确定

refreshProgress()复用

最初渲染时定义display方法

```
this.currentBook.rendition.display(target)//把cfi放入就能渲染到相应页面
```

```
      display(target,fun){
        if(target){
          this.currentBook.rendition.display(target).then(()=>{
            this.refreshProgress()
            if(fun) fun()
          })
        }else{
          this.currentBook.rendition.display().then(()=>{
            this.refreshProgress()
            if(fun) fun()
          })
        }
      }
```

### 目录渲染

调用srcoll组件

获取navigation的值渲染出来

EbookReader中

```
      this.book.loaded.navigation.then(nav => {
        let a = expandArray(nav.toc)
        let navlist = [].concat(...a)
        function find(ele, level = 0) {
          if (!ele.parent) {
            return level
          } else {
            return find(navlist.filter((item) => {
              return item.id === ele.parent
            }), ++level)
          }
        }
        navlist.forEach((item,index) => {
          navlist[index].level = find(item)
        })
        console.log(navlist)
        this.setNavigation(navlist)
      })
```

### 目录搜索加高亮

```
   //每个摘要里含有excerpt，cif
   search(){
      this.doSearch(this.searchText).then((results)=>{
        this.searchList = results  //将获取到的搜索列表传入
        this.searchList.map((item)=>{ //高亮
          item.excerpt = item.excerpt.replace(this.searchText,`<span class="content-search-text">${this.searchText}</span>`)
          return item
        })
      })
    },
    doSearch(q) {  //以提供的输入搜索词，就返回带有关键词的摘要
        return Promise.all(
          this.currentBook.spine.spineItems.map(item => 
          item.load(this.currentBook.load.bind(this.currentBook))
          .then(item.find.bind(item, q))
          .finally(item.unload.bind(item)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
    }
```

点击摘要到相应文章，文章搜索内容高亮

````
 //displayRendition方法中
 this.currentBook.rendition.annotations.highlight(href)
````

### 书签

## 首页的开发

### 子路由

一个主页面中要通过其他路由来渲染不同的页面或组件，可以通过子路由

### 卡片翻转动画

+ 将左右分割的图依次排列重叠好
+ 建一个可以获取相应dom渲染dom的函数
+ 在旋转前将左边的一部分与右边重叠，一起旋转，到90度，font页面隐藏，back显性
+ 当180就进入next()要归位，然后改变zindex值

二。

用animation属性来播放复杂点的动画

animation:flapcardshow 0.3s ease both;//让动画停留在最后一帧

animation:flapcardshow 0.3s ease infinite;

```
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
```

### mockjs模拟数据

先下载，然后建mock文件夹，把数据都放入，然后在index.js引入

````
import Mock from 'mockjs'
import BookHomeApi from './bookHome'
import BookShelfApi from './bookShelf'
import BookHomeList from './bookList'
import BookFlatList from './bookFlatList'

// Mock.setup({
//   timeout: '350-600'
// })

Mock.mock(/\/book\/home/, 'get', BookHomeApi)
Mock.mock(/\/book\/shelf/, 'get', BookShelfApi)
Mock.mock(/\/book\/list/, 'get', BookHomeList)
Mock.mock(/\/book\/flat-list/, 'get', BookFlatList)

export default Mock
````

然后引入main.js

然后就可以用axois调用

#### vue自带服务器来返回数据

vue.config.js

````
function mock(app, url, data) { //传入url，获取什么值
  app.get(url, (req, res) => {
    res.json(data)
  })
}

module.exports = {
  devServer: {
    before(app) {
      mock(app, '/book/home', homeData)
      mock(app, '/book/shelf', shelfData)
      mock(app, '/book/list', listData)
      mock(app, '/book/flat-list', flatListData)
    }
  }
}
````

### 书架

书架列表的做法

#### create-api编辑书籍，下面的弹出组件

可以在全局用api的方式直接调用组件

```
 npm install vue-create-api --save-dev
```

在main.js中引用下面文件

创建一个js文件

````
import CreateAPI from 'vue-create-api'
import Vue from 'vue'
import Toast from '../components/Toast' //在引用的组件中要加那么属性
Vue.use(CreateAPI)
Vue.createAPI(Toast, true) //小写
Vue.mixin({
  name: 'toast',
  methods: {
    toast(data) {
      return this.$createToast({
        $props: data
      })
    }
  }
})
````



#### 电子书离线缓存

使用indexDB

安装localforage库

写downloadAPI,有回调函数

```
// 下载书本
export function download(book, onSuccess, onFail, onProgress) {
  if (onProgress == null) {
    onProgress = onFail
    onFail = null
  }
  axios.create({
    methods: 'get',
    baseURL: process.env.VUE_APP_EPUB_URL,
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: ProgressEvent => {  //进度
      if (onProgress) {
        onProgress(ProgressEvent)
      }
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      // eslint-disable-next-line no-undef
      setLocalForage(book.fileName, blob, () => {
        if (onSuccess) {
          onSuccess(book)
        }
      }, err => {
        if (onFail) {
          onFail(err)
        }
      })
    }).catch(err => {
      if (onFail) {
        onFail(err)
      }
    })
}
```



## 优化

### vue中的mixin

在每次要调用vuex中的变量时，都要重复引用mapgetters，可以用mixin来解决

utils文件夹建mixin.js

```
import { mapGetters } from 'vuex'
export const ebookMixin = {
    computed: {
        ...mapGetters(['filename', 'menuvisible'])
      }
}
```

引用

```
import {ebookMixin} from '../../utils/mixin'
export default {
  mixins:[
    ebookMixin
  ]
}
```

vuex中设置变量用action取代dispatch

1.在store文件夹中新建actions文件夹，把模块中的action cope，导出actions，注册到store

2.引用 

```
import { mapActions } from 'vuex'
  methods:{
    ...mapActions(['setFilename','setMenuVisible'])
  }
```

全局mixin



## 规范

epubcfi(/6/6[A315104_1_En_1_Chapter]!/4/8/4[Sec2]/6/1:0)"}

## 问题

1.目录向右滑动动画不显示，transition嵌套原理？

2.book.js中的函数需要调用vue

可以在引入函数后再包装一个函数

````
    showBookDetail(item){
      showBookDetail(this,item)  //引入的函数，将this传入
    },
````



## 小技巧

#### 1.vue ui 可以打开一个ui界面管理项目

#### 2.vue

#### 3.获取dom，在元素上加ref=“name‘’  ，调用this.$refs.name

#### 4.文本一行不换行，。。。shenglue

```
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
```

#### 5class绑定

````
:class="{'select':tab === 1}">
````

#### 6.动态组件

````
<component :is="tab === 1 ? content : bookmark"></component>
````

#### 7.实现文本多行截断以省略号结尾

```
display:-webkit-box;
text-overflow:ellipsis;
overflow:hidden;
width: px2rem(155);
-webkit-line-clamp: 2;
-webkit-box-orient:vertical;
```

#### 8 多级数组转一级数组

````
export function expandArray(array){
 return array.map(function(item){
    return [].concat(item,...expandArray(item.subitems))
  })
}

//
let a = expandArray(nav.toc)
let b = [].concat(...a)


        function find(ele,level = 0){
          if(!ele.parent){
            return level
          }else{
           return  find(b.filter((item)=>{
              return item.id === ele.parent
            }),++level)
          }
        }
        b.forEach((item)=>{
          item.level = find(item)
        })
````

#### 9一行省略

可以父级

display: flex;

子级

flex:1可以自动计算宽度就可以使用ellipsis

#### 10js控制css

```
      <div class="slide-contents-item"  v-for="(item, index) in navigation" :key="index" 
       :style="cataloguepad(item.level)">
```

````
    cataloguepad(level){
     return { marginLeft: `${px2rem((level ? level : 0))*15}rem`}
    }
````

#### 11调用相同功能函数但要实现差异化需求，回调

```
    display(target, fun) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshProgress()
          if (fun) fun()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshProgress()
          if (fun) fun()
        })
      }
    }
```

#### 12数组降维

````
results =[
[1,2,3],
[1,23,4]
]
[].concat.apply([], results)
````

#### 13css做书签或三角形

```
width:0px;
height:0px;
border-width: px2rem(10) px2rem(10) px2rem(10) px2rem(10);
border-style:solid;
border-color: white white transparent white 
```

#### 14自身垂直居中

````
position:absolute;
top:0px;
bottom: 0px;
left:0px;
right:0px;
margin:auto;
background: #333;
width:px2rem(48);
height: px2rem(48);
````

#### 15多个元素重叠

![1568884369513](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\1568884369513.png)

就将元素设为绝对定位，脱离文档流

#### 16背景图片

background-size:

background-repeat

#### 17图片懒加载

1. 安装插件：


npm install vue-lazyload --save-dev


2. main.js引入插件：

import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    error:require('./statics/site/imgs/erro.jpg'),
    loading:require('./statics/site/imgs/load.gif')
})

3. vue文件中将需要懒加载的图片 :src="" 修改为 v-lazy="" 

#### 18跳转路由

```
  vue.$router.push({
    path: '/store/detail',
    query: {
      fileName: book.fileName,
      category: book.category

    }
  })
```

#### 19子组件事件触发父组件事件

子组件

```
click() {
  this.$emit('onClick') //不传值
}
```

父组件

````
@onClick = "push()"//接受传出的事件
````

#### 20动态组件通过计算属性变换

```
<template>
  <div class="book-item">
      <component :is="itemType"></component> 
  </div>
</template>

<script>
import shelflistitem1book from '../../components/shelf/shelflistitem1book'
import shelfListItem2book from '../../components/shelf/shelfListItem2book'
import shelfListItemAddBook from '../../components/shelf/shelfListItemAddBook'
export default {
    props:[
        "data"
    ],
    data(){
        return{
            book: shelflistitem1book,
            book2: shelfListItem2book,
            addBook: shelfListItemAddBook
        }
    },
    computed:{
        itemType(){  //不用到component注册，组件名引用，可以到放在data中用作变量
            console.log(this.data)
            return this.data.type === 1 ? this.book :(this.data === 2 ? this.book2 : this.addBook)
        }
    }
}
```

#### 界面渲染完之后调用

this.$nextTick

#### ***通用组件可以用creatapi



## 课后知识点

1.vue-cli

2.vue.config.js

3.

​        setTimeout(()=>

​          this.$refs.book.style.transition ="all 0.2s ease"

​        ,200)

this指向问题

## 技术难点

1.阅读器开发：分页算法，全文搜索算法，引入web字体，主题设计

2.离线存储机制：localstorage+indexDB

3.复杂手势和交互动画

4.vuex+mixin 来解耦+复用，精简代码

5.利用es6实现数据结构变化

6.

## 小知识

#### event.stopPropagation()和event.preventDefault()

#### [clientY ,pageY,radiusY,screenY](https://www.cnblogs.com/xiaotaiyang/p/3843073.html)

### 动画

1.用vue自带的<transition>标签来实现简单动画，一般以元素消失，出现来触发动画，动画定义起始状态，中间状态，最终状态

2.要是元素一直存在，并动画想要改变布局，可以自己定义class标签实现

## epub接口归纳

1.调节渲染后的字体大小

this.currentBook.rendition.themes.fontSize(this.defaultFontSize+'px')

## 常用布局





