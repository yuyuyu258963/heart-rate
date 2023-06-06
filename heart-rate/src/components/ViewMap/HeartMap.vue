<template>
    <div id="heart-map-div" >
        <HeatMapItem />
        <div style="flex:1;" ></div>
        <div class="item-canvas-map-view" >
            <canvas  
                v-for="item in seriesData" 
                :key="item" 
                :class="item"
                width="280"
                height="200"
                >
            </canvas>
        </div>
        <div style="flex:1;" ></div>
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import HeatMapItem from "./HeatMapItem"
// import { drawBackground } from "./draw_back"
import {getMockData} from "./draw_back"
import drawTools from "./draw_heartLine";

export default defineComponent({
    name: "HeartMap",
    components:{
        HeatMapItem,
    },
    data() {
        const seriesData = ["F7-T7","P3-O1","F8-T8","T7-FT9"];
        
        return {
            heartData:{},
            seriesData
        }
    },
    methods: {
        drawMaps(){
            const [width, height] = [280, 200];
            this.seriesData.forEach(item => {
                item;
                const elem = document.querySelector(`.${item}` )
                // const elem = document.querySelector(`.${item}` )
                console.dir(elem);
                if(elem == null) return ;
                let ctx = elem.getContext('2d');
                ctx.translate(0.5,0.5);
                ctx.save();
                let data = getMockData({ctxWidth:width, ctxHeight:height});
                const myDrawTool = new drawTools(5);
                for(let i = 0; i <data.length; i++){
                    myDrawTool.drawHeartLine(ctx, height, data[i])
                }
            })
        }
    },
    mounted() {
        // const ctx = document.querySelector(".heart-map-item");
        // drawBackground(canvasBody);
        this.drawMaps();
    },
})
</script>

<style lang="scss">
#heart-map-div{
    width: 80%;
    height: 90%;
    // border: 1px solid red;
    // background-color: white;
    display: flex;
    flex-direction: column;
    color: #bedce2;
    display: inline-flex;
    justify-content: center;
    border-radius: 10px;
    animation: animated-border 5s infinite;
}

@keyframes animated-border {
    0% {
        box-shadow: 0 0 0 0 rgba(28, 78, 172, 0.4);
    }
    100% {
        box-shadow: 0 0 0 40px rgba(255, 255, 255, 0);
    }
}


.item-canvas-map-view{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    canvas{
        border: 1px solid black;
        transform: rotateY(48deg);
        opacity: 1;
        // border: 0;
    }
    canvas:not(:first-child){
        // transform: translate(-40%,0);
    }
}

</style>