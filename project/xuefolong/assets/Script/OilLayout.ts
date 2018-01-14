const {ccclass, property} = cc._decorator;

import OilHandler from './OilHandler';

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
    //油桶对象池
    private oilPool: cc.NodePool;

    onLoad() {
        this.oilPool = new cc.NodePool(OilHandler);
        
        for (let i = 0; i < this.oilNumber; ++i) {
            let oil = cc.instantiate(this.oilPrefab);
            this.oilPool.put(oil);
        }

        for(let i = 0; i< this.oilNumber; ++i) {
            this.createOil(this.node);
        }
    }

    private createOil(parentNode) {
        console.log(this.oilPool.size());
        let oil = null;
        if (this.oilPool.size() > 0) {
            oil = this.oilPool.get();
        } else {
            oil = cc.instantiate(this.oilPrefab);
            oil.addComponent(OilHandler);
        }
        oil.getComponent('Oil').oilLayout = this;
        oil.getComponent('Oil').init(parentNode.width-20, 150, this.oilSpeed);
        oil.parent = parentNode;
    }

    public onOilKilled(oil) {
        this.oilPool.put(oil);
        this.createOil(this.node);
    }
}
