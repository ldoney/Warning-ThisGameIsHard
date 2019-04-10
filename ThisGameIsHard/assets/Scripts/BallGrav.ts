const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControl extends cc.Component {

    @property
    Multiplier: number = 50;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.node.addComponent(cc.CircleCollider);
        this.node.getComponent(cc.CircleCollider).radius = this.node.width/2;
        this.node.getComponent(cc.CircleCollider).enabled = true;
    }

    start () {
    }

    
    update (dt) {
        if(this.node.parent.getComponent("Game").inSession)
        {
            if((this.node.position.x < -(this.node.parent.width / 2) - this.node.width / 2) ||
                (this.node.position.y < -(this.node.parent.height / 2) - this.node.height / 2))
            {
                this.node.parent.getComponent("Game").gameOver();
            }
            var magnet = this.node.parent.getChildByName("Magnet");        
            var distX = this.node.x - magnet.x;
            var distY = this.node.y - magnet.y;
            var nodeAction = cc.moveBy( 50, cc.v2( distX, distY ) );

            this.node.runAction(nodeAction);
        }
    }
}
