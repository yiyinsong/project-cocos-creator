/**
 * @interface GSInterface
 * @attribute isAccelerate 是否处于加速状态中
 */
interface GSInterface {

}

class GS implements GSInterface {
    public static game: cc.Component = null;
    public static isAccelerate: boolean = false;
    public static over: boolean = false;
    public static reset() {
        this.game = null;
        this.isAccelerate = false;
        this.over = false;
    }
}

export default GS;