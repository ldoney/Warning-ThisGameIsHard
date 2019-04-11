"use strict";
cc._RF.push(module, '24411NjGNpE6a8744JKN7Tb', 'RestartControl');
// Scripts/RestartControl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RestartControl = /** @class */ (function (_super) {
    __extends(RestartControl, _super);
    function RestartControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Resume = true;
        return _this;
    }
    RestartControl.prototype.onLoad = function () {
        this.node.on("touchstart", this.onDeviceTouchEvent, this);
    };
    RestartControl.prototype.onDeviceTouchEvent = function (touch, event) {
        if (this.Resume) {
            cc.log("Resume");
            this.node.parent.getComponent("Game").unpause();
        }
        else {
            cc.log("Restart");
            this.node.parent.getComponent("Game").restart();
        }
    };
    RestartControl.prototype.switchModes = function (i) {
        var sprite = this.node.getComponent(cc.Sprite);
        if (i == 1) {
            this.Resume = true;
            cc.loader.loadRes("Sprites/Menu/BackBtn", function (err, res) {
                if (!err) {
                    sprite.spriteFrame = new cc.SpriteFrame(res);
                }
                else {
                    cc.log(err.message);
                }
            });
        }
        else if (i == 0) {
            this.Resume = false;
            cc.loader.loadRes("Sprites/Menu/ReturnArr", function (err, res) {
                if (!err) {
                    sprite.spriteFrame = new cc.SpriteFrame(res);
                }
                else {
                    cc.log(err.message);
                }
            });
        }
    };
    RestartControl = __decorate([
        ccclass
    ], RestartControl);
    return RestartControl;
}(cc.Component));
exports.default = RestartControl;

cc._RF.pop();