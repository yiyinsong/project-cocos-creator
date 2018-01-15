const {ccclass, property} = cc._decorator;

@ccclass
export default class Oil extends cc.Component {
    
    // 记录当前节点父容器
    public oilLayout: any;
    
    // 油桶速度
    private speed: number = 0;

    // 控制是否加速
    private isAccelerate: boolean = false;

    public onLoad() {
        this.node.on('accelerateStart', () => {
            this.isAccelerate = true;
        });
        this.node.on('accelerateEnd', () => {
            this.isAccelerate = false;
        });
    }

    /**
     * 初始化单个油桶
     * @param {number} w 初始化横向坐标宽度范围
     * @param {number} h 初始化纵向坐标高度范围
     * @param {number} speed 油桶速度
     * @return null
     */
    public init(w: number, h: number, speed: number) {
        this.node.scale = 0.3 + cc.random0To1() * 0.6;
        this.node.x = cc.random0To1() * w + w;
        this.node.y = cc.random0To1() * h;
        this.speed = speed;
    }

    public startAccelerate(b: boolean) {
        this.isAccelerate = b;
    }

    update (dt) {
        if(this.node.x < -this.node.width*this.node.scaleX) {
            this.oilLayout.onOilKilled(this.node);
        } else {
            if(this.isAccelerate) {
                this.node.x -= this.speed * dt * 1.5;
            } else {
                this.node.x -= this.speed * dt;
            }
        }
    }
    /**
     * 当对象池回收prefab时，自动调用unuse方法，取消事件侦听
     * @method unuse
     * @return null
     */
    public unuse() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect, this);
    }
    /**
     * 当对象池获取prefab时，自动调用reuse方法，添加事件侦听
     * @method reuse
     * @return null
     */
    public reuse() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect, this);
    }
    /**
     * 当前对象触摸处理
     * @private
     * @method onSelect
     * @return null
     */
    private onSelect() {
        this.oilLayout.accelerate(this.node);
    }
}
