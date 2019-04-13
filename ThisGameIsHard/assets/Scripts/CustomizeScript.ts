import {ColorScheme} from "./Objects/ColorScheme"
import {Helpers} from "./Objects/Helpers"
const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomizeScript extends cc.Component {
    @property
    gap:number = 55;
    start () {
        this.node.getChildByName("CurMon").getComponent(cc.Label).string = "Bank: $" + Helpers.user.Coins;
        this.changeBtnDisp();
        this.node.getChildByName("Back").on('touchstart', function() { Helpers.returnToMenu(this.node)}, this);  
        var balls = Helpers.skinDB.Balls;
        var window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
        var mindw = 110;
        var wind = -85;
        var hind = -16;
        for(var i = 0; i < balls.length; i++)
        {
            var nod = new cc.Node();
            nod.name = balls[i].ID;
            var sprite = new cc.Sprite();
            nod.addComponent(cc.Sprite);
            nod.scaleX = 0.5;
            nod.scaleY = 0.3918;
            nod.setContentSize(80, 80);
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
            }
        }
        Helpers.scheme.loadColors(this.node);
        Helpers.scheme.loadColors(window);
        this.node.getChildByName("BallBtn").runAction(cc.repeatForever(
                cc.rotateBy(4, 360)
        ));
    }
    lastID:string = "-1";
    onBallTouchEvent(event:cc.Event.EventTouch)
    {
        var id = event.target.name;
        if(this.isUnlocked(id))
        {
            this.changeActiveBall(id);
            this.changeBtnDisp();
        }else
        {
            this.cannotDoCallback("Click again to buy");
            if(this.lastID == "-1")
            {
                this.lastID = id;
            }else if(this.lastID == id)
            {
                var window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
                this.lastID = "-1";
                if(this.unlockSkin(id))
                {
                    window.getChildByName(id).group = this.node.getChildByName("BallBtn").group;
                    window.removeChild(window.getChildByName("PRICE_"+id));
                    Helpers.scheme.loadColors(this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content"));
                }
            }
        }
    }
    changeBtnDisp()
    {
        this.getBallRepAsSF(this.node.getChildByName("BallBtn").getComponent(cc.Sprite), Helpers.skins.CurBall);
    }
    getJSONRep(obj:string)
    {
        return Helpers.skinDB.Balls.filter(e => e.ID === obj)[0];
    }
    isUnlocked(obj:string):boolean
    {
        if (Helpers.skinDB.Balls.some(e => e.ID === obj && e.unl))
            return true;

        return false;
    }
    changeActiveBall(str:string)
    {
        if(this.isUnlocked(str))
        {
            Helpers.skins.CurBall = str;
            Helpers.updateSkins();
        }
    }
    enoughCoins(el):boolean
    {
        if(Helpers.user.Coins >= el.cost)
            return true;

        return false;
    }
    unlockBallJSONRep(elm:string):boolean
    {
        var ind = Helpers.skinDB.Balls.find(item=>item.ID==elm);
        if(ind.unl)
        {
            return false;
        }else{
            ind.unl = true;
            return true;
        }
    }
    dispMsg(Message:string)
    {
        this.changeErrMsg(Helpers.scheme.curScheme.Secondary, Message);
    }
    unlockSkin(str:string)
    {
        var el = this.getJSONRep(str);
        if(this.enoughCoins(el))
        {
            Helpers.user.Coins -= el.cost;
            this.node.getChildByName("SpendNot").getComponent(cc.Label).string = "-$" + el.cost;
            this.node.getChildByName("SpendNot").runAction(cc.sequence(
                cc.fadeIn(1),
                cc.delayTime(1),
                cc.fadeOut(1),
            ));
            Helpers.skins.totalSkins++;
            if(this.unlockBallJSONRep(str))
            {
                this.dispMsg("Unlocked!");
            }
            else
            {
                this.cannotDoCallback("Item already unlocked");
                return false;
            }
            Helpers.updateSkins();
        }else
        {
            //Not enough $
            this.cannotDoCallback("Not enough Money");
            return false;
        }
        Helpers.updateSkins();
        Helpers.updatePlayer();
        this.node.getChildByName("CurMon").getComponent(cc.Label).string = "Bank: $" + Helpers.user.Coins;
        return true;
    }
    cannotDo()
    {
        this.cannotDoCallback("000:Default");
    }
    cannotDoCallback(Reason:string)
    {
        this.changeErrMsg(Helpers.scheme.curScheme.Quatrenary, Reason);
    }
    changeErrMsg(col:cc.Color, reason:string)
    {
        this.node.getChildByName("Error").runAction(cc.sequence(
            cc.fadeIn(0.5),
            cc.delayTime(2.0),
            cc.fadeOut(1.0),
        ));
        this.node.getChildByName("Error").color = col;
        this.node.getChildByName("Error").getComponent(cc.Label).string = reason;
    }
    getBallRepAsSF(sprite:cc.Sprite, id:string)
    {
        cc.loader.loadRes("Balls/"+id, function (err, res) {
            if(!err)
            {
                sprite.spriteFrame = new cc.SpriteFrame(res);
            }else
            {
                cc.log(err.message);
            }
        });
    }
}
