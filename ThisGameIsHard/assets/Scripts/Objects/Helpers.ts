import {ColorScheme} from "./ColorScheme"
import {jsOBJs} from "./jsOBJs"
export class Helpers {
    static schemeList = jsOBJs.schemeList;    
    static skinDB     = jsOBJs.skinDB;
    static skins      = jsOBJs.skins;
    static user       = jsOBJs.user;
    static scheme:ColorScheme = null;
    static toHex(col)
    {
        return col.toHEX(col);
    }
    static fromHex(hex) {
        var temp = cc.Color.BLACK;
        return temp.fromHEX("#" + hex);
    }
    static clearAll()
    {
        this.schemeList = jsOBJs.schemeList;    
        this.skinDB     = jsOBJs.skinDB;
        this.skins      = jsOBJs.skins;
        this.user       = jsOBJs.user;
        this.scheme     = null;
    }
    static setUpAll()
    {
        this.checkForDBUpdates();
        this.setUpLastScheme();
        this.setUpSkinDB();
        this.setUpSkins();
        this.setUpUsers();
        this.setUpSchemes();
        this.scheme.checkForSchemeUpdates();
    }   
    static setUpLastScheme()
    {
        this.scheme = new ColorScheme();
        this.randomizeScheme();
    }
    static setUpSkinDB()
    {
        if(localStorage.getItem("skinDB") != null)
        {
            this.skinDB = JSON.parse(localStorage.getItem("skinDB"));
        }else
        {
            this.updateSkins();
        }
    } 
    static setUpUsers()
    {
        if(localStorage.getItem("userData") != null)
        {
            this.user = JSON.parse(localStorage.getItem("userData"));
        }
        else
        {
            this.updatePlayer();
        }
    }
    static setUpSchemes()
    {
        if(localStorage.getItem("schemeDB") != null)
        {
            this.schemeList = JSON.parse(localStorage.getItem("schemeDB"));
        }
        else
        {
            this.updateSchemes();
        }
    }
    static getLootbox(time:number)
    {
        var rand = ((Math.random() * 100) + 1);
        if((time > 100 && rand <= 25) || 
           (time > 50 && rand <= 15)  ||
           (time > 25 && rand <= 10)  ||
           (time > 10 && rand <= 1))
        {
            return true;
        }
        return false;
    }
    static setUpSkins()
    {
        
        if(localStorage.getItem("skins") != null)
        {
            this.skins = JSON.parse(localStorage.getItem("skins"));
        }else
        {
            this.updateSkins();
        }
    }
    static updateDB()
    {
        localStorage.setItem("skinDB", JSON.stringify(this.skinDB));
    }
    static updateSchemes()
    {
        localStorage.setItem("schemeDB", JSON.stringify(this.schemeList));
    }
    static updateSkins()
    {
        this.updateDB();
        this.updateUsrSkins();
    }
    static updateUsrSkins()
    {
        localStorage.setItem("skins", JSON.stringify(this.skins));
    }
    static updatePlayer()
    {
        localStorage.setItem("userData", JSON.stringify(this.user));
    }
    static checkForDBUpdates()
    {
        if(localStorage.getItem("skinDB") != null)
        {
        var old = JSON.parse(localStorage.getItem("skinDB"));
        this.skinDB.Balls.forEach(element => {
            if(!old.Balls.some(e => e.ID === element.ID))
            {
                old.Balls.push(element);
            }
        });
        localStorage.setItem("skinDB", JSON.stringify(old));
        }
    }
    static randomizeScheme()
    {
        this.scheme.loadRandomScheme();
        
    }
    static setScheme(val)
    {
        localStorage.setItem("lastScheme", val + "");
        this.scheme.loadSchemeFromInt(val);
    }
    static returnToMenu(node:cc.Node)
    {
        this.switchScenes("MainMenu", node);
    }
    static setFrame(sprite:cc.Sprite, path:string)
    {
        cc.loader.loadRes(path, function (err, res) {
            if(!err)
            {
                sprite.spriteFrame = new cc.SpriteFrame(res);
            }else
            {
                cc.log(err.message);
            }
        });
    }
    static switchScenes(scene:string, node:cc.Node)
    {
        node.runAction(cc.sequence( 
            cc.fadeOut(0.25), 
            cc.callFunc(function () {
                cc.director.loadScene(scene);
            })
        )); 
        
    }
}
