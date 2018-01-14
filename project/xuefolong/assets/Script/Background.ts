const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroundSprite extends cc.Component {
    //游戏背景速度
    @property
    public gameSpeed: number = 0;
    
    //main场景
    public nodeGame: cc.Canvas;
   

    public onLoad () {
        
    }

    public update (dt) {
        let canvasWidth = Math.floor(this.nodeGame.node.width) / 2;
        if(this.node.x < - Math.floor(this.node.width * this.node.scaleX)/2 - canvasWidth) {
            this.node.x = - canvasWidth - this.gameSpeed * dt -1;
        } else {
            this.node.x -= this.gameSpeed * dt;
        }
    }
}
