import {Helpers} from "./Helpers"
export class ColorScheme{
    curScheme:scheme;
    Load () {
        this.loadSchemeFromInt(Math.round(Math.random() * ColorScheme.numSchemes + 1) - 1);
    }
    toHex(col)
    {
        return col.toHEX(col);
    }
    fromHex(hex) {
        var temp = cc.Color.BLACK;
        return temp.fromHEX("#" + hex);
    }
    checkForSchemeUpdates()
    {
        if(localStorage.getItem("schemeDB") != null)
        {
        var old = JSON.parse(localStorage.getItem("schemeDB"));
        Helpers.schemeList.List.forEach(element => {
            if(!old.Balls.some(e => e.ID === element.ID))
            {
                old.Balls.push(element);
            }
        });
        localStorage.setItem("schemeDB", JSON.stringify(old));
        }
    }
    loadColors(canvas:cc.Node)
    {
        canvas.color = this.curScheme.Background;
        for(var i = 0; i < canvas.childrenCount; i++)
        {
            switch(canvas.children[i].group)
            {
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
    }
    static numSchemes:number = 8;
    loadRandomScheme(){
        var res = Helpers.schemeList.List.filter(e => e.Enabled == true);
        var elm = res[Math.floor((Math.random()*res.length))];
        localStorage.setItem("lastScheme", elm.ID);
        this.loadSchemeFromInt(parseInt(elm.ID));
    }
    loadSchemeFromInt(i:number)
    {
        this.curScheme = new scheme();
        var obj = Helpers.schemeList.List.find(e => parseInt(e.ID) == i);

        this.curScheme.Background = this.fromHex(obj.Background);
        this.curScheme.Primary = this.fromHex(obj.Primary);
        this.curScheme.Secondary = this.fromHex(obj.Secondary);
        this.curScheme.Tertiary = this.fromHex(obj.Tertiary);
        this.curScheme.Quatrenary = this.fromHex(obj.Quatrenary);

        this.curScheme.Background.setA(255);
        this.curScheme.Primary.setA(255);
        this.curScheme.Secondary.setA(255);
        this.curScheme.Tertiary.setA(255);
        this.curScheme.Quatrenary.setA(255);
    }
}

class scheme
{
    Name:string;
    Background:cc.Color;
    Primary:cc.Color;
    Secondary:cc.Color;
    Tertiary:cc.Color;
    Quatrenary:cc.Color;
}