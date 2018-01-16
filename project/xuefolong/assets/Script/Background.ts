const {ccclass, property} = cc._decorator;

import GS from './common/GameState';

@ccclass
export default class BackgroundSprite extends cc.Component {

    // 游戏背景速度
    private speed: number = 0;

    // 加速度
    private accelerateSpeed: number = 0;

    // 屏幕节数，屏幕播放过次数，决定游戏时间长度
    private time: number = 0;

    // 当前游戏所经过的节数
    private useTime: number = 0;

    // 场景宽度
    private sceneWidth: number = 0;

   

    public init (speed: number, accelerateSpeed: number, time: number, sceneWidth: number) {
        this.speed = speed;
        this.time = time;
        this.accelerateSpeed = accelerateSpeed;
        this.sceneWidth = sceneWidth;
    }

    public update (dt) {
        // 如果游戏结束
        if(this.useTime == this.time) {
            let canvasWidth = Math.floor(this.sceneWidth) / 2;
            this.node.dispatchEvent(new cc.Event.EventCustom('eventGameOver', true));
            this.enabled = false;
        } else if(this.useTime < this.time) {
            let canvasWidth = Math.floor(this.sceneWidth) / 2;
            if(this.node.x < - Math.floor(this.node.width * this.node.scaleX)/2 - canvasWidth) {
                this.node.x = - canvasWidth - this.speed * dt * (GS.isAccelerate ? this.accelerateSpeed : 1) -1;
                this.useTime ++;
            } else {
                if(GS.isAccelerate) {
                    this.node.x -= this.speed * dt * this.accelerateSpeed;
                } else {
                    this.node.x -= this.speed * dt;
                }
            }
        }
    }
}
