import {ColorScheme} from "./ColorScheme"
export class Helpers {
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
        if(localStorage.getItem("lastScheme") == null)
        {
            localStorage.setItem("lastScheme", (Math.floor(Math.random() * ColorScheme.numSchemes)) + "");
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }else
        {
            this.scheme.loadSchemeFromInt(parseInt(localStorage.getItem("lastScheme")));
        }
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
    static updateSkins()
    {
        localStorage.setItem("skins", JSON.stringify(this.skins));
        localStorage.setItem("skinDB", JSON.stringify(this.skinDB));
    }
    static updatePlayer()
    {
        localStorage.setItem("userData", JSON.stringify(this.user));
    }
}
