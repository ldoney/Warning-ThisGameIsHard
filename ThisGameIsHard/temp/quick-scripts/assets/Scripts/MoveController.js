(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/MoveController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6e2119cwqJE9JopTWYVgL5Z', 'MoveController', __filename);
// Scripts/MoveController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MoveController = /** @class */ (function (_super) {
    __extends(MoveController, _super);
    function MoveController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    MoveController.prototype.onLoad = function () {
        this.node.parent.on('touchmove', this.onDeviceTouchEvent, this);
        this.node.on("touchstart", this.onDeviceTouchEvent, this);
        this.node.on("touchend", this.onDeviceTouchEvent, this);
    };
    MoveController.prototype.start = function () {
    };
    MoveController.prototype.onDeviceTouchEvent = function (touch, event) {
        if (this.node.parent.getComponent("Game").inSession) {
            var a = touch.getLocation();
            this.node.setPosition((a.x - this.node.parent.width / 2), (a.y - this.node.parent.height / 2));
        }
    };
    MoveController.prototype.update = function (dt) {
        if (this.node.parent.getComponent("Game").inSession) {
            var ball = this.node.parent.getChildByName("Ball");
            var distX = this.node.x - ball.x;
            var distY = this.node.y - ball.y;
            var angle = Math.atan2(this.node.x - ball.x, this.node.y - ball.y) * (180 / Math.PI);
            this.node.setRotation(angle);
        }
    };
    MoveController = __decorate([
        ccclass
    ], MoveController);
    return MoveController;
}(cc.Component));
exports.default = MoveController;

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
        //# sourceMappingURL=MoveController.js.map
        