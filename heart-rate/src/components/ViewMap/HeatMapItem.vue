<template>
    <div class="map-item">
        <div class="item-controller" >
            <div class="i-space" >
                <a-button 
                    type="primary" 
                    :loading="iconLoading" 
                    :disabled="disabled_btn_pre"
                    @click="handle_pre_move">
                    <template #icon><CaretLeftOutlined /></template>
                    
                </a-button>

                <a-button type="primary" 
                    :loading="iconLoading" 
                    :disabled="!disabled_btn2_pause"
                    @click="pause">
                    <template #icon><PoweroffOutlined /></template>
                </a-button>

                <a-button type="primary" 
                    :loading="iconLoading" 
                    :disabled="disabled_btn3_next"
                    @click="handle_next_move">
                    <template #icon><CaretRightOutlined /></template>
                    
                </a-button>
            </div>
            <MyClock :showState="showClock ? 'show':'hidden'" />
        </div>
        <div class="heart-map-item-wrap" >
            <canvas 
                class="heart-map-item drawing_left_map" :width="600" :height="200" >
                <!-- class="heart-map-item drawing_left_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" > -->
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
import MyClock from "./MyClock"
import { PoweroffOutlined, CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons-vue';



export default defineComponent({
    name: 'HeatMapItem',
    components:{
        PoweroffOutlined,
        CaretLeftOutlined,
        CaretRightOutlined,
        MyClock,
    },
    data() {
        let ctxSize = {ctxWidth:10000, ctxHeight:200}
        const drawPen = new DrawPen();
        let disabled_btn_pre = false;
        let disabled_btn2_pause = true;
        let disabled_btn3_next = false;
        let showClock = false;
        
        return {
            ctxSize,
            drawPen,
            showClock,
            disabled_btn_pre,
            disabled_btn3_next,
            disabled_btn2_pause,
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
        handle_next_move(){
            this.disabled_btn_pre = false;
            this.disabled_btn3_next = true;
            this.drawPen.mainController.MoveReverseDirection();
            this.showClock = true; 
        },
        handle_pre_move(){
            this.disabled_btn_pre = true;
            this.disabled_btn3_next = false;
            this.drawPen.mainController.MoveNroDirection();
            this.showClock = true; 
        },
        pause(){
            this.showClock = !this.showClock; 
            this.disabled_btn3_next = !this.disabled_btn3_next;
            this.disabled_btn_pre = false;
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
.i-space{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 20%;
}

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
    border-left: 10px solid ;
    border-image: linear-gradient(to right, rgb(14, 93, 184), #07182e 0.7%) 1;
    border-right: 1px solid #ccc;
    transition: all ease-in-out 0.2s;
    user-select: none;
    color: rgb(14, 93, 184);
    border-radius: 5px;
    overflow: hidden;
}

/* .map-item .item-controller:hover{
    border-left: 2px solid var(--juejin-sub-6-orange);
} */

</style>