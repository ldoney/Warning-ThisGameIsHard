const {ccclass, property} = cc._decorator;

@ccclass
export default class CoinControl extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property
    padX:number = 50

    @property
    padY:number = 50

    @property
    maxTime:number = 5

    currentTime:number = this.maxTime;
    
    onLoad () {
        this.spawnCoin();
        cc.director.getCollisionManager().enabled = true;
    
       this.node.addComponent(cc.CircleCollider);
       this.node.getComponent(cc.CircleCollider).radius = this.node.width/2;
       this.node.getComponent(cc.CircleCollider).enabled = true;
    }
    onCollisionStay(other)
    {
        if(other.node.name == "Ball")
        {
            this.node.parent.getComponent("Game").addCoin(1);
            this.spawnCoin();
        }
    }
    onCollisionEnter(other)
    {
        this.onCollisionStay(other);
    }

    spawnCoin() {
        var canvas = this.node.getParent();
        var width = (canvas.width/2);
        var height = (canvas.height/2);
        if(this.node.getPosition() != null)
        {
            var faded = cc.instantiate(this.node);
            faded.removeComponent(CoinControl);
            this.node.parent.addChild(faded);

            faded.runAction(cc.fadeOut(0.125));
        }
        this.node.setPosition(
                            (Math.random() * (width + this.padX)) - (width - this.padX), 
                            (Math.random() * (height + this.padY)) - (height - this.padY));

        this.currentTime = this.maxTime;
    }
    update (dt: number) {
        if(this.node.parent.getComponent("Game").inSession)
        {
            this.currentTime -= dt;
            this.node.parent.getChildByName("progressBar").getComponent(cc.ProgressBar).progress = (this.currentTime / this.maxTime);
            if(this.currentTime <= 0)
            {
                this.node.parent.getComponent("Game").gameOver();
            }
        }
    }
}
