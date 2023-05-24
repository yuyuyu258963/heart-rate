<template>
    <div id="heart-map-div" >
        <HeatMapItem />
            
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import HeatMapItem from "./HeatMapItem"
// import { drawBackground } from "./draw_back"

export default defineComponent({
    name: "HeartMap",
    components:{
        HeatMapItem,
    },
    data() {
        return {
            heartData:{}
        }
    },
    mounted() {
        // const ctx = document.querySelector(".heart-map-item");

        // drawBackground(canvasBody);
        
    },
})
</script>

<style lang="scss">
#heart-map-div{
    width: 60%;
    height: 90%;
    border: 1px solid red;
    background-color: white;
    color: #bedce2;
    display: inline-flex;
    justify-content: center;

}
@keyframes move {
    
}




</style>