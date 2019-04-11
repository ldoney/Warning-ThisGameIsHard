import {ColorScheme} from "./Objects/ColorScheme"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.scheme = new ColorScheme();
        var lastScheme = localStorage.getItem("lastScheme");
        if(lastScheme != null)
        {
            this.scheme.loadSchemeFromInt(parseInt(lastScheme));
            
        }else
        {
            var to = (Math.floor(Math.random() * ColorScheme.numSchemes));
            localStorage.setItem("lastScheme", to + "");
            this.scheme.loadSchemeFromInt(to);
        }
        var bar = this.node.getChildByName("progressBar");


        var progress = bar.getComponent(cc.ProgressBar);
        progress.totalLength = this.node.width;
        bar.setPosition((-(this.node.width / 2)) + bar.width / 2, 0);
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
    inSession:boolean = true;

    gameEnd:boolean = false;

    sessionTimer:number = 0.00;

    scheme:ColorScheme = null;
    skins =
    {
        Version:0.00,
        CurBall: "000",
    }
    user =
    {
        HighScore: 0.00,
        Count:0,
        Coins:0,
        TotalTime:0,
    }
    start () {
        this.inSession = true;
        this.sessionTimer = 0.00;
        
        if(localStorage.getItem("userData") != null)
        {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }
        if(localStorage.getItem("skins") != null)
        {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }else
        {
            localStorage.setItem("skins", JSON.stringify(this.skins));
        }
        this.getBallRepAsSF(this.node.getChildByName("Ball").getComponent(cc.Sprite), this.skins.CurBall);
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$"+this.user.Coins;
        this.scheme.loadColors(this.node);
    }
    addCoin(c:number)
    {
        this.user.Coins += c;
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$"+this.user.Coins;
    }

    actions:Array<cc.Action> = null;
    pause()
    {
        this.freeze();
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string = 
        "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Paused...</color>";
        this.fade(15);
        var Resume = this.node.getComponentInChildren("RestartControl");
        Resume.switchModes(1);
        Resume.node.runAction(cc.fadeIn(0.25));
        this.node.getChildByName("Menu").runAction(cc.fadeIn(0.25));
    }
    fade(o)
    {
        var chw = this.node.getComponentsInChildren("FadeElem");
        for(var i = 0; i < chw.length; i++)
        {
            chw[i].fade(o);
        }
    }

    unfade()
    {
        var chw = this.node.getComponentsInChildren("FadeElem");
        for(var i = 0; i < chw.length; i++)
        {
            chw[i].unFade();
        }
    }
    unpause()
    {
        cc.director.getActionManager().resumeTargets(this.actions);
        this.inSession = true;
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string = "";
        this.unfade();
        this.node.getChildByName("Menu").runAction(cc.fadeOut(0.125));
        this.node.getChildByName("Resume").runAction(cc.fadeOut(0.125));
    }

    freeze()
    {
        this.actions = cc.director.getActionManager().pauseAllRunningActions();
        this.inSession = false;
    }
    gameOver() {
        cc.log("Game End!");
        this.gameEnd = true;
        this.freeze();
        this.fade(0);
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string = 
        "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Game Over</color>";

        localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme.numSchemes)) + "");
        
        this.user.Count = this.user.Count + 1;
        this.user.TotalTime = this.user.TotalTime + this.sessionTimer;
        this.updatePlayer();

        var Resume = this.node.getChildByName("Resume");
        Resume.getComponent("RestartControl").switchModes(0);
        Resume.runAction(cc.fadeIn(0.25));
        this.node.getChildByName("Menu").runAction(cc.fadeIn(0.25));
    }
    updatePlayer()
    {
        cc.sys.localStorage.setItem("userData", JSON.stringify(this.user));
    }
    restart()
    {
        this.updatePlayer();
        cc.director.loadScene("PlayScene");
    }

    menu()
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                cc.director.loadScene("MainMenu");
            })
        ));
    }
    update (dt) {
        if(this.inSession)
        {
            this.sessionTimer += dt;
            this.node.getChildByName("Timer").getComponent(cc.RichText).string = "<color=#" +  this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Time:" + this.sessionTimer.toFixed(2) + "</color>";
            this.node.getChildByName("HighScore").getComponent(cc.RichText).string = "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">High: " + this.user.HighScore.toFixed(2) + "</color>";
            if(this.sessionTimer > this.user.HighScore)
            {
                this.user.HighScore = this.sessionTimer;
                
            }
        }
    }
}




