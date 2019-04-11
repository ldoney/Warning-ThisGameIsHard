const {ccclass, property} = cc._decorator;

@ccclass
export default class RestartControl extends cc.Component {
    
    Resume:boolean = true;
    onLoad(){
        this.node.on("touchstart", this.onDeviceTouchEvent, this);
    }
    onDeviceTouchEvent(touch, event)
    {
        if(this.Resume)
        {
            cc.log("Resume");
            this.node.parent.getComponent("Game").unpause();
        }else
        {
            cc.log("Restart");
            this.node.parent.getComponent("Game").restart();
        }
    }
    switchModes(i)
    {
        var sprite = this.node.getComponent(cc.Sprite);
        if(i == 1)
        {
            this.Resume = true;
            cc.loader.loadRes("Sprites/Menu/BackBtn", function (err, res) {
                if(!err)
                {
                    sprite.spriteFrame = new cc.SpriteFrame(res);
                }else
                {
                    cc.log(err.message);
                }
            });
        }else if(i == 0)
        {
            this.Resume = false;
            cc.loader.loadRes("Sprites/Menu/ReturnArr", function (err, res) {
                if(!err)
                {
                    sprite.spriteFrame = new cc.SpriteFrame(res);
                }else
                {
                    cc.log(err.message);
                }
            });
        }
    }
}
