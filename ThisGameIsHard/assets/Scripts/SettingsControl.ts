const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    user =
    {
        HighScore: 0.00,
        Count:0,
        Coins:0,
        TotalTime:0.00,
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
