(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripts/Objects/ColorScheme.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a417bSr6wlIRIL19nUr+PTO', 'ColorScheme', __filename);
// Scripts/Objects/ColorScheme.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ColorScheme = /** @class */ (function () {
    function ColorScheme() {
    }
    ColorScheme.prototype.Load = function () {
        this.loadSchemeFromInt(Math.round(Math.random() * ColorScheme.numSchemes + 1) - 1);
    };
    ColorScheme.prototype.toHex = function (col) {
        return col.toHEX(col);
    };
    ColorScheme.prototype.fromHex = function (hex) {
        var temp = cc.Color.BLACK;
        return temp.fromHEX("#" + hex);
    };
    ColorScheme.prototype.loadColors = function (canvas) {
        canvas.color = this.curScheme.Background;
        for (var i = 0; i < canvas.childrenCount; i++) {
            switch (canvas.children[i].group) {
                case "Background":
                    canvas.children[i].color = this.curScheme.Background;
                    break;
                case "Primary":
                    canvas.children[i].color = this.curScheme.Primary;
                    break;
                case "Secondary":
                    canvas.children[i].color = this.curScheme.Secondary;
                    break;
                case "Tertiary":
                    canvas.children[i].color = this.curScheme.Tertiary;
                    break;
                case "Quatrenary":
                    canvas.children[i].color = this.curScheme.Quatrenary;
                    break;
                case "BTN":
                    canvas.children[i].getChildByName("Background").color = this.curScheme.Secondary;
                    canvas.children[i].getChildByName("Label").color = this.curScheme.Background;
                    break;
                default:
                    break;
            }
        }
    };
    ColorScheme.prototype.loadSchemeFromInt = function (i) {
        this.curScheme = new scheme();
        switch (i) {
            case 0:
                this.curScheme.Background = this.fromHex("F0A868");
                this.curScheme.Primary = this.fromHex("6A8D73");
                this.curScheme.Secondary = this.fromHex("F4FDD9");
                this.curScheme.Tertiary = this.fromHex("E4FFE1");
                this.curScheme.Quatrenary = this.fromHex("FFE8C2");
                break;
            case 1:
                this.curScheme.Background = this.fromHex("0E273C");
                this.curScheme.Primary = this.fromHex("E8D7F1");
                this.curScheme.Secondary = this.fromHex("D3BCCC");
                this.curScheme.Tertiary = this.fromHex("A167A5");
                this.curScheme.Quatrenary = this.fromHex("4A306D");
                break;
            case 2:
                this.curScheme.Background = this.fromHex("F8E9E9");
                this.curScheme.Primary = this.fromHex("394648");
                this.curScheme.Secondary = this.fromHex("69995D");
                this.curScheme.Tertiary = this.fromHex("CBAC88");
                this.curScheme.Quatrenary = this.fromHex("EDB6A3");
                break;
            case 3:
                this.curScheme.Background = this.fromHex("CCDDE2");
                this.curScheme.Primary = this.fromHex("48ACF0");
                this.curScheme.Secondary = this.fromHex("594236");
                this.curScheme.Tertiary = this.fromHex("6F584B");
                this.curScheme.Quatrenary = this.fromHex("93A3BC");
                break;
            case 4:
                this.curScheme.Background = this.fromHex("04030F");
                this.curScheme.Primary = this.fromHex("73EEDC");
                this.curScheme.Secondary = this.fromHex("73C2BE");
                this.curScheme.Tertiary = this.fromHex("776885");
                this.curScheme.Quatrenary = this.fromHex("5F1A37");
                break;
            case 5:
                this.curScheme.Background = this.fromHex("97C8EB");
                this.curScheme.Primary = this.fromHex("001011");
                this.curScheme.Secondary = this.fromHex("093A3E");
                this.curScheme.Tertiary = this.fromHex("3AAFB9");
                this.curScheme.Quatrenary = this.fromHex("64E9EE");
                break;
            case 6:
                this.curScheme.Background = this.fromHex("051923");
                this.curScheme.Primary = this.fromHex("00A6FB");
                this.curScheme.Secondary = this.fromHex("0582CA");
                this.curScheme.Tertiary = this.fromHex("006494");
                this.curScheme.Quatrenary = this.fromHex("003554");
                break;
            case 7:
                this.curScheme.Background = this.fromHex("073B4C");
                this.curScheme.Primary = this.fromHex("EF476F");
                this.curScheme.Secondary = this.fromHex("FFD166");
                this.curScheme.Tertiary = this.fromHex("06D6A0");
                this.curScheme.Quatrenary = this.fromHex("118AB2");
                break;
            case 8:
                this.curScheme.Background = this.fromHex("DBA159");
                this.curScheme.Primary = this.fromHex("D0E3CC");
                this.curScheme.Secondary = this.fromHex("F7FFDD");
                this.curScheme.Tertiary = this.fromHex("FCFDAF");
                this.curScheme.Quatrenary = this.fromHex("EFD780");
                break;
            case 9:
                this.curScheme.Background = this.fromHex("35524A");
                this.curScheme.Primary = this.fromHex("A2E8DD");
                this.curScheme.Secondary = this.fromHex("779CAB");
                this.curScheme.Tertiary = this.fromHex("627C85");
                this.curScheme.Quatrenary = this.fromHex("32DE8A");
                break;
            case 10:
                this.curScheme.Background = this.fromHex("020100");
                this.curScheme.Primary = this.fromHex("FDFFFC");
                this.curScheme.Secondary = this.fromHex("235789");
                this.curScheme.Tertiary = this.fromHex("C1292E");
                this.curScheme.Quatrenary = this.fromHex("F1D302");
                break;
            case 11:
                this.curScheme.Background = this.fromHex("68C5DB");
                this.curScheme.Primary = this.fromHex("D7263D");
                this.curScheme.Secondary = this.fromHex("02182B");
                this.curScheme.Tertiary = this.fromHex("0197F6");
                this.curScheme.Quatrenary = this.fromHex("448FA3");
                break;
            case 12:
                this.curScheme.Background = this.fromHex("BBBBBF");
                this.curScheme.Primary = this.fromHex("52D1DC");
                this.curScheme.Secondary = this.fromHex("475B5A");
                this.curScheme.Tertiary = this.fromHex("8D8E8E");
                this.curScheme.Quatrenary = this.fromHex("A3A9AA");
                break;
            case 13:
                this.curScheme.Background = this.fromHex("5E6472");
                this.curScheme.Primary = this.fromHex("FFA69E");
                this.curScheme.Secondary = this.fromHex("FAF3DD");
                this.curScheme.Tertiary = this.fromHex("B8F2E6");
                this.curScheme.Quatrenary = this.fromHex("AED9E0");
                break;
            case 14:
                this.curScheme.Background = this.fromHex("FF9F1C");
                this.curScheme.Primary = this.fromHex("011627");
                this.curScheme.Secondary = this.fromHex("FDFFFC");
                this.curScheme.Tertiary = this.fromHex("2EC4B6");
                this.curScheme.Quatrenary = this.fromHex("E71D36");
                break;
            case 15:
                this.curScheme.Background = this.fromHex("020122");
                this.curScheme.Primary = this.fromHex("F2F3AE");
                this.curScheme.Secondary = this.fromHex("EDD382");
                this.curScheme.Tertiary = this.fromHex("FC9E4F");
                this.curScheme.Quatrenary = this.fromHex("F4442E");
                break;
            /*
        case 16:
            this.curScheme.Background = this.fromHex("");
            this.curScheme.Primary = this.fromHex("");
            this.curScheme.Secondary = this.fromHex("");
            this.curScheme.Tertiary = this.fromHex("");
            this.curScheme.Quatrenary = this.fromHex("");
            break;
*/
            default:
                break;
        }
        this.curScheme.Background.setA(255);
        this.curScheme.Primary.setA(255);
        this.curScheme.Secondary.setA(255);
        this.curScheme.Tertiary.setA(255);
        this.curScheme.Quatrenary.setA(255);
    };
    // LIFE-CYCLE CALLBACKS:
    ColorScheme.numSchemes = 15;
    return ColorScheme;
}());
exports.ColorScheme = ColorScheme;
var scheme = /** @class */ (function () {
    function scheme() {
    }
    return scheme;
}());

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
        //# sourceMappingURL=ColorScheme.js.map
        