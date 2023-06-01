
export default class MapAnimationController {
    constructor(
        limitCount,
        drawDuration = 200,
        mapMoveDuration = 200,
    ){
        this.drawDuration = drawDuration;
        this.mapMoveDuration = mapMoveDuration;
        this.dataIdx = -1;
        this.limitCount = limitCount;
        this.runStep=5;
    }

    get dataIndex(){
        this.dataIdx++;
        return this.dataIdx;
    }
    /**
     */
    set dataIndex(step){
        this.dataIdx = step;
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
            if(this.limitCount > this.dataIdx){
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