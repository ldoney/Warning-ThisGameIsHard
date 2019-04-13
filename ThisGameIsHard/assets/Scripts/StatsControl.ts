import {ColorScheme} from "./Objects/ColorScheme"
const {ccclass, property} = cc._decorator;

@ccclass
export default class TutorialControl extends cc.Component {
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
    skins = 
    {
        Version:0.00,
        CurBall: "000",
        totalSkins: 1,
    }
    scheme:ColorScheme = null;
    start () {
        this.scheme = new ColorScheme();
        if(localStorage.getItem("skins") != null)
        {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }else
        {
            localStorage.setItem("skins", JSON.stringify(this.skins));
        }
        if(localStorage.getItem("userData") != null)
        {
            this.user = JSON.parse(localStorage.getItem("userData"));
            this.node.getChildByName("Avg").getComponent(cc.Label).string = "Average: " + (this.user.TotalTime / this.user.Count).toFixed(2);
            this.node.getChildByName("Best").getComponent(cc.Label).string = "Best: " + (this.user.HighScore).toFixed(2);
            this.node.getChildByName("Plays").getComponent(cc.Label).string = "Games: " + (this.user.Count);
            this.node.getChildByName("NetWorth").getComponent(cc.Label).string = "Total Coins: $" + (this.user.NetWorth);
            this.node.getChildByName("SkinCnt").getComponent(cc.Label).string = "Skins: " + (this.skins.totalSkins) + "/15";
        }else
        {
            localStorage.setItem("userData", JSON.stringify(this.user));
        }
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
