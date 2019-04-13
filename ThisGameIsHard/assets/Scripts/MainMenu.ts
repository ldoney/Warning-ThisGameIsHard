import {ColorScheme} from "./Objects/ColorScheme"

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    user = 
    {
        HighScore : 0.00,
        Count: 0,
        Coins:0,
        NetWorth:0,
        TotalTime : 0.00,
        AllTimes:[
            
        ],
    };
    scheme:ColorScheme = null;
    onLoad () {
        if(localStorage.getItem("userData") != null)
        {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }else
        {
            localStorage.setItem("userData", JSON.stringify(this.user));
        }
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
        cc.loader.loadRes("Sounds/Music/MainMenuMusic", cc.AudioClip, function (err, clip) {
            var audioID = cc.audioEngine.playMusic(clip, false);
        });
        this.node.getChildByName("Play").on('touchstart', this.onPlayTouchEvent, this)
        this.node.getChildByName("Tutorial").on('touchstart', this.onTutTouchEvent, this)
        this.node.getChildByName("Customize").on('touchstart', this.onShoTouchEvent, this)
        this.node.getChildByName("Stats").on("touchstart", this.onStaTouchEvent, this)
    }
    onStaTouchEvent(touch, event)
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                 cc.director.loadScene('Stats');
            })
        ));        
    }
    onTutTouchEvent(touch, event)
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                 cc.director.loadScene('Tutorial');
            })
        ));
    }
    onPlayTouchEvent(touch, event)
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                 cc.director.loadScene('PlayScene');
            })
        ));
    }
    onShoTouchEvent(touch, event)
    {
        this.node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                 cc.director.loadScene('Shop');
            })
        ));
    }
    start () {
        this.node.getChildByName("HighScore").getComponent(cc.Label).string = "High Score: " + this.user.HighScore.toFixed(2);
        this.node.getChildByName("Coins").getComponent(cc.Label).string = "Coins: " + this.user.Coins;
    }
}
