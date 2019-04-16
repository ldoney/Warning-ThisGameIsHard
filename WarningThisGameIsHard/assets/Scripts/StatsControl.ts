import { Helpers } from "./Objects/Helpers";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialControl extends cc.Component {
    start () {
        if(localStorage.getItem("userData") != null)
        {
            Helpers.user = JSON.parse(localStorage.getItem("userData"));
            this.node.getChildByName("Avg").getComponent(cc.Label).string = "Average: " + (Helpers.user.TotalTime / Helpers.user.Count).toFixed(2);
            this.node.getChildByName("Best").getComponent(cc.Label).string = "Best: " + (Helpers.user.HighScore).toFixed(2);
            this.node.getChildByName("Plays").getComponent(cc.Label).string = "Games: " + (Helpers.user.Count);
            this.node.getChildByName("NetWorth").getComponent(cc.Label).string = "Total Coins: $" + (Helpers.user.NetWorth);
            this.node.getChildByName("SkinCnt").getComponent(cc.Label).string = "Skins: " + (Helpers.skins.totalSkins) + "/15";
        }else
        {
            localStorage.setItem("userData", JSON.stringify(Helpers.user));
        }
        Helpers.scheme.loadColors(this.node);
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.returnToMenu(this.node)}, this)
        }
}
