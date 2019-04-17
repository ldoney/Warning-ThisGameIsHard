const {ccclass, property} = cc._decorator;

@ccclass
export default class BallControl extends cc.Component {

    @property
    Multiplier: number = 50;
    @property
    RotateMult:number  = 1.0;

    onLoad () {
        cc.director.getCollisionManager().enabled = true;
        this.node.addComponent(cc.CircleCollider);
        this.node.getComponent(cc.CircleCollider).radius = this.node.width/2;
        this.node.getComponent(cc.CircleCollider).enabled = true;
    }
    
    update (dt) {
        if(this.node.parent.getComponent("Game").inSession)
        {
            if((this.node.position.x < -(this.node.parent.width / 2) - this.node.width / 2) ||
                (this.node.position.y < -(this.node.parent.height / 2) - this.node.height / 2) ||
                (this.node.position.x > Math.abs(-(this.node.parent.width / 2) - this.node.width / 2)) ||
                (this.node.position.y > Math.abs(-(this.node.parent.height / 2) - this.node.height / 2)))
            {
                this.node.parent.getComponent("Game").gameOver();
            }
            var magnet = this.node.parent.getChildByName("Magnet");        
            var distX = this.node.x - magnet.x;
            var distY = this.node.y - magnet.y;
            var distZ = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

            var nodeAction = cc.moveBy( this.Multiplier, cc.v2( distX, distY ) );
            
            this.node.rotation = this.RotateMult * ((this.node.rotationX) -= (dt * distZ));
            this.node.runAction(nodeAction);            
        }
    }
}
