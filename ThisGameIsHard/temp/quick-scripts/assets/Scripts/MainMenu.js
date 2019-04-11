(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/MainMenu.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '10d27CWKtNICqFKPH1/Wg19', 'MainMenu', __filename);
// Scripts/MainMenu.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ColorScheme_1 = require("./Objects/ColorScheme");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MainMenu = /** @class */ (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.user = {
            HighScore: 0.00,
            Count: 0,
            Coins: 0,
            TotalTime: 0.00,
        };
        _this.scheme = null;
        return _this;
    }
    MainMenu.prototype.onLoad = function () {
        if (localStorage.getItem("userData") != null) {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }
        else {
            localStorage.setItem("userData", JSON.stringify(this.user));
        }
        this.scheme = new ColorScheme_1.ColorScheme();
        if (localStorage.getItem("lastScheme") == null) {
            localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme_1.ColorScheme.numSchemes)) + "");
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        else {
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        this.scheme.loadColors(this.node);
        this.node.getChildByName("Play").on('touchstart', this.onPlayTouchEvent, this);
        this.node.getChildByName("Tutorial").on('touchstart', this.onTutTouchEvent, this);
        this.node.getChildByName("Customize").on('touchstart', this.onShoTouchEvent, this);
    };
    MainMenu.prototype.onTutTouchEvent = function (touch, event) {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene('Tutorial');
        })));
    };
    MainMenu.prototype.onPlayTouchEvent = function (touch, event) {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene('PlayScene');
        })));
    };
    MainMenu.prototype.onShoTouchEvent = function (touch, event) {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene('Shop');
        })));
    };
    MainMenu.prototype.start = function () {
        this.node.getChildByName("HighScore").getComponent(cc.Label).string = "High Score: " + this.user.HighScore.toFixed(2);
        this.node.getChildByName("Coins").getComponent(cc.Label).string = "Coins: " + this.user.Coins;
    };
    MainMenu = __decorate([
        ccclass
    ], MainMenu);
    return MainMenu;
}(cc.Component));
exports.default = MainMenu;

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
        //# sourceMappingURL=MainMenu.js.map
        