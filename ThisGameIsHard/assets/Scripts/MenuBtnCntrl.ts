const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart', this.onClickTouchEvent, this);
    }

    onClickTouchEvent(e)
    {
        var Game = this.node.parent.getComponent("Game");
        Game.menu();
    }

    // update (dt) {}
}
