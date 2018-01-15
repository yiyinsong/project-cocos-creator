const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroundSprite extends cc.Component {
    // 游戏背景速度
    @property
    public gameSpeed: number = 0;
    
    // main场景
    public nodeGame: any;

    // 控制加速变量
    public isAccelerate: boolean = false;

    // 屏幕节数，屏幕播放过次数，决定游戏时间长度
    public gameTime: number = 0;

    // 当前游戏所经过的节数
    private useTime: number = 0;

   

    public onLoad () {
        
    }
    /**
     * 定时加速
     * @method startAccelerate
     * @return null
     */
    public startAccelerate() {
        this.unschedule(this.accelerateHandler);
        this.isAccelerate = true;
        this.scheduleOnce(this.accelerateHandler, 2);
        this.nodeGame.dispatchAccelerateStartEvent();
    }
    /**
     * 设置加速关闭
     * @method accelerateHandler
     * @private
     * @return null
     */
    private accelerateHandler() {
        this.isAccelerate = false;
        this.nodeGame.nodeCar.getChildByName('fire').getComponent('Fire').playAnimation(false);
        this.nodeGame.dispatchAccelerateEndEvent();
    }

    public update (dt) {
        // 如果游戏结束
        if(this.useTime == this.gameTime) {
            let canvasWidth = Math.floor(this.nodeGame.node.width) / 2;
            
        } else if(this.useTime < this.gameTime) {
            let canvasWidth = Math.floor(this.nodeGame.node.width) / 2;
            if(this.node.x < - Math.floor(this.node.width * this.node.scaleX)/2 - canvasWidth) {
                this.node.x = - canvasWidth - this.gameSpeed * dt -1;
                this.useTime ++;
            } else {
                if(this.isAccelerate) {
                    this.node.x -= this.gameSpeed * dt * 1.5;
                } else {
                    this.node.x -= this.gameSpeed * dt;
                }
            }
        }
    }
}
