const {ccclass, property} = cc._decorator;

@ccclass
export default class Wheel extends cc.Component {
    
    @property
    public rotateDuration: number = 0;


    public onLoad () {
        const rotateAction = this.setRotationAction();
        this.node.runAction(rotateAction);
    }

    private setRotationAction(): cc.ActionInterval {
        const wheelRotate = cc.rotateBy(this.rotateDuration, 360);
        return cc.repeatForever(wheelRotate);
    }
}
