const {ccclass, property} = cc._decorator;

@ccclass
export default class OilLayout extends cc.Component {
    
    //油桶速度
    @property
    public oilSpeed: number = 0;

    //油桶prefab
    @property(cc.Prefab)
    public oilPrefab: cc.Prefab = null;
    //控制油桶总数量
    @property
    public oilNumber: number = 0;

    //Game场景
    public nodeGame: any;
    //油桶对象池
    private oilPool: cc.NodePool;

    onLoad() {
        //初始化对象池，并生成oilNumber个油桶
        this.oilPool = new cc.NodePool('Oil'); 
        
        for (let i = 0; i < this.oilNumber; ++i) {
            let oil = cc.instantiate(this.oilPrefab);
            this.oilPool.put(oil);
        }
    }
    /**
     * 生成oilNumber个油桶，放置于当前容器
     * @method init
     * @return null
     */
    public init() {
        for(let i = 0; i< this.oilNumber; ++i) {
            this.createOil(this.node);
        }
    }
    /**
     * 传入一个父容器/父节点，并获取一个新油桶
     * @private
     * @param {any} parentNode 
     * @return null
     */
    private createOil(parentNode) {
        let oil = null;
        if (this.oilPool.size() > 0) {
            oil = this.oilPool.get();
        } else {
            oil = cc.instantiate(this.oilPrefab);
            oil.addComponent('Oil');
        }
        oil.parent = parentNode;
        oil.getComponent('Oil').oilLayout = this;
        oil.getComponent('Oil').init(parentNode.width-20, 150, this.oilSpeed);
    }
    /**
     * 传递加速指令
     * @method accelerate
     * @param {any} oil 油桶节点
     * @return nkull
     */
    public accelerate(oil) {
        this.nodeGame.nodeBackground.getComponent('Background').startAccelerate();
        this.nodeGame.nodeCar.getChildByName('fire').getComponent('Fire').playAnimation(true);
        this.onOilKilled(oil);
    }
    /**
     * 回收油桶并生成一个新油桶
     * @method onOilKilled
     * @param {any} oil 油桶节点
     * @return null
     */
    public onOilKilled(oil) {
        this.oilPool.put(oil);
        this.createOil(this.node);
    }
}
