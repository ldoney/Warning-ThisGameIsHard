import {ColorScheme} from "./ColorScheme"
export class Helpers {
    static schemeList={
        List:[
        {
            Enabled:true,
            Unlocked:true,
            ID:"000",
            Background:"C2C1C2",
            Primary:"C41E3D",
            Secondary:"890510",
            Tertiary:"000F08",
            Quatrenary:"36393B",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"001",
            Background:"000103",
            Primary:"E55400",
            Secondary:"FE9920",
            Tertiary:"FFB86F",
            Quatrenary:"0D1F2D",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"002",
            Background:"191716",
            Primary:"DAA520",
            Secondary:"FFD700",
            Tertiary:"8B4513",
            Quatrenary:"250902",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"003",
            Background:"062417",
            Primary:"89CC68",
            Secondary:"3E8914",
            Tertiary:"3DA35D",
            Quatrenary:"92BDA3",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"004",
            Background:"1D1D1D",
            Primary:"3EF93E",
            Secondary:"7FC67F",
            Tertiary:"4C664C",
            Quatrenary:"2C322C",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"005",
            Background:"050505",
            Primary:"59B5C1",
            Secondary:"4987A4",
            Tertiary:"445E89",
            Quatrenary:"21295C",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"006",
            Background:"BE95C4",
            Primary:"631D76",
            Secondary:"69306D",
            Tertiary:"A5668B",
            Quatrenary:"19191C",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"007",
            Background:"231C07",
            Primary:"C6AC8F",
            Secondary:"715245",
            Tertiary:"5E503F",
            Quatrenary:"1C2A31",
        },
        {
            Enabled:true,
            Unlocked:true,
            ID:"008",
            Background:"EDEDED",
            Primary:"252525",
            Secondary:"424144",
            Tertiary:"ABAAAA",
            Quatrenary:"DDDDDD",
        }
    ]}
    static user =
    {
        HighScore: 0.00,
        Count:0,
        Coins:0,
        NetWorth:0,
        TotalTime:0,
        AllTimes:[
            
        ],
    }
    static skinDB = {
        Balls: [
            {
                ID: "000",
                unl:true,
                cost:0.00,
            },
            {
                ID: "001",
                unl:false,
                cost:10.00,
            },
            {
                ID: "002",
                unl:false,
                cost:20.00,
            },
            {
                ID: "003",
                unl:false,
                cost:30.00,
            },
            {
                ID: "004",
                unl:false,
                cost:40.00,
            },
            {
                ID: "005",
                unl:false,
                cost:50.00,
            },
            {
                ID: "006",
                unl:false,
                cost:60.00,
            },
            {
                ID: "007",
                unl:false,
                cost:70.00,
            },
            {
                ID: "008",
                unl:false,
                cost:80.00,
            },
            {
                ID: "009",
                unl:false,
                cost:90.00,
            },
            {
                ID: "010",
                unl:false,
                cost:100.00,
            },
            {
                ID: "011",
                unl:false,
                cost:150.00,
            },
            {
                ID: "012",
                unl:false,
                cost:250.00,
            },
            {
                ID: "013",
                unl:false,
                cost:300.00,
            },
            {
                ID: "014",
                unl:false,
                cost:300.00,
            },
            {
                ID: "015",
                unl:false,
                cost:300.00,
            },
        ],
    }
    static scheme:ColorScheme = null;
    static skins =
    {
        CurBall: "000",
        totalSkins: 1,
    }
    static setUpAll()
    {
        this.setUpLastScheme();
        this.setUpSkinDB();
        this.setUpSkins();
        this.setUpUsers();
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
