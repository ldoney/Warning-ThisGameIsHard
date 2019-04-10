import {ColorScheme} from "./Objects/ColorScheme"

const {ccclass, property} = cc._decorator;

@ccclass
export default class CustomizeScript extends cc.Component {
    @property
    gap:number = 55;
    user =
    {
        HighScore: 0.00,
        Count:0,
        Coins:0,
        TotalTime:0,
    }
    skinDB = {
        Balls: [
            {
                ID: "000",
                unl:false,
                cost:0.00,
            },
            {
                ID: "001",
                unl:false,
                cost:0.00,
            },
            {
                ID: "002",
                unl:false,
                cost:0.00,
            },
            {
                ID: "003",
                unl:false,
                cost:0.00,
            },
            {
                ID: "004",
                unl:false,
                cost:0.00,
            },
            {
                ID: "005",
                unl:false,
                cost:0.00,
            },
            {
                ID: "006",
                unl:false,
                cost:0.00,
            },
            {
                ID: "007",
                unl:false,
                cost:0.00,
            },
            {
                ID: "008",
                unl:false,
                cost:0.00,
            },
            {
                ID: "009",
                unl:false,
                cost:0.00,
            },
            {
                ID: "010",
                unl:false,
                cost:0.00,
            },
            {
                ID: "011",
                unl:false,
                cost:0.00,
            },
            {
                ID: "012",
                unl:false,
                cost:0.00,
            },
            {
                ID: "013",
                unl:false,
                cost:0.00,
            },
        ],
    }
    skins =
    {
        Version:0.00,
        CurBall: "000",
    }
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
        
        if(localStorage.getItem("skins") != null)
        {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }else
        {
            this.updateSkins();
        }
        if(localStorage.getItem("user") != null)
        {
            this.user = JSON.parse(localStorage.getItem("user"));
        }
        else
        {
            this.updatePlayer();
        }
        this.changeBtnDisp();
        this.node.getChildByName("Back").on('touchstart', this.onBackTouchEvent, this);  
        var balls = this.skinDB.Balls;
        var window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
        var mindw = 110;
        var wind = -90;
        var hind = -16;
        for(var i = 0; i < balls.length; i++)
        {
            var node = new cc.Node();
            node.name = balls[i].ID;
            var sprite = new cc.Sprite();
            node.addComponent(cc.Sprite);
            node.scaleX = 0.5;
            node.scaleY = 0.3918;
            node.setContentSize(80, 80);
            node.group = this.node.getChildByName("BallBtn").group;
            node.on('touchstart', this.onBallTouchEvent.bind(balls[i].ID), this);
            window.addChild(node);
            this.getBallRepAsSF(window.getChildByName(balls[i].ID).getComponent(cc.Sprite), balls[i].ID);
            node.setPosition(wind, hind);
            cc.log(balls[i].ID + " : " + wind + " / " + hind);
            wind += this.gap;
            if(wind > mindw)
            {
                wind = -90;
                hind -= 44;
            }
        }
        this.scheme.loadColors(this.node);
        this.scheme.loadColors(window);
    }
    onBallTouchEvent(id:string,script)
    {
        cc.log("Clicked: " + id);
        cc.log(this.name);
        this.changeActiveBall(id);
        this.changeBtnDisp();
    }
    changeBtnDisp()
    {
        this.getBallRepAsSF(this.node.getChildByName("BallBtn").getComponent(cc.Sprite), this.skins.CurBall);
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
    getJSONRep(obj:string)
    {
        return this.skinDB.Balls.filter(e => e.ID === obj)[0];
    }
    isUnlocked(obj:string):boolean
    {
        if (this.skinDB.Balls.some(e => e.ID === obj))
            return true;

        return false;
    }
    changeActiveBall(str:string)
    {
        if(this.isUnlocked(str))
        {
            this.skins.CurBall = str;
            this.updateSkins();
        }
    }
    enoughCoins(el):boolean
    {
        if(this.user.Coins >= el.cost)
            return true;

        return false;
    }
    unlockBallJSONRep(elm):boolean
    {
        var ind = this.skinDB.Balls.indexOf(elm)
        if(this.skinDB.Balls[ind].unl)
        {
            return false;
        }else{
            this.skinDB.Balls[ind].unl = true;
            return true;
        }
    }
    dispMsg(Message:string)
    {
        cc.log(Message);
    }
    unlockSkin(str:string)
    {
        var el = this.getJSONRep(str);
        if(this.enoughCoins(el))
        {
            //Can Buy!
            //Take out Coins:
            this.user.Coins -= el.cost;

            //Unlock the Skin:
            if(this.unlockBallJSONRep(el))
            {
                this.dispMsg("Unlocked!");
            }
            else
            {
                this.cannotDoCallback("002:Item already unlocked");
            }
            this.updateSkins();
        }else
        {
            //Not enough $
            this.cannotDoCallback("001:Not enough Money");
        }
    }
    cannotDo()
    {
        this.cannotDoCallback("000:Default");
    }
    cannotDoCallback(Reason:string)
    {
        
    }
    updateSkins()
    {
        localStorage.setItem("skins", JSON.stringify(this.skins));
    }
    updatePlayer()
    {
        localStorage.setItem("user", JSON.stringify(this.user));
    }
    getBallRepAsSF(sprite:cc.Sprite, id:string)
    {
        var reso = "";
        cc.loader.loadRes("Balls/"+id, function (err, res) {
            if(!err)
            {
                cc.log("Resource Loaded!")
                reso = res;
                sprite.spriteFrame = new cc.SpriteFrame(res);
            }else
            {
                cc.log(err.message);
            }
        });
    }
    onDestroy()
    {
//        localStorage.setItem("skinDB", JSON.stringify(this.skinDB));
    }
}
