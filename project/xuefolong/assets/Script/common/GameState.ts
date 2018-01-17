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
    public static useTime: number = 0;
    public static duration: number = 0;
    public static reset() {
        this.game = null;
        this.isAccelerate = false;
        this.over = false;
        this.duration = 0;
    }
}

export default GS;