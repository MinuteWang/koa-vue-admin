<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "./style/index.scss";
@import "./style/normalize.css";
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
