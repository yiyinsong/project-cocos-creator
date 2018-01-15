const {ccclass, property} = cc._decorator;

@ccclass
export default class Fire extends cc.Component {

    public onLoad() {
        this.node.active = false;
        const animState = this.getComponent(cc.Animation).play('fire');
        animState.wrapMode = cc.WrapMode.Loop;
    }
    /**
     * 显示隐藏播放动画
     * @param {boolean} state 是否显示当前节点
     * @method playAnimation
     * @return null
     */
    public playAnimation(state: boolean) {
        this.node.active = state;
    }

}
