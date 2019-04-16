import {Helpers} from "./Objects/Helpers"
const {ccclass, property} = cc._decorator;

@ccclass
export default class LootBoxes extends cc.Component {

    start () {
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.switchScenes("PaletteEdit",this.node)}, this);    
        var Box = this.node.getChildByName("Box");
        Box.on('touchstart', this.choose, this)
        this.shake();
    }
    shake()
    {
        var Box = this.node.getChildByName("Box");
        Box.runAction(cc.repeatForever(cc.sequence(
            cc.rotateBy(0.01,15),
            cc.rotateBy(0.01,-15),
            cc.rotateBy(0.01,-15),
            cc.rotateBy(0.01,15),
            cc.delayTime(3),
        )));
    }
    unlock(ID:string)
    {
        var elem = Helpers.schemeList.List.find(e => e.ID == ID);
        elem.unl = true;
        elem.Enabled = true;
        this.createItemDisp(elem);
        Helpers.updateSchemes();
    }
    choose()
    {
        var list = Helpers.schemeList.List.filter(e => e.unl == false);
        var index = (Math.floor(Math.random() * list.length));
        var amount = Math.floor((Math.random()* 10) + 1);
        var Box = this.node.getChildByName("Box");
        var callback = cc.callFunc(function(){this.unlock(list[index].ID)}, this);
        Box.stopAllActions();
        Box.runAction(cc.sequence(cc.repeat( cc.sequence(
            cc.moveBy(0.01, cc.v2(amount, 0)),
            cc.moveBy(0.01, cc.v2(0, -amount)),
            cc.moveBy(0.01, cc.v2(0, amount)),
            cc.moveBy(0.01, cc.v2(-amount, 0)),
            cc.delayTime(0.1),
            cc.moveBy(0.01, cc.v2(0, -amount)),
            cc.moveBy(0.01, cc.v2(amount, 0)),
            cc.moveBy(0.01, cc.v2(0, amount)),
            cc.moveBy(0.01, cc.v2(-amount, 0)),
            cc.delayTime(0.1),
            cc.moveBy(0.01, cc.v2(amount, 0)),
            cc.moveBy(0.01, cc.v2(0, -amount)),
            cc.moveBy(0.01, cc.v2(-amount, 0)),
            cc.moveBy(0.01, cc.v2(0, amount)),
            cc.delayTime(0.1),
            cc.moveBy(0.01, cc.v2(0, -amount)),
            cc.moveBy(0.01, cc.v2(amount, 0)),
            cc.moveBy(0.01, cc.v2(0, amount)),
            cc.moveBy(0.01, cc.v2(-amount, 0)),
            cc.delayTime(0.1),
            cc.delayTime(0.5)),
            5), callback));
    }
    createItemDisp(scheme)
    {
        var nod = new cc.Node();
        nod.name = scheme.ID;
        nod.addComponent(cc.Sprite);
        var sprite = nod.getComponent(cc.Sprite);            
        Helpers.setFrame(sprite, "Sprites/Button");

        var lblnode = new cc.Node();
        lblnode.addComponent(cc.Label);
        var lbl = lblnode.getComponent(cc.Label);
        lbl.string = scheme.Name;

        lblnode.scaleX = 0.87;
        lblnode.color = Helpers.fromHex(scheme.Primary);
        nod.color = Helpers.fromHex(scheme.Background);            
        nod.addChild(lblnode);

        nod.setPosition(0, -200);
        nod.setScale(0.11, 0.11);

        this.node.addChild(nod);
        nod.runAction(cc.sequence(
            cc.spawn(
                cc.fadeIn(0.25),
                cc.scaleTo(0.2,0.61,0.61),
                cc.rotateBy(0.2,360),
                ),
            cc.delayTime(5),
            cc.fadeOut(10)
        ))
    }
    unbox()
    {

    }
    update (dt) {
        
    }
}
