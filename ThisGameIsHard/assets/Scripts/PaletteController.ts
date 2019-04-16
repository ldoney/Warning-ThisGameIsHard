import { Helpers } from "./Objects/Helpers";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PaletteController extends cc.Component {
    @property
    hstart:number = -15;

    @property
    hinc:number = 30;

    window = null;
    start () {        
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.returnToMenu(this.node)}, this);
        this.node.getChildByName("LootBox").on('touchstart', function() { Helpers.switchScenes("LootBox",this.node)}, this);
        this.window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
        var list = Helpers.schemeList.List;
        var curh = this.hstart;
        for(var i = 0; i < list.length; i++)
        {
            var scheme = list[i];
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
            
            var statusNode = new cc.Node();
            statusNode.addComponent(cc.Sprite);
            var sprite = statusNode.getComponent(cc.Sprite);
            Helpers.setFrame(sprite, "Sprites/Xmark");   
            statusNode.opacity = 0;
            statusNode.setScale(0.44,0.44);
            statusNode.color = Helpers.fromHex(scheme.Tertiary);
            statusNode.name = "Xmark";
            nod.addChild(statusNode);


            nod.scaleX = 0.5;
            nod.scaleY = 0.33;
            if(scheme.unl)
            {
                nod.on('touchstart', this.toggleEnable, this);
                if(!scheme.Enabled)
                {
                    statusNode.opacity = 200;
                }
            }else{
                //Locked item
                var locknode = new cc.Node();
                locknode.addComponent(cc.Sprite);
                var sprite = locknode.getComponent(cc.Sprite);
                Helpers.setFrame(sprite, "Sprites/Lock");
                locknode.setScale(0.5, 0.6);
                locknode.color = Helpers.fromHex(scheme.Secondary);
                locknode.opacity = 200;
                nod.addChild(locknode);
            }
            nod.setPosition(0, curh);
            curh -= this.hinc;
            this.window.addChild(nod);
        }
    }
    lastTouch:string = "-1";
    toggleEnable(event:cc.Event.EventTouch)
    {
            var disp = event.target;
            var ID = disp.name;
            if(this.lastTouch == ID) {
                var elem = Helpers.schemeList.List.find(e => e.ID === ID);
                if (elem.Enabled && Helpers.schemeList.List.filter(e => e.unl && e.Enabled).length > 1)
                {
                    elem.Enabled = false;            
                    if(disp.getChildByName("Xmark") != null)
                    {
                        disp.getChildByName("Xmark").opacity = 200;
                    }
                }else
                {
                    elem.Enabled = true;
                    if(disp.getChildByName("Xmark") != null)
                    {
                        disp.getChildByName("Xmark").opacity = 0;
                    }
                }
                Helpers.updateSchemes();
            }
            else
            {
                this.lastTouch = ID;
            }
        }
}
