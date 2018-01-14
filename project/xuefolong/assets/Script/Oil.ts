const {ccclass, property} = cc._decorator;

@ccclass
export default class Oil extends cc.Component {
    
    public oilLayout: any;

    private speed: number = 0;


    public init(w: number, h: number, speed: number) {
        this.node.scale = 0.3 + cc.random0To1() * 0.6;
        this.node.x = cc.random0To1() * w + w;
        this.node.y = cc.random0To1() * h;
        this.speed = speed;
    }

    update (dt) {
        if(this.node.x < -this.node.width*this.node.scaleX) {
            this.oilLayout.onOilKilled();
            this.node.destroy();
        } else {
            this.node.x -= this.speed * dt;
        }
    }
}
