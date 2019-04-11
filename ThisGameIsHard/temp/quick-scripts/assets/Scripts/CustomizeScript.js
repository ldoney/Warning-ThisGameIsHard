(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/CustomizeScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4fce8Jx97VLJo3qif/lAoeq', 'CustomizeScript', __filename);
// Scripts/CustomizeScript.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ColorScheme_1 = require("./Objects/ColorScheme");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CustomizeScript = /** @class */ (function (_super) {
    __extends(CustomizeScript, _super);
    function CustomizeScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gap = 55;
        _this.user = {
            HighScore: 0.00,
            Count: 0,
            Coins: 0,
            TotalTime: 0,
        };
        _this.skinDB = {
            Balls: [
                {
                    ID: "000",
                    unl: true,
                    cost: 0.00,
                },
                {
                    ID: "001",
                    unl: false,
                    cost: 10.00,
                },
                {
                    ID: "002",
                    unl: false,
                    cost: 20.00,
                },
                {
                    ID: "003",
                    unl: false,
                    cost: 30.00,
                },
                {
                    ID: "004",
                    unl: false,
                    cost: 40.00,
                },
                {
                    ID: "005",
                    unl: false,
                    cost: 50.00,
                },
                {
                    ID: "006",
                    unl: false,
                    cost: 60.00,
                },
                {
                    ID: "007",
                    unl: false,
                    cost: 70.00,
                },
                {
                    ID: "008",
                    unl: false,
                    cost: 80.00,
                },
                {
                    ID: "009",
                    unl: false,
                    cost: 90.00,
                },
                {
                    ID: "010",
                    unl: false,
                    cost: 100.00,
                },
                {
                    ID: "011",
                    unl: false,
                    cost: 150.00,
                },
                {
                    ID: "012",
                    unl: false,
                    cost: 250.00,
                },
                {
                    ID: "013",
                    unl: false,
                    cost: 300.00,
                },
                {
                    ID: "014",
                    unl: false,
                    cost: 300.00,
                },
                {
                    ID: "015",
                    unl: false,
                    cost: 300.00,
                },
            ],
        };
        _this.skins = {
            Version: 0.00,
            CurBall: "000",
        };
        _this.scheme = null;
        _this.lastID = "-1";
        return _this;
    }
    CustomizeScript.prototype.start = function () {
        this.scheme = new ColorScheme_1.ColorScheme();
        this.checkForUpdates();
        if (localStorage.getItem("lastScheme") == null) {
            localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme_1.ColorScheme.numSchemes)) + "");
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        else {
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        if (localStorage.getItem("skinDB") != null) {
            this.skinDB = JSON.parse(localStorage.getItem("skinDB"));
        }
        else {
            this.updateSkins();
        }
        if (localStorage.getItem("skins") != null) {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }
        else {
            this.updateSkins();
        }
        if (localStorage.getItem("userData") != null) {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }
        else {
            this.updatePlayer();
        }
        this.node.getChildByName("CurMon").getComponent(cc.Label).string = "Bank: $" + this.user.Coins;
        this.changeBtnDisp();
        this.node.getChildByName("Back").on('touchstart', this.onBackTouchEvent, this);
        var balls = this.skinDB.Balls;
        var window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
        var mindw = 110;
        var wind = -85;
        var hind = -16;
        for (var i = 0; i < balls.length; i++) {
            var nod = new cc.Node();
            nod.name = balls[i].ID;
            var sprite = new cc.Sprite();
            nod.addComponent(cc.Sprite);
            nod.scaleX = 0.5;
            nod.scaleY = 0.3918;
            nod.setContentSize(80, 80);
            if (balls[i].unl) {
                nod.group = this.node.getChildByName("BallBtn").group;
            }
            else {
                nod.group = this.node.getChildByName("Title_1").group;
                var txtnod = new cc.Node();
                txtnod.name = "PRICE_" + balls[i].ID;
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
            if (wind > mindw) {
                wind = -85;
                hind -= 44;
            }
        }
        this.scheme.loadColors(this.node);
        this.scheme.loadColors(window);
        this.node.getChildByName("BallBtn").runAction(cc.repeatForever(cc.rotateBy(4, 360)));
    };
    CustomizeScript.prototype.onBallTouchEvent = function (event) {
        var id = event.target.name;
        if (this.isUnlocked(id)) {
            this.changeActiveBall(id);
            this.changeBtnDisp();
        }
        else {
            this.cannotDoCallback("Click again to buy");
            if (this.lastID == "-1") {
                this.lastID = id;
            }
            else if (this.lastID == id) {
                var window = this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content");
                this.lastID = "-1";
                if (this.unlockSkin(id)) {
                    window.getChildByName(id).color = this.scheme.curScheme.Primary;
                    window.removeChild(window.getChildByName("PRICE_" + id));
                    this.scheme.loadColors(this.node.getChildByName("ItemsView").getChildByName("view").getChildByName("content"));
                }
            }
        }
    };
    CustomizeScript.prototype.checkForUpdates = function () {
        if (localStorage.getItem("skinDB") != null) {
            var old = JSON.parse(localStorage.getItem("skinDB"));
            this.skinDB.Balls.forEach(function (element) {
                if (!old.Balls.some(function (e) { return e.ID === element.ID; })) {
                    old.Balls.push(element);
                }
            });
            localStorage.setItem("skinDB", JSON.stringify(old));
        }
    };
    CustomizeScript.prototype.changeBtnDisp = function () {
        this.getBallRepAsSF(this.node.getChildByName("BallBtn").getComponent(cc.Sprite), this.skins.CurBall);
    };
    CustomizeScript.prototype.onBackTouchEvent = function (touch, event) {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene('MainMenu');
        })));
    };
    CustomizeScript.prototype.getJSONRep = function (obj) {
        return this.skinDB.Balls.filter(function (e) { return e.ID === obj; })[0];
    };
    CustomizeScript.prototype.isUnlocked = function (obj) {
        if (this.skinDB.Balls.some(function (e) { return e.ID === obj && e.unl; }))
            return true;
        return false;
    };
    CustomizeScript.prototype.changeActiveBall = function (str) {
        if (this.isUnlocked(str)) {
            this.skins.CurBall = str;
            this.updateSkins();
        }
    };
    CustomizeScript.prototype.enoughCoins = function (el) {
        if (this.user.Coins >= el.cost)
            return true;
        return false;
    };
    CustomizeScript.prototype.unlockBallJSONRep = function (elm) {
        var ind = this.skinDB.Balls.find(function (item) { return item.ID == elm; });
        if (ind.unl) {
            return false;
        }
        else {
            ind.unl = true;
            return true;
        }
    };
    CustomizeScript.prototype.dispMsg = function (Message) {
        this.changeErrMsg(this.scheme.curScheme.Secondary, Message);
    };
    CustomizeScript.prototype.unlockSkin = function (str) {
        var el = this.getJSONRep(str);
        if (this.enoughCoins(el)) {
            this.user.Coins -= el.cost;
            this.node.getChildByName("SpendNot").getComponent(cc.Label).string = "-$" + el.cost;
            this.node.getChildByName("SpendNot").runAction(cc.sequence(cc.fadeIn(1), cc.delayTime(1), cc.fadeOut(1)));
            if (this.unlockBallJSONRep(str)) {
                this.dispMsg("Unlocked!");
            }
            else {
                this.cannotDoCallback("Item already unlocked");
                return false;
            }
            this.updateSkins();
        }
        else {
            //Not enough $
            this.cannotDoCallback("Not enough Money");
            return false;
        }
        this.updateSkins();
        this.updatePlayer();
        this.node.getChildByName("CurMon").getComponent(cc.Label).string = "Bank: $" + this.user.Coins;
        return true;
    };
    CustomizeScript.prototype.cannotDo = function () {
        this.cannotDoCallback("000:Default");
    };
    CustomizeScript.prototype.cannotDoCallback = function (Reason) {
        this.changeErrMsg(this.scheme.curScheme.Quatrenary, Reason);
    };
    CustomizeScript.prototype.changeErrMsg = function (col, reason) {
        this.node.getChildByName("Error").runAction(cc.sequence(cc.fadeIn(0.5), cc.delayTime(2.0), cc.fadeOut(1.0)));
        this.node.getChildByName("Error").color = col;
        this.node.getChildByName("Error").getComponent(cc.Label).string = reason;
    };
    CustomizeScript.prototype.updateSkins = function () {
        localStorage.setItem("skins", JSON.stringify(this.skins));
        localStorage.setItem("skinDB", JSON.stringify(this.skinDB));
    };
    CustomizeScript.prototype.updatePlayer = function () {
        localStorage.setItem("userData", JSON.stringify(this.user));
    };
    CustomizeScript.prototype.getBallRepAsSF = function (sprite, id) {
        cc.loader.loadRes("Balls/" + id, function (err, res) {
            if (!err) {
                sprite.spriteFrame = new cc.SpriteFrame(res);
            }
            else {
                cc.log(err.message);
            }
        });
    };
    CustomizeScript.prototype.onDestroy = function () {
        //        localStorage.setItem("skinDB", JSON.stringify(this.skinDB));
    };
    __decorate([
        property
    ], CustomizeScript.prototype, "gap", void 0);
    CustomizeScript = __decorate([
        ccclass
    ], CustomizeScript);
    return CustomizeScript;
}(cc.Component));
exports.default = CustomizeScript;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CustomizeScript.js.map
        