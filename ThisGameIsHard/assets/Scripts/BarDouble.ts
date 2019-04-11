const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    update (dt) {
        var othr_bar = this.node.parent.getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.node.getComponent(cc.ProgressBar).progress = othr_bar.progress;
        this.node.getChildByName("bar").color = this.node.color;
    }
}
