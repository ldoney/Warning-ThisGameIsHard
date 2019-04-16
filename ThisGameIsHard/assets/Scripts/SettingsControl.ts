import { Helpers } from "./Objects/Helpers";
import { Context } from "./Context";

const {ccclass, property} = cc._decorator;

@ccclass
export default class SettingsControl extends cc.Component {
    window:cc.Node = null;
    start () {
        Helpers.scheme.loadColors(this.node);
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.returnToMenu(this.node)}, this)
        this.node.getChildByName("Help").on('touchstart', function() { Helpers.switchScenes("Tutorial",this.node)}, this)
        this.node.getChildByName("Reset").on('touchstart', this.reset, this);
    }
    reset()
    {
        Context.resetCharacter();
    }
}
