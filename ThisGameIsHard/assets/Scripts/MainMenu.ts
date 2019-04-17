import { Helpers } from "./Objects/Helpers";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Helpers.checkForDBUpdates();
        
        Helpers.setUpAll();
        Helpers.scheme.loadColors(this.node);
        
        this.node.getChildByName("Stats").on('touchstart', function() { Helpers.switchScenes("Stats",this.node)}, this)
        this.node.getChildByName("Settings").on('touchstart', function() { Helpers.switchScenes("Settings",this.node)}, this)
        this.node.getChildByName("Customize").on('touchstart', function() { Helpers.switchScenes("Shop",this.node)}, this)
        this.node.getChildByName("Play").on('touchstart', function() { Helpers.switchScenes("PlayScene",this.node)}, this)
        this.node.getChildByName("Change").on('touchstart', this.change, this)
        this.node.getChildByName("Palette").on('touchstart', function() { Helpers.switchScenes("PaletteEdit",this.node)}, this)
    }
    change()
    {
        Helpers.randomizeScheme();
        Helpers.scheme.loadColors(this.node);
    }
    start () {
        this.node.getChildByName("HighScore").getComponent(cc.Label).string = "" + Helpers.user.HighScore.toFixed(1);
        this.node.getChildByName("Coins").getComponent(cc.Label).string = "$" + Helpers.user.Coins;
        if(Helpers.user.LootBoxes > 0)
        {
            this.node.getChildByName("Notification").opacity = 255;
            this.node.getChildByName("Notification").runAction(cc.repeatForever(cc.sequence(
                cc.spawn(cc.fadeIn(2),
                         cc.scaleTo(2,0.24,0.24)),
                cc.delayTime(0.0125),
                cc.spawn(cc.fadeOut(2),
                cc.scaleTo(2,0.025,0.025)),
            )));
        }
    }
}
