"use strict";
cc._RF.push(module, '6d094GFt+xJmLxccBv4xcYM', 'BarDouble');
// Scripts/BarDouble.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewClass.prototype.update = function (dt) {
        var othr_bar = this.node.parent.getChildByName("progressBar").getComponent(cc.ProgressBar);
        this.node.getComponent(cc.ProgressBar).progress = othr_bar.progress;
        this.node.getChildByName("bar").color = this.node.color;
    };
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();