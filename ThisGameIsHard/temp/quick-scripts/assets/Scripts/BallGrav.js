(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/BallGrav.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '16ea2rLNStD163smIlvNLLA', 'BallGrav', __filename);
// Scripts/BallGrav.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BallControl = /** @class */ (function (_super) {
    __extends(BallControl, _super);
    function BallControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Multiplier = 50;
        _this.RotateMult = 1.0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    BallControl.prototype.onLoad = function () {
        cc.director.getCollisionManager().enabled = true;
        this.node.addComponent(cc.CircleCollider);
        this.node.getComponent(cc.CircleCollider).radius = this.node.width / 2;
        this.node.getComponent(cc.CircleCollider).enabled = true;
    };
    BallControl.prototype.start = function () {
    };
    BallControl.prototype.update = function (dt) {
        if (this.node.parent.getComponent("Game").inSession) {
            if ((this.node.position.x < -(this.node.parent.width / 2) - this.node.width / 2) ||
                (this.node.position.y < -(this.node.parent.height / 2) - this.node.height / 2) ||
                (this.node.position.x > Math.abs(-(this.node.parent.width / 2) - this.node.width / 2)) ||
                (this.node.position.y > Math.abs(-(this.node.parent.height / 2) - this.node.height / 2))) {
                this.node.parent.getComponent("Game").gameOver();
            }
            var magnet = this.node.parent.getChildByName("Magnet");
            var distX = this.node.x - magnet.x;
            var distY = this.node.y - magnet.y;
            var distZ = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
            var nodeAction = cc.moveBy(this.Multiplier, cc.v2(distX, distY));
            this.node.rotation = this.RotateMult * ((this.node.rotationX) -= (dt * distZ));
            this.node.runAction(nodeAction);
        }
    };
    __decorate([
        property
    ], BallControl.prototype, "Multiplier", void 0);
    __decorate([
        property
    ], BallControl.prototype, "RotateMult", void 0);
    BallControl = __decorate([
        ccclass
    ], BallControl);
    return BallControl;
}(cc.Component));
exports.default = BallControl;

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
        //# sourceMappingURL=BallGrav.js.map
        