const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Game extends cc.Component {
    
    @property(cc.Node)
    nodeBackground: cc.Node = null;
    
    @property(cc.Node)
    nodeOilLayout: cc.Node = null;

    public onLoad() {
        this.nodeBackground.getComponent('Background').nodeGame = this;

        const _oilLayout = this.nodeOilLayout.getComponent('OilLayout');
        _oilLayout.nodeGame = this;
        _oilLayout.init();
        
    }
    public start() {
    }
}
