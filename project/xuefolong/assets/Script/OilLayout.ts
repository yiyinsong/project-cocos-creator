const {ccclass, property} = cc._decorator;

import GS from './common/GameState';

@ccclass
export default class OilLayout extends cc.Component {
    
    //油桶prefab
    @property(cc.Prefab)
    private oilPrefab: cc.Prefab = null;

    // 油桶速度
    private speed: number = 0;

    // 油桶加速度
    private accelerateSpeed: number = 0;

    //控制油桶总数量
    private oilNumber: number = 0;

    //油桶对象池
    private oilPool: cc.NodePool;

    /**
     * 生成oilNumber个油桶，放置于当前容器
     * @method init
     * @return null
     */
    public init(speed: number, accelerateSpeed: number, oilNumber: number) {
        this.speed = speed;
        this.accelerateSpeed = accelerateSpeed;
        this.oilNumber = oilNumber;
        
        //初始化对象池，并生成oilNumber个油桶
        this.oilPool = new cc.NodePool('Oil'); 
        for (let i = 0; i < this.oilNumber; ++i) {
            let oil = cc.instantiate(this.oilPrefab);
            this.oilPool.put(oil);
        }
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
        oil.getComponent('Oil').init(parentNode.width-20, 150, this.speed, this.accelerateSpeed);
    }
    /**
     * 回收油桶并生成一个新油桶
     * @method onOilKilled
     * @param {any} oil 油桶节点
     * @return null
     */
    public onOilKilled(oil) {
        this.oilPool.put(oil);
        !GS.over && this.createOil(this.node);
    }
}
