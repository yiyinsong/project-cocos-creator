const {ccclass, property} = cc._decorator;

@ccclass
export default class Wheel extends cc.Component {
    
    //轮子滚动一圈所持续时间，决定轮子滚动速度
    @property
    public rotateDuration: number = 0;


    public onLoad () {
        const rotateAction = this.setRotationAction();
        this.node.runAction(rotateAction);
    }
    /**
     * 设置轮子滚动动画
     * @private
     * @method setRotationAction
     * @returns {cc.ActionInterval} 
     */
    private setRotationAction(): cc.ActionInterval {
        const wheelRotate = cc.rotateBy(this.rotateDuration, 360);
        return cc.repeatForever(wheelRotate);
    }
}
