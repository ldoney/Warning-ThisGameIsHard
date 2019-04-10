import {ColorScheme} from "./Objects/ColorScheme"
const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialControl extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    scheme:ColorScheme = null;
    start () {
        this.scheme = new ColorScheme();
        if(localStorage.getItem("lastScheme") == null)
        {
            localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme.numSchemes)) + "");
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }else
        {
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        this.scheme.loadColors(this.node);
        this.node.getChildByName("Back").on('touchstart', this.onBackTouchEvent, this)
    }
    onBackTouchEvent(touch, event)
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                 cc.director.loadScene('MainMenu');
            })
        ));
    }
}
