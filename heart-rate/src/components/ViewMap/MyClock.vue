<template>
    <div id="clock-canvas-war" :class="ifShow" >
        <canvas id="clock-canvas" width="180" >
        </canvas>
        <div id="clock-number" >{{now_time}}</div>
    </div>
</template>

<script>
export default {
    props: ["showState"],
    data(){
        let now = new Date();
        // 当前时间
        const stTime = {
            sec: now.getSeconds(),
            min: now.getMinutes(),
            hr: now.getHours(),
            millionSeconds: now.getMilliseconds(),
        };
        // 累计时间
        const acTime = {
            sec: 0,
            min: 0,
            hr: 0,
            millionSeconds: 0,
        };
        return {
            stTime,
            acTime,
            ifShow:"hidden",
        }
    },
    watch:{
        showState(){
            this.updateState();
        }
    },
    computed:{
        now_time(){
            let ob = this.acTime;
            return this.get_num2string(ob);
        }
    },
    methods: {
        get_num2string(ob){
            const fn = (num) => num < 10 ? "0" + num : "" + num ;
            const fn3 = (num) => num < 10 ? "00" + num :  num < 100 ? "0" + num : "" + num ;
            return fn(ob.min)+ " : " + fn(ob.sec) + " : " + fn3(Math.abs(ob.millionSeconds));
        },
        updateState(){
            console.dir(this.showState)
            this.ifShow = this.showState;
            if (this.showState == "show") {
                this.startClock();
            }
        },
        time2obj(time){
            return {
                sec: time.getSeconds(),
                min: time.getMinutes(),
                hr: time.getHours(),
                millionSeconds: time.getMilliseconds(),
            };
        },
        get_now(){
            let now = new Date();
            let nowObj = this.time2obj(now);
            let new_nowObj = {
                sec: nowObj.sec - this.stTime.sec,
                min: nowObj.min - this.stTime.min,
                hr: nowObj.hr - this.stTime.hr,
                millionSeconds: nowObj.millionSeconds - this.stTime.millionSeconds,
            };

            this.stTime = nowObj;
            return new_nowObj;
        },
        startClock(){
            this.stTime = this.time2obj(new Date());
            requestAnimationFrame(this.clock_run);
        },
        clock_run(){
            var now = new Date();
            // let {sec, min , hr, millionSeconds} = this.get_now(now);
            var sec = (60 + now.getSeconds() - this.stTime.sec) % 60;
            var min = (60 + now.getMinutes() - this.stTime.min) % 60;
            var hr  = (12 + now.getHours() - this.stTime.hr) % 12;
            var millionSeconds  = (1000 + now.getMilliseconds() - this.stTime.millionSeconds) % 1000;
            this.acTime = {sec, min, hr, millionSeconds};
            
            hr = hr>=12 ? hr-12 : hr;

            var ctx = document.querySelector('#clock-canvas').getContext('2d');
            ctx.save();
            ctx.clearRect(0,0,150,150);
            ctx.translate(75,75);
            ctx.scale(0.4,0.4);
            ctx.rotate(-Math.PI/2);
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.lineWidth = 8;
            ctx.lineCap = "round";
            // Hour marks
            ctx.save();
            for (var i=0;i<12;i++){
                ctx.beginPath();
                ctx.rotate(Math.PI/6);
                ctx.moveTo(100,0);
                ctx.lineTo(120,0);
                ctx.stroke();
            }
            ctx.restore();

            // Minute marks
            ctx.save();
            ctx.lineWidth = 5;
            for (i=0;i<60;i++){
                if (i%5!=0) {
                ctx.beginPath();
                ctx.moveTo(117,0);
                ctx.lineTo(120,0);
                ctx.stroke();
                }
                ctx.rotate(Math.PI/30);
            }
            ctx.restore();


            ctx.fillStyle = "black";

            // 绘制小时
            ctx.save();
            ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(-20,0);
            ctx.lineTo(80,0);
            ctx.stroke();
            ctx.restore();

            // 绘制分钟
            ctx.save();
            ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(-28,0);
            ctx.lineTo(112,0);
            ctx.stroke();
            ctx.restore();

            // 绘制秒钟
            ctx.save();
            ctx.rotate(sec * Math.PI/30);
            ctx.strokeStyle = "#D40000";
            ctx.fillStyle = "#D40000";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-30,0);
            ctx.lineTo(83,0);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0,0,10,0,Math.PI*2,true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(95,0,10,0,Math.PI*2,true);
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.arc(0,0,3,0,Math.PI*2,true);
            ctx.fill();
            ctx.restore();

            ctx.beginPath();
            ctx.lineWidth = 14;
            ctx.strokeStyle = '#325FA2';
            ctx.arc(0,0,142,0,Math.PI*2,true);
            ctx.stroke();

            ctx.restore();

            if(this.showState == "show"){
                requestAnimationFrame(this.clock_run);
            }
        }
    },
    mounted() {
        // requestAnimationFrame(this.clock_run);
    },
    updated(){
        // if (this.show) {
        //     this.clock_run();
        // }
    }
}
</script>


<style>
    #clock-canvas-war{
        /* display: flex; */
        justify-content: center;
        flex-direction: column ;
        transition: opacity ease-in 0.5s;
    }
    #clock-canvas{
        display: relative;
        margin-left: 14px;
    }
    #clock-number{
        text-align:center;
        font-size: 15px;
    }

    .show{

    }
    .hidden{
        opacity: 0%;
    }

</style>