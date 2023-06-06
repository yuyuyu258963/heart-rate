// import * as d3 from "d3";

export default class GridDraw {
    /**
     * GridDraw w网格绘制工具
     * @param {number} mapWidth 
     * @param {number} mapHeight 
     * @param {string} smallGridColor 
     * @param {string} bigGridColor 
     * @param {number} gridWidth 
     * @param {number} smallGridStep 
     * @param {number} bigGridStep 
     */
    constructor(
        mapWidth,
        mapHeight,
        gridWidth=1,
        xPadding=0,
        smallGridColor='#023e7d', // #f1dedf
        bigGridColor='rgb(0,10,37)',
        smallGridStep=50,
        bigGridStep=100,
    ){
        // console.log('Init Grid Tool');
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.xPadding = xPadding;
        this.gridWidth = gridWidth;
        this.bigGridStep = bigGridStep;
        this.smallGridStep = smallGridStep;
        this.bigGridColor = bigGridColor;
        this.smallGridColor = smallGridColor;
    }
    /**
     * 绘制小间隔
     * @param {*} ctx 
     */
    drawSmallGrid(ctx){
        const smallStep = this.smallGridStep;
        ctx.strokeStyle = this.smallGridColor;
        ctx.lineWidth = this.lineWidth;
        const width = this.mapWidth;
        const height = this.mapHeight;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = this.smallGridColor;
        // ctx.strokeStyle = "red";
        // ctx.strokeStyle = ;
        //画竖线
        for(let x = 0; x <= width; x += smallStep ){
            //每次从新定位一下从哪里开始画，x轴每次变化y轴始终是0
            ctx.moveTo(x,0);
            //每次画整个画布高的线
            ctx.lineTo(x,height);
            ctx.stroke();
        }
        //横线同理
        for(let y = 0; y <= height; y += smallStep ){
            ctx.moveTo(0,y);
            ctx.lineTo(width,y);
            ctx.stroke();
        }
        // ctx.closePath();
        ctx.restore();
    }
    /**
     * 绘制大间隔网格
     * @param {*} ctx 
     */
    drawBigGrid(ctx){
        const bigStep = this.bigGridStep;
        const width = this.mapWidth;
        const height = this.mapHeight;

        ctx.beginPath();
        ctx.lineWidth = this.gridWidth;
        ctx.strokeStyle = this.bigGridColor;
        ctx.save();
        //唯一不一样的就是颜色和间隔
        for(let x = 0; x <= width; x += bigStep * 4){
            ctx.moveTo(x,0);
            ctx.lineTo(x,height);
            ctx.stroke();
        }
        for(let y = 0; y <= height; y += bigStep * 2){
            ctx.moveTo(0,y);
            ctx.lineTo(width,y);
            ctx.stroke();
        }
        ctx.closePath();
        ctx.restore();
    }

    drawAllGrid(ctx){
        this.drawSmallGrid(ctx);
        // this.drawBigGrid(ctx);
    }
}