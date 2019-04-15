import { Helpers } from "./Objects/Helpers";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaletteController extends cc.Component {
    @property
    prefab:cc.Asset = null;
    fromHex(hex) {
        var temp = cc.Color.BLACK;
        return temp.fromHEX("#" + hex);
    }
    start () {        
        Helpers.scheme.loadColors(this.node);
        var list = Helpers.schemeList.List;
        for(var i = 0; i < list.length; i++)
        {
            var scheme = list[i];
            var nod = new cc.Node();
            nod.name = scheme.ID;
            var sprite = new cc.Sprite();
            nod.addComponent(cc.Sprite);
            nod.scaleX = 0.5;
            nod.scaleY = 0.3918;
           /* nod.setContentSize(80, 80);
            if(balls[i].unl)
            {
                nod.group = this.node.getChildByName("BallBtn").group;
            }else
            {
                nod.group = this.node.getChildByName("Title_1").group;
                var txtnod = new cc.Node();
                txtnod.name = "PRICE_"+balls[i].ID;
                txtnod.addComponent(cc.Label);
                var text = txtnod.getComponent(cc.Label);
                text.string = "$" + balls[i].cost;
                text.fontSize = 10;
                txtnod.setPosition(wind, hind - 35);
                txtnod.group = this.node.getChildByName("Title_1").group;
                window.addChild(txtnod);
            }
            
            window.addChild(nod);
            nod.on('touchstart', this.onBallTouchEvent, this);
            this.getBallRepAsSF(window.getChildByName(balls[i].ID).getComponent(cc.Sprite), balls[i].ID);
            nod.setPosition(wind, hind);
            wind += this.gap;
            if(wind > mindw)
            {
                wind = -85;
                hind -= 44;
            }*/
        }
    }

    // update (dt) {}
}
