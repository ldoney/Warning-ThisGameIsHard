import {ColorScheme} from "./Objects/ColorScheme"
import {Helpers} from "./Objects/Helpers"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {
    onLoad () {
        Helpers.randomizeScheme();
        var bar = this.node.getChildByName("progressBar");

        var progress = bar.getComponent(cc.ProgressBar);
        progress.totalLength = this.node.width;
        bar.setPosition((-(this.node.width / 2)) + bar.width / 2, 0);
    }
    getBallRepAsSF(sprite:cc.Sprite, id:string)
    {
        cc.loader.loadRes("Balls/"+id, function (err, res) {
            if(!err)
            {
                cc.log("Resource Loaded!")
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

    start () {
        this.inSession = true;
        this.sessionTimer = 0.00;
        this.node.getChildByName("Menu").on('touchstart', function() {Helpers.returnToMenu(this.node)}, this);
        this.node.getChildByName("Pause").on('touchstart', this.onPauseTouchEvent, this);
        this.getBallRepAsSF(this.node.getChildByName("Ball").getComponent(cc.Sprite), Helpers.skins.CurBall);
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$"+Helpers.user.Coins;
        Helpers.scheme.loadColors(this.node);
    }
    onPauseTouchEvent(e)
    {
        if(this.inSession)
        {
            this.pause();
        }
        else
        {
            this.unpause();
        }
    }
    addCoin(c:number)
    {
        Helpers.user.Coins += c;
        Helpers.user.NetWorth += c;
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$"+Helpers.user.Coins;
    }

    actions:Array<cc.Action> = null;
    pause()
    {
        this.freeze();
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string = 
        "<color=#" + Helpers.scheme.toHex(Helpers.scheme.curScheme.Secondary) + ">Paused...</color>";
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
        "<color=#" + Helpers.scheme.toHex(Helpers.scheme.curScheme.Secondary) + ">Game Over</color>";

        localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme.numSchemes)) + "");
        
        Helpers.user.Count = Helpers.user.Count + 1;
        Helpers.user.TotalTime = Helpers.user.TotalTime + this.sessionTimer;
        Helpers.user.AllTimes.push(this.sessionTimer);
        Helpers.updatePlayer();

        var Resume = this.node.getChildByName("Resume");
        Resume.getComponent("RestartControl").switchModes(0);
        Resume.runAction(cc.fadeIn(0.25));
        this.node.getChildByName("Menu").runAction(cc.fadeIn(0.25));
    }
    restart()
    {
        Helpers.updatePlayer();
        cc.director.loadScene("PlayScene");
    }

    update (dt) {
        if(this.inSession)
        {
            this.sessionTimer += dt;
            this.node.getChildByName("Timer").getComponent(cc.Label).string = "Time:" + this.sessionTimer.toFixed(2);

            this.node.getChildByName("HighScore").getComponent(cc.Label).string = "Best:" + Helpers.user.HighScore.toFixed(2);
            if(this.sessionTimer > Helpers.user.HighScore)
            {
                Helpers.user.HighScore = this.sessionTimer;
            }
        }
    }
}




