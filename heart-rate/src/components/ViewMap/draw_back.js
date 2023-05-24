const drawTools = {
    //画小的表格背景
    // construct(){
    //     this.speed = 5;
    //     this.lineData = [];
    //     this.x = 0;
    //     this.y = 0;
    //     this.startX = 0;
    //     this.startY = 0;
    // },
    drawSmallGrid(ctx,width,height){
        //设置线条颜色
        // console.log("dasds")
        // ctx.strokeStyle = 'red';
        ctx.strokeStyle = '#f1dedf';
        //线条粗细
        ctx.lineWidth = 2;
        ctx.beginPath();
        //画竖线
        //循环一下，初始值为0，宽度为画布的宽度，每次走5个像素
        for(let x = 0; x <= width; x += 5){
            //每次从新定位一下从哪里开始画，x轴每次变化y轴始终是0
            ctx.moveTo(x,0);
            //每次画整个画布高的线
            ctx.lineTo(x,height);
            console.log(x,height);
            ctx.stroke();
        }
        //横线同理
        for(let y = 0; y <= height; y += 5){
            ctx.moveTo(0,y);
            ctx.lineTo(width,y);
            ctx.stroke();
        }
        ctx.closePath();
    },
    // 绘制大间隔的网格
    drawBigGrid(ctx,width,height){
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.strokeStyle = '#bedce2';
        //唯一不一样的就是颜色和间隔
        for(let x = 0; x <= width; x += 20){
            ctx.moveTo(x,0);
            ctx.lineTo(x,height);
            ctx.stroke();
        }
        for(let y = 0; y <= height; y += 20){
            ctx.moveTo(0,y);
            ctx.lineTo(width,y);
            ctx.stroke();
        }
        ctx.closePath();
    },
    drawHeartLine(ctx,width,height, point){
        ctx.beginPath();
        const startPointY = height / 2;
        // console.dir(height);
        // let startPointX = 0;
        ctx.strokeStyle = "green";
        ctx.lineWidth = 3;
        if (point[0] === 0) {
            ctx.moveTo(0, startPointY);
        } else {
        //否则就移动到上一次画的位置
            ctx.moveTo((point[0] - 1) * 5, startPointY + point[1]);
        }
        ctx.lineTo(point[0] * 5, startPointY + point[2]);
        ctx.stroke();
        ctx.closePath();
    }
    
    
}


function drawBackground(canvasBody, ctxSize) {
    //加一个判断，如果不支持canvas也不至于报错
    const data = [];
    for (let index = 0; index < 300; index++) {
        data.push(Math.random() * 20);
    }
    
    if (!canvasBody.getContext) {
        console.log("err");
    }

    let ctx = canvasBody.getContext('2d');
    ctx.translate(0.5,0.5);
    // const [height, width] = [canvasBody.clientHeight, canvasBody.clientWidth]
    let [width, height] = [ctxSize.ctxWidth, ctxSize.ctxHeight];
    console.dir([width, height])

    // drawTools.drawSmallGrid(ctx, width,height);
    // drawTools.drawBigGrid(ctx, width,height);

    for (let index = 1; index < data.length; index++) {
        setTimeout(() => {
            drawTools.drawHeartLine(ctx, width, height, [index, data[index-1], data[index]]);
        }, 100 * index);
    }

}



export {
    drawBackground
}