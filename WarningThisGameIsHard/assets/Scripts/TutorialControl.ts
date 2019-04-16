import {ColorScheme} from "./Objects/ColorScheme"
import { Helpers } from "./Objects/Helpers";
const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialControl extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    start () {
        Helpers.scheme.loadColors(this.node);
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.switchScenes("Settings",this.node)}, this)
    }
}
