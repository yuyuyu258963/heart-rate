import * as d3 from "d3";
import GridDraw from "./draw_grid";
import drawTools from "./draw_heartLine";
import MapAnimationController from "./mapAnimationController";
import DrawTaskMainController from "./drawTaskMain";


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
 * 获得模拟数据
 * @param {*} length 
 * @returns 
 */
function getMockData(ctxSize,length=240) {
    let data = [0];
    for (let index = 0; index < length; index++) {
        data.push(Math.random() * 20);
    }
    let height = ctxSize.ctxHeight;

    const {Ylinear:scaller, } = ScaleHandler(data, height);
    for (let index = 0; index < data.length; index++) {
        data[index] = scaller(data[index]);
    }
    return data;
}

/**
 * 清除所有图像
 * @param {*} ctx 
 * @param {*} width 
 * @param {*} height 
 */
function clearCanvas(ctx, width, height) {
    ctx.clearRect(0, 0, width, height);
}

/**
 * 执行绘制任务
 */
function drawBackground(canvasBody, ctxSize) {
    let data = getMockData(ctxSize);
    let [width, height] = [ctxSize.ctxWidth, ctxSize.ctxHeight];

    // const {Ylinear:scaller, } = ScaleHandler(data, height);
    // for (let index = 0; index < data.length; index++) {
    //     data[index] = scaller(data[index]);
    // }
    
    //加一个判断，如果不支持canvas也不至于报错
    if (!canvasBody.leftMap.getContext) {
        console.log("err");
        alert("Can't draw background");
        return ;
    }
    let ctx2 = canvasBody.leftMap.getContext('2d');
    const ctx = canvasBody.rightMap.getContext('2d');
    // 更加清晰
    ctx.translate(0.5,0.5);
    ctx.save();
    ctx2.translate(0.5,0.5);
    ctx2.save();
    
    
    const gridTool = new GridDraw(width,height);
    const gridTool_right = new GridDraw(width,height);
    const myDrawTool = new drawTools(5);
    const drawActionController = new MapAnimationController(480, 100);
    const backAnimationController = new MapAnimationController(240, 100);
    

    const mainController = new DrawTaskMainController({
        ctx,
        data,
        MoveStep:5,
        gridTool,
        DrawTool:myDrawTool,
        canvasSize:{width, height},
        backAnimationController,
        drawActionController,
    });
    mainController;
    
    
    gridTool.drawAllGrid(ctx);
    gridTool_right.drawAllGrid(ctx2);
    mainController.run();

    // drawActionController.runAnimation(
    //     (index) => {
    //         if(index !=0 && index % 120 == 0){
    //             deleteElements(canvasBody.leftMap);
    //             CreateCanvasElement(width, height);
    //             // myDrawTool.drawHeartLine(ctx, height, data[index]);
    //             // ctx = ctx2;
    //             // myDrawTool.nodeIndex = 0;
    //         }
    //         myDrawTool.drawHeartLine(ctx, height, data[index]);
    //     }
    // );

    // backAnimationController.runAnimation(
    //     (index) => {
    //         if(index!=0 && index%120 == 0){
    //             // changeViewSeq();
    //             d3.selectAll(".heart-map-item")
    //                 .style('left', "0px")
    //                 .style("transition", `none`);
    //         }
    //         d3.selectAll(".heart-map-item")
    //             .transition(200)
    //             .style('left', - (index % 120) * 5 + "px")
    //             .style("transition", `all linear 0.2s`);
    //     }
    // );
    clearCanvas;
}

export {
    drawBackground
};