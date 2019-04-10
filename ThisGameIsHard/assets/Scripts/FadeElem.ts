const {ccclass, property} = cc._decorator;

@ccclass
export default class FadeElem extends cc.Component {

    OldOpac:number = -1;

    fade(o)
    {
        if(this.OldOpac == -1)
        {
            this.OldOpac = this.node.opacity;
        }
        this.node.runAction(cc.fadeTo(0.0725, o));
    }
    unFade()
    {
        if(this.OldOpac != -1)
        {
            this.node.runAction(cc.fadeTo(0.0725, this.OldOpac));
        }
    }
}
