<template>
    <div class="map-item">
        <div class="item-controller" >
            <a-modal :visible="showMod" 
                width="1000px" 
                height="700px"
                title="设置" 
                closable={{false}}
                @ok="closeMod"
                @cancel="closeMod"
                >
                <div >
                    <p>警戒线:</p>
                </div>
                <a-slider v-model:value="sliderValue" :min="0" :max="100" />
                <div >
                    <p>页面位置:</p>
                </div>
                <a-slider v-model:value="backBaseX" :min="0" :max="100" />
                <div >
                    <p>间隔:</p>
                </div>
                <a-slider v-model:value="lineXSpan" :min="2" :max="20" />
            </a-modal>
            <div class="i-space" >
                <SettingFilled
                    size="big"
                    :spin=isCircle
                    style="width:25px;font-size: 150%;"
                    @click="handleSetting"
                    @mouseover="isCircle = true;"
                    @mouseout="isCircle = false;"
                    />
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
            <div style="padding: 0 10%;" >
                <a-slider v-model:value="MoveSpeed"  :min="1" :max="3" />
            </div>
            <div  style="padding: 0 10%;" >
                数据集:{{ dataSetSelectName == 1 ? "chb01_01" : dataSetSelectName == 2 ? "chb01_02" : "未选择" }}
            </div>
            <div  style="padding: 0 10%;" >
                系列名:{{ selectSeries ? selectSeries : "未选择" }}
            </div>
            <div class="dataUpload-span" >
                <div >
                    <a-select
                    ref="select"
                    v-model:value="dataSetSelectName"
                    style="width: 100px"
                    @change="handleChange" 
                    >
                    <a-select-option value="1">chb01_01</a-select-option>
                    <a-select-option value="2">chb01_02</a-select-option>
                    <a-select-option value="3" disabled>chb01_03</a-select-option>
                    <a-select-option value="4" disabled>chb01_04</a-select-option>
                    <a-select-option value="5" disabled>chb01_05</a-select-option>
                </a-select>
                <a-button 
                    shape="circle" 
                    type="primary" 
                    :loading="isuploadDataLoading" 
                    @click="handleSelectData"
                    >
                    <template #icon><UploadOutlined /></template>
                </a-button>

                </div>
                
            </div>
            <MyClock :showState="showClock ? 'show':'hidden'" />
        </div>
        <div class="heart-map-item-wrap" >
            <canvas 
                class="heart-map-item drawing_left_map" :width="1100" :height="400" >
                <!-- class="heart-map-item drawing_left_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" > -->
            </canvas>
            <canvas 
                class="heart-map-item drawing_right_map" :width="ctxSize.ctxWidth" :height="ctxSize.ctxHeight" >
            </canvas>
        </div>
    </div>
</template>

<script>

import { defineComponent, ref } from 'vue';
import { DrawPen  } from "./draw_back"
import MyClock from "./MyClock"
// import {Modal} from "ant-design-vue";
import { PoweroffOutlined, CaretLeftOutlined, CaretRightOutlined, SettingFilled, UploadOutlined } from '@ant-design/icons-vue';
import {requestData} from "../../axios/handlePost"
import {showMessage} from "../../utls/showMsg";



export default defineComponent({
    name: 'HeatMapItem',
    props:["selectSeries"],
    components:{
        PoweroffOutlined,
        CaretLeftOutlined,
        CaretRightOutlined,
        MyClock,
        SettingFilled,
        UploadOutlined,
    },
    data() {
        let ctxSize = {ctxWidth:1100, ctxHeight:400}
        const drawPen = new DrawPen();
        let disabled_btn_pre = false;
        let disabled_btn2_pause = true;
        let disabled_btn3_next = false;
        let showClock = false;
        let showMod = false;
        let isCircle=false;
        let isuploadDataLoading = ref(false);
        const sliderValue = ref(30);
        const backBaseX = ref(0);
        const lineXSpan = ref(5);
        // 数据选择
        const dataSetSelectName = ref("未选择数据")
        const dataSet = ref([]);
        const MoveSpeed = ref(1);
        
        return {
            dataSet,
            ctxSize,
            drawPen,
            showClock,
            MoveSpeed,
            disabled_btn_pre,
            disabled_btn3_next,
            disabled_btn2_pause,
            showMod,
            isCircle,
            sliderValue,
            lineXSpan,
            backBaseX,
            dataSetSelectName,
            isuploadDataLoading,
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
        handleSetting(){
            this.showMod = true;
        },
        /**
         * 处理请求数据
         */
        handleSelectData(){
            if(this.dataSetSelectName == "未选择数据" || this.selectSeries == null){
                showMessage(1, "请先选择数据");
                return;
            }
            this.isuploadDataLoading = true;
            requestData({person:this.dataSetSelectName, name:this.selectSeries}).then((res) => {
                console.log(res);
                this.isuploadDataLoading = false;
                if(!res) return;
                this.dataSet = res.data.data;
                this.drawPen.setDataSet(res.data.data);
            });
        },
        /**
         * 交互框事件
         */
        closeMod(){
            this.showMod = false;
            this.drawPen.setLimitLine(1 - this.sliderValue / 100);
            this.drawPen.setCanvasBaseX(this.backBaseX / 100);
            this.drawPen.setLineXSpan(this.lineXSpan);

        },
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
            if(this.dataSet.length == 0){
                showMessage(1, "请先选择数据");
                return;
            }
            this.showClock = !this.showClock; 
            this.disabled_btn3_next = !this.disabled_btn3_next;
            this.disabled_btn_pre = false;
            this.drawPen.mainController.pauseAnimation();
        }
    },
    watch:{
        MoveSpeed(){
            this.drawPen.setMoveSpeed(this.MoveSpeed);
        },
        selectSeries(){
            showMessage(0, `选择${this.selectSeries}成功!`);
        }
    },
    updated(){
        // console.log("updated");
    }
})
</script>

<style >
.i-space{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0 10%;
    margin-top: 10px;
}

.heart-map-item-wrap{
    width: 1100px;
    height: 400px;
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
    height: 420px;
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

.i-space > .anticon-setting{
    display: flex;
    align-items: center;
}

.dataUpload-span{
    height: 50px;
    width: 100%;
    padding: 5px 10%;
    display: flex;
    justify-content:center;
    align-items: center;
    
}

.dataUpload-span >div {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

/* .map-item .item-controller:hover{
    border-left: 2px solid var(--juejin-sub-6-orange);
} */

</style>