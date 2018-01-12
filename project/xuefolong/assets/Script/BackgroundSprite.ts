const {ccclass, property} = cc._decorator;

@ccclass
export default class BackgroundSprite extends cc.Component {

    @property
    public gameSpeed: number = 0;

    @property(cc.Prefab)
    public oilPrefab: cc.Prefab = null;

    public nodeGame: cc.Canvas;

    private oilPool: cc.NodePool;

    public onLoad () {
        this.oilPool = new cc.NodePool();
        let initCount = 5;
        for (let i = 0; i < initCount; ++i) {
            let oil = cc.instantiate(this.oilPrefab);
            this.oilPool.put(oil);
        }
    }

    private createOil(parentNode) {
        let oil = null;
        if (this.oilPool.size() > 0) {
            oil = this.oilPool.get();
        } else {
            oil = cc.instantiate(this.oilPrefab);
        }
        oil.parent = parentNode; 
        oil.getComponent('Oil').init();
    }

    private onOilKilled(oil) {
        this.enemyPool.put(oil);
    }

    public update (dt) {
        this.createOil(this.node);
        let canvasWidth = Math.floor(this.nodeGame.node.width) / 2;
        if(this.node.x < - Math.floor(this.node.width * this.node.scaleX)/2 - canvasWidth) {
            this.node.x = - canvasWidth - this.gameSpeed * dt -1;
        } else {
            this.node.x -= this.gameSpeed * dt;
        }
    }
}
