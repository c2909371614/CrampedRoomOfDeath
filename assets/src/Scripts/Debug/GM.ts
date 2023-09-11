import { Component, _decorator, Node, log } from "cc"
import EventManager from "../../Runtime/EventManager";
import { EVENT_ENUM } from "../../Enum";

const { ccclass, property } = _decorator

// @ts-ignore
window?.vConsole && (window.vConsole.$dom.style.display = 'none')

@ccclass('GM')
export class GM extends Component {
    @property(Node) nextBtn:Node = null;

    @property(Node) preBtn:Node = null;

    // @property(Node) gmNode:Node = null;

    protected start(): void {
        // this.gmNode && (this.gmNode.active = true)
    }

    onClickNextBtn(){
        console.log("onClickNextBtn");
        EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL)
    }

    onClickPreBtn(){
        console.log("onClickPreBtn");
        EventManager.Instance.emit(EVENT_ENUM.PRE_LEVEL)
    }

}