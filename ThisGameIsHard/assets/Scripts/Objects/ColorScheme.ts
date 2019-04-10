export class ColorScheme{

    // LIFE-CYCLE CALLBACKS:
    static numSchemes:number = 11;

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
    loadSchemeFromInt(i:number)
    {
        this.curScheme = new scheme();
        switch(i)
        {
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
                /*
            case 12:
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
    }
}

class scheme
{
    Background:cc.Color;
    Primary:cc.Color;
    Secondary:cc.Color;
    Tertiary:cc.Color;
    Quatrenary:cc.Color;
}