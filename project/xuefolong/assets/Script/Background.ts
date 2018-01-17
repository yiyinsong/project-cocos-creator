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

    // 场景宽度
    private sceneWidth: number = 0;

   

    public init (speed: number, accelerateSpeed: number, sceneWidth: number) {
        this.speed = speed;
        this.accelerateSpeed = accelerateSpeed;
        this.sceneWidth = sceneWidth;
    }

    public update (dt) {
        // 如果游戏结束
        let canvasWidth = Math.floor(this.sceneWidth) / 2;
        if(GS.useTime == GS.duration) {
            if(this.node.x > - Math.floor(this.node.width * this.node.scaleX) + canvasWidth) {
                if(GS.isAccelerate) {
                    this.node.x -= this.speed * dt * this.accelerateSpeed;
                } else {
                    this.node.x -= this.speed * dt;
                }
            } else {
                this.node.dispatchEvent(new cc.Event.EventCustom('eventGameOver', true));
                this.enabled = false;
            }
        } else if(GS.useTime < GS.duration) {
            if(this.node.x < - Math.floor(this.node.width * this.node.scaleX)/3 - canvasWidth) {
                this.node.x = - canvasWidth - this.speed * dt * (GS.isAccelerate ? this.accelerateSpeed : 1) -1;
                GS.useTime ++;
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
