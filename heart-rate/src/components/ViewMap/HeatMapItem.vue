<template>
    <div class="heart-map-item-wrap" >
        <canvas class="heart-map-item" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
        </canvas>
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import { drawBackground } from "./draw_back"


export default defineComponent({
    name: 'HeatMapItem',
    data() {
        let ctxSize = {ctxWidth:300, ctxHeight:150}
        return {
            ctxSize
        }
    },
    mounted() {
        const wrapper = document.querySelector(".heart-map-item-wrap")
        const canvasBody = document.querySelector(".heart-map-item");
        const ctx = canvasBody.getContext("2d");
        this.ctxSize = {
            ctxWidth: wrapper.clientWidth * 3,
            ctxHeight: wrapper.clientHeight
        }
        
        ctx.save();
        drawBackground(canvasBody, this.ctxSize);
        
    },
})
</script>

<style >
.heart-map-item-wrap{
    width: 90%;
    height: 200px;
    overflow: hidden;
}

.heart-map-item{
    /* width: 300%; */
    /* height: 100%;
    width: 300%; */
    position: relative;
    /* left: -5%; */
}


</style>