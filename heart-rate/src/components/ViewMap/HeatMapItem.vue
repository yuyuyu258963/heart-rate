<template>
    <div class="heart-map-item-wrap" >
        <canvas 
            class="heart-map-item drawing_left_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
        </canvas>
        <canvas 
            class="heart-map-item drawing_right_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
        </canvas>
        <!-- <canvas 
            class="heart-map-item drawing_left_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
        </canvas> -->
        <!-- <canvas v-if="showLeftMap==1"
                class="heart-map-item drawing_right_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
        </canvas> -->
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import { drawBackground } from "./draw_back"


export default defineComponent({
    name: 'HeatMapItem',
    data() {
        let ctxSize = {ctxWidth:600, ctxHeight:200}
        let showLeftMap = 0;
        
        return {
            ctxSize,
            showLeftMap
        };
    },
    created(){
        
    },
    mounted() {
        // const wrapper = document.querySelector(".heart-map-item-wrap")
        // this.ctxSize = {
        //     ctxWidth: wrapper.clientWidth,
        //     ctxHeight: wrapper.clientHeight
        // }
        const canvasBody = document.querySelector(".drawing_left_map");
        if (canvasBody!=null) {
            drawBackground(
                {
                    leftMap:this.getElement(".drawing_left_map"),
                    rightMap:this.getElement(".drawing_right_map")
                }, this.ctxSize, this.changeViewSeq);
        }
    }, 
    methods:{
        changeViewSeq(){
            console.dir("changeMap");
            this.showLeftMap++;
            this.showLeftMap = this.showLeftMap % 3;
            // this.showLeftMap = !this.showLeftMap;
        },
        getElement(class_name){
            return document.querySelector(class_name);
        }
    },
    watch:{
        
    },
    updated(){
        console.log("updated");
        // const leftCanvas = document.querySelectorAll(".heart-map-item")[0];
        // const rightCanvas = document.querySelectorAll(".heart-map-item")[1];
        
        // if (leftCanvas!=null) {
        //     drawBackground(
        //         {
        //             leftMap:leftCanvas,
        //             rightMap:rightCanvas,
        //         }, this.ctxSize, );
        // }
    }
})
</script>

<style >
.heart-map-item-wrap{
    width: 600px;
    height: 200px;
    overflow: hidden;
    display: flex;
    padding: none;
    box-sizing: content-box;
    border: 1px solid black;
    position: relative;
}

.heart-map-item{
    position: relative;
    border: none;
    /* margin-left: -1px; */
    /* border: 1px solid red; */
    /* 移动平滑 */
    /* transition: all linear 0.2s; */
    color: rgb(178, 199, 207);
}


</style>