<template>
  <div 
    id="controller-div" 
    draggable="true" 
    @drag="handelDrag"
    @dragend="handelDragEnd"
    >
    消息
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {throttle} from "../../utls/utls"


export default defineComponent({
    name: 'ControlPanel',
    setup(){
      const panelPosition = ref({x: 0, y: 0})
      
      const handelDrag = (event) => {
        console.dir(event);
        const [clientX, clientY] = [event.offsetX, event.offsetY];
        
        throttle(()=>{
          if (clientX>0 && clientY>0) {
            panelPosition.value.x = clientX;
            panelPosition.value.y = clientY;
          }
        }, 100)()
        console.log(clientX, clientY);
        // dragEle.style.left = `10px`
        // dragEle.style.top = `10px`
        
      }

      const handelDragEnd = () => {
        throttle(()=>{
          const dragEle = document.querySelector("#controller-div");

          if (panelPosition.value.x>0 && panelPosition.value.y>0) {
            dragEle.style.transform = `translate(${panelPosition.value.x}px, ${panelPosition.value.y}px)`
          }
        }, 100)()
      }
      
      return {
        handelDrag,
        handelDragEnd,

      }
    },
    
})
</script>

<style>
  #controller-div{
    height: 300px;
    width: 300px;
    position: absolute;
    /* -webkit-user-drag:auto; */
    background-color: rgb(78, 108, 192);
    /* border: 1px solid red; */
    display: inline-block;
  }

</style>