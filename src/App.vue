<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from './containers/Main'

export default {
  name: 'app',
  components: {
    Main
  }
}
</script>

<style>
.body {
  overflow-x: hidden;
}
#app {
    padding: 10px;
}
</style>
