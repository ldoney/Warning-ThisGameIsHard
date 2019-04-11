(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/FadeElem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5b0311PvNtB/bhGAwfanSZF', 'FadeElem', __filename);
// Scripts/FadeElem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FadeElem = /** @class */ (function (_super) {
    __extends(FadeElem, _super);
    function FadeElem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.OldOpac = -1;
        return _this;
    }
    FadeElem.prototype.fade = function (o) {
        if (this.OldOpac == -1) {
            this.OldOpac = this.node.opacity;
        }
        this.node.runAction(cc.fadeTo(0.0725, o));
    };
    FadeElem.prototype.unFade = function () {
        if (this.OldOpac != -1) {
            this.node.runAction(cc.fadeTo(0.0725, this.OldOpac));
        }
    };
    FadeElem = __decorate([
        ccclass
    ], FadeElem);
    return FadeElem;
}(cc.Component));
exports.default = FadeElem;

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
        //# sourceMappingURL=FadeElem.js.map
        