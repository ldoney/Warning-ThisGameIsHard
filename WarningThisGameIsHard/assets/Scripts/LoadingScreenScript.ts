import {Helpers} from "./Objects/Helpers"

const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadingScreenScript extends cc.Component {

    onLoad () {
        this.node.getChildByName("Loading").runAction(cc.repeatForever(cc.rotateBy(1,360)));
        this.node.getChildByName("LogoWhite").runAction(cc.fadeIn(3));
        Helpers.setUpAll();
        cc.director.preloadScene("MainMenu");
        this.node.getChildByName("LogoWhite").runAction(cc.sequence(
            cc.delayTime(6),cc.fadeOut(2), cc.callFunc(this.loadIn)
            ));
        this.node.on('touchstart', this.loadIn, this);
    }
    loadIn() {
        //this.node.runAction(cc.fadeOut(2));
        cc.director.loadScene("MainMenu");
    }
}
