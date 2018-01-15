const {ccclass, property, executionOrder} = cc._decorator;

@ccclass
@executionOrder(1)
export default class Game extends cc.Component {
    // 背景节点
    @property(cc.Node)
    nodeBackground: cc.Node = null;
    // 油桶容器节点
    @property(cc.Node)
    nodeOilLayout: cc.Node = null;
    // 汽车节点
    @property(cc.Node)
    nodeCar: cc.Node = null;

    @property
    gameTime: number = 0;

    public onLoad() {
        // 把主场景赋予背景节点
        const _background = this.nodeBackground.getComponent('Background');
        _background.nodeGame = this;
        _background.gameTime = this.gameTime;
        // 把主场景赋予油桶容器节点，初始化油桶
        const _oilLayout = this.nodeOilLayout.getComponent('OilLayout');
        _oilLayout.nodeGame = this;
        _oilLayout.init();
        
    }
    /**
     * 广播开始加速事件
     * @method dispatchAccelerateStartEvent
     * @return null
     */
    public dispatchAccelerateStartEvent() {
        this.node.dispatchEvent( new cc.Event.EventCustom('accelerateStart', true) );
    }
    /**
     * 广播结束加速事件
     * @method dispatchAccelerateEndEvent
     * @return null
     */
    public dispatchAccelerateEndEvent() {
        this.node.dispatchEvent( new cc.Event.EventCustom('accelerateEnd', true) );
    }
}
