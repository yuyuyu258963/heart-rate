<template>
    <div class="map-item">
        <div class="item-controller" >
            <a-button type="primary" 
                :loading="iconLoading" 
                @click="pause">
                <template #icon><PoweroffOutlined /></template>
            </a-button>
        </div>
        <div class="heart-map-item-wrap" >
            <canvas 
                class="heart-map-item drawing_left_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
            </canvas>
            <canvas 
                class="heart-map-item drawing_right_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
            </canvas>
        </div>
    </div>
    
</template>

<script>

import { defineComponent } from 'vue';
import { DrawPen  } from "./draw_back"
import { PoweroffOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    name: 'HeatMapItem',
    components:{
        PoweroffOutlined,
    },
    data() {
        let ctxSize = {ctxWidth:600, ctxHeight:200}
        const drawPen = new DrawPen();
        
        return {
            ctxSize,
            drawPen
        };
    },
    created(){
        
    },
    mounted() {
        const canvasBody = document.querySelector(".drawing_left_map");
        if(canvasBody!=null){
            this.drawPen.run({
                    leftMap:this.getElement(".drawing_left_map"),
                    rightMap:this.getElement(".drawing_right_map")}, 
                    
                    this.ctxSize);
        }

    }, 
    methods:{
        getElement(class_name){
            return document.querySelector(class_name);
        },
        pause(){
            this.drawPen.mainController.pauseAnimation();
        }
    },
    watch:{
        
    },
    updated(){
        console.log("updated");
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
    /* border: 1px solid black; */
    position: relative;
}

.heart-map-item{
    position: relative;
    border: none;
    /* margin-left: -1px; */
    /* border: 1px solid red; */
    /* 移动平滑 */
    /* transition: all linear 0.2s; */
    /* color: rgb(178, 199, 207); */
}

.map-item{
    width: 100%;
    height: 220px;
    display: inline-flex;
    flex-direction: row ;
    justify-content: center;
    padding: 10px;
}


.map-item .item-controller{
    width: 200px;
    border-left: 1px solid var(--juejin-sub-6-orange);
    border-right: 1px solid #ccc;
    transition: all ease-in-out 0.2s;
    user-select: none;
}

.map-item .item-controller:hover{
    border-left: 2px solid var(--juejin-sub-6-orange);
}

</style>