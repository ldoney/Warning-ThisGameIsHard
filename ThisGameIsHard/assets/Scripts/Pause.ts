const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchstart', this.onPauseTouchEvent, this);
    }

    onPauseTouchEvent(e)
    {
        var Game = this.node.parent.getComponent("Game");
        if(Game.inSession)
        {
            Game.pause();
        }
        else
        {
            Game.unpause();
        }
    }
}
