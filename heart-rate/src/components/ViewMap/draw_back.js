import * as d3 from "d3";
import GridDraw from "./draw_grid";
/**
 * 绘制图形的类
 */
// eslint-disable-next-line no-unused-vars
class drawTools {
    constructor(
        step=5,
        limit=2/3,
        yScale=1/4,
        yStartPositions=1/4,
        lineWidth=1,
        warningLineColor="#f53f3f",
        normalLineColor="#1e80ff",
    ){
        this.nodeIndex = 0;                         //当前绘制结点的索引
        this.preNode = null;                        //记录前一个节点
        this.step = step;                    //每个数据的时间间隔
        this.limit = limit;                 //上限站画布的比例
        this.yScale = yScale;               //总坐标高度的比例尺
        this.lineWidth = lineWidth;         //线的宽度
        this.yStartPositions = yStartPositions;     //起始绘制的高度
        this.warningLineColor = warningLineColor;   //异常线的颜色
        this.normalLineColor = normalLineColor;     //正常线的颜色
        this.historyNodes = [];                     //已经绘制的节点位置
        console.log("Starting drawTools Tools");
    }

    /**
     * 绘制一个点的数据
     * 将之前的绘制结点记录下来
     * @param {*} point 
     */
    push_data(point) {
        this.nodeIndex++;
        this.historyNodes.push(this.preNode);
        this.preNode = point;
    }
    /**
     * 
     * @param {*} ctx 
     * @param {*} width 
     * @param {*} height 
     * @param {*} point [0] 索引 [1] 前一个y [2]当前y 
     */
    drawLine(ctx,height, point){
        ctx.lineCap = 'round';
        ctx.save();
        point[1] *= this.yScale; 
        point[2] *= this.yScale; 

        const lineWidth = 1;
        const step = this.step;
        const yLimit = height / 2 * this.limit * this.yScale ;
        
        ctx.beginPath();
        const startPointY = height * this.yStartPositions;
        ctx.strokeStyle = this.normalLineColor;
        ctx.lineWidth = lineWidth;
        if (point[0] === 0) {
            ctx.moveTo(0, startPointY);
        } else {
        //否则就移动到上一次画的位置
            ctx.moveTo((point[0] - 1) * step, startPointY + point[1]);
        }
        
        if (point[1] > yLimit && point[2] > yLimit) {
            // 两个都大于最大界限
            ctx.strokeStyle = this.warningLineColor;
            ctx.lineWidth = lineWidth;
            ctx.lineTo(point[0] * 5, startPointY + point[2]);
            ctx.stroke();

        } else if (point[1] > yLimit && point[2] < yLimit){
            // 第一个超过最大界限
            // 另外一个小于最小界限
            ctx.strokeStyle = this.warningLineColor;
            ctx.lineWidth = lineWidth;
            let x;
            x = point[0] * step - step + step * (point[1] - yLimit) / (point[1] - point[2]);
            ctx.lineTo(x, startPointY + yLimit);
            ctx.stroke();

            if (point[2] > -yLimit){
                ctx.beginPath();
                ctx.moveTo(x, startPointY + yLimit);
                ctx.strokeStyle = this.normalLineColor;
                ctx.lineWidth = lineWidth;
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(x, startPointY + yLimit);
                ctx.strokeStyle = this.normalLineColor;
                ctx.lineWidth = lineWidth;
                x = point[0] * step - step + step * (point[1] + yLimit) / (point[1] - point[2]);
                ctx.lineTo(x, startPointY + -yLimit);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x, startPointY + -yLimit);
                ctx.strokeStyle = this.warningLineColor;
                ctx.lineWidth = lineWidth;
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
            }
            

        } else if (point[1] < yLimit && point[2] > yLimit) {
            // 第一个小于最大界限
            // 另一个大于最大界限
            // 一些问题
            let x;
            if (point[1] > -yLimit){
                ctx.lineWidth = lineWidth;
                x = point[0] * step - step + step * (yLimit - point[1]) / ( point[2] - point[1]);
                ctx.lineTo(x, startPointY + yLimit);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = this.warningLineColor;
                ctx.moveTo(x, startPointY + yLimit);
                ctx.lineTo(point[0] * step, startPointY + point[2]);

            } else {
                ctx.strokeStyle = this.warningLineColor;
                x = point[0] * step - step + step * (-yLimit - point[1]) / ( point[2] - point[1]);
                ctx.lineTo(x, startPointY - yLimit);
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = this.normalLineColor;
                ctx.moveTo(x, startPointY - yLimit);
                x = point[0] * step - step + step * (yLimit - point[1]) / ( point[2] - point[1]);
                ctx.lineTo(x, startPointY + yLimit);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.strokeStyle = this.warningLineColor;
                ctx.moveTo(x, startPointY + yLimit);
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
                
            }
            

            ctx.beginPath();
            ctx.moveTo(x, startPointY + yLimit);
            ctx.strokeStyle = this.warningLineColor;
            ctx.lineWidth = lineWidth;

            ctx.lineTo(point[0] * step, startPointY + point[2]);
            ctx.stroke();
        } else {
            // 两个都小于最大界限
            if(point[1] < -yLimit && point[2] < -yLimit){
                ctx.strokeStyle = this.warningLineColor;
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
            } else if (point[1] > -yLimit && point[2] < -yLimit){
                let x;
                x = step * point[0] - step + step * (point[1] + yLimit) / (point[1] - point[2])
                ctx.lineTo(x, startPointY - yLimit);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.strokeStyle = this.warningLineColor;
                ctx.moveTo(x, startPointY -yLimit);
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
                
            } else if(point[2] > -yLimit && point[1] < -yLimit) {
                ctx.strokeStyle = this.warningLineColor;
                let x;
                x = step * point[0] - step + step * (-point[1] - yLimit) / (-point[1] + point[2]);
                ctx.lineTo(x, startPointY - yLimit);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.strokeStyle = this.normalLineColor;
                ctx.moveTo(x, startPointY -yLimit);
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();

            } else if (point[2] > -yLimit && point[1] > -yLimit){
                ctx.strokeStyle = this.normalLineColor;
                ctx.lineTo(point[0] * step, startPointY + point[2]);
                ctx.stroke();
            }
            
            
            
        }

        ctx.restore();
    }

    /**
     * 绘制出心跳图的线
     * @param {*} ctx 
     * @param {*} height 
     * @param {*} point  节点的y坐标
     * @returns 
     */
    drawHeartLine(ctx, height, point){
        // point = point * this.yScale;
        if (this.nodeIndex==0) {
            this.nodeIndex++;
            this.preNode = point;
            return ;
        }
        this.drawLine(ctx, height, [
            this.nodeIndex,
            this.preNode,
            point
        ]);
        this.nodeIndex++;
        this.preNode = point;
    }
}

/**
 * 设置颜色比例尺
 * @param {*} data 
 * @param {*} height 
 * @returns 
 */
const ScaleHandler =(data, height) => {
    const normolizeLinear = d3.scaleLinear()
				.domain([d3.min(data), d3.max(data)])
				.range([0,1]);
    
    const Ylinear = d3.scaleLinear()
                        .domain([d3.min(data), d3.max(data)])
                        .range([-height/2, height/2]);

    var a = d3.rgb(255,0,0);	//红色
    var b = d3.rgb(0,255,0);	//绿色
        
    var compute = d3.interpolate(a,b);
    
    const colorLinear = (d) => compute(normolizeLinear(d));

    return {
        normolizeLinear,
        Ylinear,
        colorLinear,
    };
};


/**
 * 执行绘制任务
 */
function drawBackground(canvasBody, ctxSize) {
    //加一个判断，如果不支持canvas也不至于报错
    let data = [0];
    for (let index = 0; index < 300; index++) {
        data.push(Math.random() * 20);
    }
    if (!canvasBody.getContext) {
        console.log("err");
    }
    const ctx = canvasBody.getContext('2d');
    // 更加清晰
    ctx.translate(0.5,0.5);
    ctx.save();
    let [width, height] = [ctxSize.ctxWidth, ctxSize.ctxHeight];

    const {Ylinear:scaller, } = ScaleHandler(data, height);
    
    for (let index = 0; index < data.length; index++) {
        data[index] = scaller(data[index]);
        
    }
    const gridTool = new GridDraw(width,height);
    const myDrawTool = new drawTools();
    gridTool.drawAllGrid(ctx);

    for (let index = 0; index < data.length; index++) {
        if(index < 50){
            myDrawTool.drawHeartLine(ctx, height, data[index]);
        } else
        setTimeout(() => {
            myDrawTool.drawHeartLine(ctx, height, data[index]);
        }, 200 * (index - 50));
    }

    for(let i = 0; i < data.length; i++) {
        setTimeout(() => {
            d3.select(canvasBody)
                .transition(200)
                .style('left', - i * 5 + "px")
                .style("transition", `all linear 0.2s`);
            
        }, 200 * i);
    }

}

// function getMockData(length=100) {
//     let data = [0];
    

//     return data;
// }


export {
    drawBackground
};