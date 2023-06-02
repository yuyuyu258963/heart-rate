<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HeaderCom />
  <div id="outer-wrapper" >
    <!-- <ControlPanel /> -->
    <HeartMap />
  </div>
  
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HeaderCom from './components/Header/HeaderCom.vue'
// import ControlPanel from "./components/ControlPanel/ControlPanel"
import HeartMap from "./components/ViewMap/HeartMap.vue"

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HeaderCom,
    // ControlPanel,
    HeartMap,
  }
}
</script>

<style>
#app {
  --juejin-font-white-disable: #fff;
  --juejin-font-white: #fff;
  --juejin-success-1-normal: #00b453;
  --juejin-success-2-deep: #00964e;
  --juejin-success-3-light: #e2faed;
  --juejin-warning-1-normal: #ff7426;
  --juejin-warning-2-deep: #e05e00;
  --juejin-warning-3-light: #fff3e5;
  --juejin-danger-1-normal: #f64242;
  --juejin-danger-2-deep: #cb2634;
  --juejin-danger-3-light: #fff2ff;
  --juejin-sub-1-purple: #9f54ff;
  --juejin-sub-2-blue: #57a0ff;
  --juejin-sub-3-cyan: #5ad7ff;
  --juejin-sub-4-green: #33d790;
  --juejin-sub-5-yellow: #ffcc15;
  --juejin-sub-6-orange: #ff834e;
  --juejin-sub-7-red: #ff5e54;
}

*{
  box-sizing: border-box;
  border: none;
}

#app {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* background-color: red; */
}
html, body {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
}
#outer-wrapper{
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0,10,37);
  background-color: rgb(47, 94, 226);
  background-color: rgb(119, 150, 235);
  /* margin: 0 10%; */
  background-image: linear-gradient(to top, #07182e 0%, #11232e 50%, #071a35 100%);
}

</style>
