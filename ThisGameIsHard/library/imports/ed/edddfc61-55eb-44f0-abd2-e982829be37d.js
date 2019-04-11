"use strict";
cc._RF.push(module, 'edddfxhVetE8KvS6YKCm+N9', 'Game');
// Scripts/Game.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ColorScheme_1 = require("./Objects/ColorScheme");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        // LIFE-CYCLE CALLBACKS:
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inSession = true;
        _this.gameEnd = false;
        _this.sessionTimer = 0.00;
        _this.scheme = null;
        _this.skins = {
            Version: 0.00,
            CurBall: "000",
        };
        _this.user = {
            HighScore: 0.00,
            Count: 0,
            Coins: 0,
            TotalTime: 0,
        };
        _this.actions = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        this.scheme = new ColorScheme_1.ColorScheme();
        var lastScheme = localStorage.getItem("lastScheme");
        if (lastScheme != null) {
            this.scheme.loadSchemeFromInt(parseInt(lastScheme));
        }
        else {
            var to = (Math.floor(Math.random() * ColorScheme_1.ColorScheme.numSchemes));
            localStorage.setItem("lastScheme", to + "");
            this.scheme.loadSchemeFromInt(to);
        }
        var bar = this.node.getChildByName("progressBar");
        var progress = bar.getComponent(cc.ProgressBar);
        progress.totalLength = this.node.width;
        bar.setPosition((-(this.node.width / 2)) + bar.width / 2, 0);
    };
    Game.prototype.getBallRepAsSF = function (sprite, id) {
        var reso = "";
        cc.loader.loadRes("Balls/" + id, function (err, res) {
            if (!err) {
                cc.log("Resource Loaded!");
                reso = res;
                sprite.spriteFrame = new cc.SpriteFrame(res);
            }
            else {
                cc.log(err.message);
            }
        });
    };
    Game.prototype.start = function () {
        this.inSession = true;
        this.sessionTimer = 0.00;
        if (localStorage.getItem("userData") != null) {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }
        if (localStorage.getItem("skins") != null) {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }
        else {
            localStorage.setItem("skins", JSON.stringify(this.skins));
        }
        this.getBallRepAsSF(this.node.getChildByName("Ball").getComponent(cc.Sprite), this.skins.CurBall);
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$" + this.user.Coins;
        this.scheme.loadColors(this.node);
    };
    Game.prototype.addCoin = function (c) {
        this.user.Coins += c;
        this.node.getChildByName("CoinCnt").getComponent(cc.Label).string = "$" + this.user.Coins;
    };
    Game.prototype.pause = function () {
        this.freeze();
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string =
            "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Paused...</color>";
        this.fade(15);
        var Resume = this.node.getComponentInChildren("RestartControl");
        Resume.switchModes(1);
        Resume.node.runAction(cc.fadeIn(0.25));
        this.node.getChildByName("Menu").runAction(cc.fadeIn(0.25));
    };
    Game.prototype.fade = function (o) {
        var chw = this.node.getComponentsInChildren("FadeElem");
        for (var i = 0; i < chw.length; i++) {
            chw[i].fade(o);
        }
    };
    Game.prototype.unfade = function () {
        var chw = this.node.getComponentsInChildren("FadeElem");
        for (var i = 0; i < chw.length; i++) {
            chw[i].unFade();
        }
    };
    Game.prototype.unpause = function () {
        cc.director.getActionManager().resumeTargets(this.actions);
        this.inSession = true;
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string = "";
        this.unfade();
        this.node.getChildByName("Menu").runAction(cc.fadeOut(0.125));
        this.node.getChildByName("Resume").runAction(cc.fadeOut(0.125));
    };
    Game.prototype.freeze = function () {
        this.actions = cc.director.getActionManager().pauseAllRunningActions();
        this.inSession = false;
    };
    Game.prototype.gameOver = function () {
        cc.log("Game End!");
        this.gameEnd = true;
        this.freeze();
        this.fade(0);
        this.node.getChildByName("Paused_Message").getComponent(cc.RichText).string =
            "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Game Over</color>";
        localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme_1.ColorScheme.numSchemes)) + "");
        this.user.Count = this.user.Count + 1;
        this.user.TotalTime = this.user.TotalTime + this.sessionTimer;
        this.updatePlayer();
        var Resume = this.node.getChildByName("Resume");
        Resume.getComponent("RestartControl").switchModes(0);
        Resume.runAction(cc.fadeIn(0.25));
        this.node.getChildByName("Menu").runAction(cc.fadeIn(0.25));
    };
    Game.prototype.updatePlayer = function () {
        cc.sys.localStorage.setItem("userData", JSON.stringify(this.user));
    };
    Game.prototype.restart = function () {
        this.updatePlayer();
        cc.director.loadScene("PlayScene");
    };
    Game.prototype.menu = function () {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene("MainMenu");
        })));
    };
    Game.prototype.update = function (dt) {
        if (this.inSession) {
            this.sessionTimer += dt;
            this.node.getChildByName("Timer").getComponent(cc.RichText).string = "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">Time:" + this.sessionTimer.toFixed(2) + "</color>";
            this.node.getChildByName("HighScore").getComponent(cc.RichText).string = "<color=#" + this.scheme.toHex(this.scheme.curScheme.Secondary) + ">High: " + this.user.HighScore.toFixed(2) + "</color>";
            if (this.sessionTimer > this.user.HighScore) {
                this.user.HighScore = this.sessionTimer;
            }
        }
    };
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();