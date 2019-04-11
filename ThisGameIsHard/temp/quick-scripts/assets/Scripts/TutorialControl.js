(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/TutorialControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1fc03bcQVtPPqMGqFWBM+w/', 'TutorialControl', __filename);
// Scripts/TutorialControl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ColorScheme_1 = require("./Objects/ColorScheme");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TutorialControl = /** @class */ (function (_super) {
    __extends(TutorialControl, _super);
    function TutorialControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.scheme = null;
        return _this;
    }
    TutorialControl.prototype.start = function () {
        this.scheme = new ColorScheme_1.ColorScheme();
        if (localStorage.getItem("lastScheme") == null) {
            localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme_1.ColorScheme.numSchemes)) + "");
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        else {
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
        this.scheme.loadColors(this.node);
        this.node.getChildByName("Back").on('touchstart', this.onBackTouchEvent, this);
    };
    TutorialControl.prototype.onBackTouchEvent = function (touch, event) {
        this.node.runAction(cc.sequence(cc.fadeOut(0.25), cc.callFunc(function () {
            cc.director.loadScene('MainMenu');
        })));
    };
    TutorialControl = __decorate([
        ccclass
    ], TutorialControl);
    return TutorialControl;
}(cc.Component));
exports.default = TutorialControl;

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
        //# sourceMappingURL=TutorialControl.js.map
        