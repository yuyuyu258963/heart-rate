
export default class MapAnimationController {
    constructor(
        limitCount,
        drawDuration = 200,
    ){
        this.drawDuration = drawDuration;
        this.dataIdx = -1;
        this.limitCount = limitCount;
        this.runStep=5;
        this.useLimit = false;
        this.pause = false;
        this.reversed = false;
    }

    get dataIndex(){
        if(!this.pause){
            if(!this.reversed){
                this.dataIdx++;
            } else if(this.dataIdx>=1) {
                this.dataIdx--;
            }
        }
        return this.dataIdx;
    }
    /**
     */
    set dataIndex(step){
        this.dataIdx = step;
    }
    
    /**
     * 修改运行方向
     */
    changeDirection(direction){
        this.reversed = direction;
    }

    /**
     * 停止动画
     */
    pauseAnimation(pas){
        this.pause = pas;
    }

    /**
     * setTimeout 实习setTimeInterval
     * @param {*} fn 
     * @param {*} delay 
     * @returns 
     */
    _interval(fn, delay) {
        if (delay == null) {
            delay = this.drawDuration;
        }
        let timerId;
    
        let callback = () => {
            // 停止后就不再运行了
            if(this.pause){
                timerId = setTimeout(callback, delay);
                return;
            }
            if(this.limitCount > this.dataIdx || !this.useLimit){
                fn(this.dataIndex);
                timerId = setTimeout(callback, delay);
            } else {
                clearTimeout(timerId);
            }
            
        };
        timerId = setTimeout(callback, delay);
        return {
            clear:() => clearTimeout(timerId),
        };
    }
    /**
     * 运行动画
     */
    runAnimation(fn){
        this.drawLinenAction(fn);
    }

    drawLinenAction(fn){
        const clear_interval = this._interval(fn);
        return clear_interval;
    }
}