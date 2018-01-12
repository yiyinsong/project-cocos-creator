const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Game extends cc.Component {
    
    @property(cc.Node)
    nodeBackground: cc.Node = null;

    public onLoad() {
        this.nodeBackground.getComponent('BackgroundSprite').nodeGame = this;
    }
}
