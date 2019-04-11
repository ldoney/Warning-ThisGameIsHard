(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/CoinControl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f9eef12XrlKApBFSRbzsdrn', 'CoinControl', __filename);
// Scripts/CoinControl.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CoinControl = /** @class */ (function (_super) {
    __extends(CoinControl, _super);
    function CoinControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // LIFE-CYCLE CALLBACKS:
        _this.padX = 10;
        _this.padY = 10;
        _this.maxTime = 5;
        _this.currentTime = _this.maxTime;
        return _this;
    }
    CoinControl_1 = CoinControl;
    CoinControl.prototype.onLoad = function () {
        this.spawnCoin();
        cc.director.getCollisionManager().enabled = true;
        this.node.addComponent(cc.CircleCollider);
        this.node.getComponent(cc.CircleCollider).radius = this.node.width / 2;
        this.node.getComponent(cc.CircleCollider).enabled = true;
    };
    CoinControl.prototype.onCollisionEnter = function (other, self) {
        if (other.node.name == "Ball") {
            this.node.parent.getComponent("Game").addCoin(1);
            this.spawnCoin();
        }
    };
    CoinControl.prototype.spawnCoin = function () {
        var canvas = this.node.getParent();
        var width = (canvas.width / 2);
        var height = (canvas.height / 2) - this.padY;
        if (this.node.getPosition() != null) {
            var x = this.node.getPosition().x;
            var y = this.node.getPosition().y;
            var faded = cc.instantiate(this.node);
            faded.removeComponent(CoinControl_1);
            this.node.parent.addChild(faded);
            faded.runAction(cc.fadeOut(0.125));
        }
        this.node.setPosition((Math.random() * (width + this.padX)) - (width - this.padX), (Math.random() * (height + this.padY)) - (height - this.padY));
        this.currentTime = this.maxTime;
    };
    CoinControl.prototype.start = function () {
    };
    CoinControl.prototype.update = function (dt) {
        if (this.node.parent.getComponent("Game").inSession) {
            this.currentTime -= dt;
            this.node.parent.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = (this.currentTime / this.maxTime);
            if (this.currentTime <= 0) {
                this.node.parent.getComponent("Game").gameOver();
            }
        }
    };
    var CoinControl_1;
    __decorate([
        property
    ], CoinControl.prototype, "padX", void 0);
    __decorate([
        property
    ], CoinControl.prototype, "padY", void 0);
    __decorate([
        property
    ], CoinControl.prototype, "maxTime", void 0);
    CoinControl = CoinControl_1 = __decorate([
        ccclass
    ], CoinControl);
    return CoinControl;
}(cc.Component));
exports.default = CoinControl;

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
        //# sourceMappingURL=CoinControl.js.map
        