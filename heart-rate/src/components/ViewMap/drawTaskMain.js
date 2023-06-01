import * as d3 from "d3";

export default class DrawTaskMainController {
    constructor({
        ctx,
        data,
        MoveStep,
        gridTool,
        DrawTool,
        canvasSize,
        backAnimationController,
        drawActionController,
    }){
        this.ctx = ctx;
        this.data = data;
        this.MoveStep = MoveStep;
        this.gridTool = gridTool;
        this.DrawTool = DrawTool;
        this.canvasSize = canvasSize;
        this.drawActionController = drawActionController;
        this.backAnimationController = backAnimationController;
        this.signalStepCount = canvasSize.width / MoveStep;
    }

    run(){
        this.runDrawLine();
        this.runMoveGrid();
    }


    /**
     * 运行绘制心电图
     */
    runDrawLine(){
        this.drawActionController.runAnimation(
            (index) => {
                // 将每次的都画完，然后接下一个
                this.DrawTool.drawHeartLine(this.ctx, this.canvasSize.height, this.data[index]);
                if(this.isChangeDrawMap(index)){
                        this.CreateCanvasElement(
                            this.canvasSize.width,
                            this.canvasSize.height,
                        );
                    this.DrawTool.initNewAnimation();
                    this.DrawTool.drawHeartLine(this.ctx, this.canvasSize.height, this.data[index]);
                }
            }
        );
    }

    /**
     * 运行移动canvas
     */
    runMoveGrid(){
        const {backAnimationController} = this;
        backAnimationController.runAnimation(
            (index) => {
                
                d3.selectAll(".heart-map-item")
                    // .transition(100)
                    .style('left', this.getBackLeft(index) + "px")
                    .style("transition", `all linear 0.1s`);
            }
        );
    }

    /**
     * 返回判断是否需要切换绘制的图
     * @param {*} index 
     * @returns 
     */
    isChangeDrawMap(index){
        return index !=1 && index % this.signalStepCount == 1;
    }

    /**
     * 获得每次移动的left
     * @param {*} index 
     * @returns 
     */
    getBackLeft(index){
        if(index!=0 && (index * this.MoveStep) % this.canvasSize.width == 0){
            return -this.canvasSize.width;
        } else
            return - (index * this.MoveStep) % this.canvasSize.width + 0;
    }

    /**
     * 创建一个新的canvas画布
     * @param {*} width 
     * @param {*} height 
     */
    CreateCanvasElement(width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.classList = ["heart-map-item"];
        canvas.style.transition = "none";
        console.dir(d3.selectAll(".heart-map-item"));
        const preElement = d3.selectAll(".heart-map-item")._groups[0][1];
        d3.select(preElement)
            .style("transition", `all linear 1000000s`)
            .style("position", "absolute")
            .style("left", "0px");
        
        this.say("dasda");

        this.deleteElements();
        d3.selectAll(".heart-map-item")
            .style('position', "relative")
            .style('left', "0px")
            .style("transition", `none`);
        document.querySelector(".heart-map-item-wrap").appendChild(canvas);
        this.ctx = canvas.getContext('2d');         //更新新的绘画对象
        this.ctx.translate(0.5,0.5);
        this.ctx.save();
        this.gridTool.drawAllGrid(this.ctx);
    }

    /**
     * 删除第一个 .heart-map-item
     */
    deleteElements(){
        const element = document.querySelector(".heart-map-item");
        element.remove();
    }
    say(){

    }
    
}

