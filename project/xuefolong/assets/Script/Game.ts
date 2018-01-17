const {ccclass, property, executionOrder} = cc._decorator;

import GS from './common/GameState';

@ccclass
@executionOrder(1)
export default class Game extends cc.Component {

    // 背景节点
    @property(cc.Node)
    public nodeBackground: cc.Node = null;

    // 油桶容器节点
    @property(cc.Node)
    public nodeOilLayout: cc.Node = null;

    // 汽车节点
    @property(cc.Node)
    public nodeCar: cc.Node = null;

    // 油桶个数
    @property
    public oilNumber: number = 0;

    // 游戏速度
    @property
    public speed: number = 0;

    // 加速度
    @property
    public accelerateSpeed: number = 0;

    // 游戏时间
    @property
    public time: number = 0;

    public onLoad() {
        // 绑定加速事件
        this.node.on('eventAccelerateStart', this.accelerateStartFn.bind(this));
        // 绑定游戏结束事件
        this.node.on('eventGameOver', this.gameOverFn.bind(this));

        GS.game = this;
        GS.duration = this.time;

        // 把主场景赋予背景节点
        const _background = this.nodeBackground.getComponent('Background');
        _background.init(this.speed, this.accelerateSpeed, this.node.width);
        // 把主场景赋予油桶容器节点，初始化油桶
        const _oilLayout = this.nodeOilLayout.getComponent('OilLayout');
        _oilLayout.init(this.speed, this.accelerateSpeed, this.oilNumber);
    }
    
    /**
     * 开始加速处理
     * @private
     * @method accelerateStartFn
     * @return null
     */
    private accelerateStartFn() {
        GS.isAccelerate = true;
        this.nodeCar.getChildByName('fire').getComponent('Fire').playAnimation(true);
        this.unschedule(this.accelerateFn);
        this.scheduleOnce(this.accelerateFn, 2);
    }

    /**
     * 加速结束回调
     * @private
     * @method accelerateFn
     * @return null
     */
    private accelerateFn() {
        GS.isAccelerate = false;
        this.nodeCar.getChildByName('fire').getComponent('Fire').playAnimation(false);
    }

    /**
     * 游戏结束处理
     * @method gameOverFn
     * @private
     * @return null
     */
    private gameOverFn() {
        GS.over = true;
        const carMoveAction = cc.moveBy(2, cc.p(this.node.width * .8 - this.nodeCar.width, 0));
        const callBackAction = cc.callFunc(this.stopWheel, this);
        this.nodeCar.runAction(cc.sequence(carMoveAction, callBackAction));
    }
    /**
     * 停止轮子转动
     * @method stopWheel
     * @private
     * @return null
     */
    private stopWheel() {
        this.nodeCar.children.forEach((v, k) => {
            if(v.name === 'wheel') {
                v.stopAllActions();
                this.nodeCar.getChildByName('fire').getComponent('Fire').playAnimation(false);
            }
        });
    }
}
