import { Node, UITransform } from "cc";

Node.prototype.getTransfrom = function getTransfrom(this:Node){
    // Node.EventType
    return this.getComponent(UITransform)
};