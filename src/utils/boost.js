// eslint-disable-next-line no-extend-native
Array.prototype.pushNoRepeat = function() {
  for (let i = 0; i < arguments.length; i++) {
    let args = arguments[i]
    if (this.indexOf(args) === -1) {
      this.push(args)
    }
  }
}
