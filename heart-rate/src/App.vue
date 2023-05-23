<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HeaderCom />
  <div id="outer-wrapper" >
    <ControlPanel />
    <HeartMap />
  </div>
  
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderCom from './components/Header/HeaderCom.vue'
import ControlPanel from "./components/ControlPanel/ControlPanel"
import HeartMap from "./components/ViewMap/HeartMap.vue"

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HeaderCom,
    ControlPanel,
    HeartMap,
  }
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
}
html, body {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}
#outer-wrapper{
  padding: 0 10px;
}

</style>
