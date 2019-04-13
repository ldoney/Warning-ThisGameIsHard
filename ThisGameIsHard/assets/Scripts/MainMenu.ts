import {ColorScheme} from "./Objects/ColorScheme"
import {Helpers} from "./Objects/Helpers"
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Helpers.checkForDBUpdates();
        
        Helpers.setUpAll();
        Helpers.scheme.loadColors(this.node);
        this.node.getChildByName("Stats").on('touchstart', function() { Helpers.switchScenes("Stats",this.node)}, this)
        this.node.getChildByName("Tutorial").on('touchstart', function() { Helpers.switchScenes("Tutorial",this.node)}, this)
        this.node.getChildByName("Customize").on('touchstart', function() { Helpers.switchScenes("Shop",this.node)}, this)
        this.node.getChildByName("Play").on('touchstart', function() { Helpers.switchScenes("PlayScene",this.node)}, this)
    }
    start () {
        this.node.getChildByName("HighScore").getComponent(cc.Label).string = "High Score: " + Helpers.user.HighScore.toFixed(2);
        this.node.getChildByName("Coins").getComponent(cc.Label).string = "Coins: " + Helpers.user.Coins;
    }
}
