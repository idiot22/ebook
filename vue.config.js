// eslint-disable-next-line spaced-comment
function mock(app, url, data) { //传入url，获取什么值
  app.get(url, (req, res) => {
    res.json(data)
  })
}
let homeData = require('./src/mock/bookHome')
let shelfData = require('./src/mock/bookShelf')
let listData = require('./src/mock/bookList')
let flatListData = require('./src/mock/bookFlatList')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    before(app) {
      mock(app, '/book/home', homeData)
      mock(app, '/book/shelf', shelfData)
      mock(app, '/book/list', listData)
      mock(app, '/book/flat-list', flatListData)
    }
  }
}
