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
        if(i == 1)
        {
            this.Resume = true;
            this.node.getComponentInChildren(cc.Label).string = "Resume";
        }else if(i == 0)
        {
            this.Resume = false;
            this.node.getComponentInChildren(cc.Label).string = "Restart";
        }
    }
}
