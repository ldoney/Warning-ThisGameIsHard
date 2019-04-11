"use strict";
cc._RF.push(module, '85d12JJq15NA4VDiD20lXDU', 'MenuBtnCntrl');
// Scripts/MenuBtnCntrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.node.on('touchstart', this.onClickTouchEvent, this);
    };
    NewClass.prototype.onClickTouchEvent = function (e) {
        var Game = this.node.parent.getComponent("Game");
        Game.menu();
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();