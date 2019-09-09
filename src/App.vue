<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang = 'scss' scoped>
@import './assets/styles/global.scss';
@import './assets/fonts/cabin.css';
@import './assets/fonts/daysOne.css';
@import './assets/fonts/montserrat.css';
@import './assets/fonts/tangerine.css';
#app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
<script>
export default {
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>
