"use strict";
cc._RF.push(module, '82eb58p2QlFd6Bu2cqoqZnw', 'Pause');
// Scripts/Pause.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    NewClass.prototype.onLoad = function () {
        this.node.on('touchstart', this.onPauseTouchEvent, this);
    };
    NewClass.prototype.onPauseTouchEvent = function (e) {
        var Game = this.node.parent.getComponent("Game");
        if (Game.inSession) {
            Game.pause();
        }
        else {
            Game.unpause();
        }
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();