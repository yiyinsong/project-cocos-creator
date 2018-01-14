export default class OilHandler extends cc.Component {

    public onLoad() {
        
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    }

    
    public unuse() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    }

    public reuse() {
        console.log(1000);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onSelect.bind(this), this.node);
    }

    private onSelect() {
        console.log(this.node.x);
    }
}
