import { _decorator, Component, Node, director } from 'cc'
import { SCENE_ENUM } from '../../Enum'
import FaderManager from '../../Runtime/FaderManager'
import Utils from '../../Utils/Utils'
const { ccclass } = _decorator

@ccclass('StartManager')
export class StartManager extends Component {
  onLoad() {
    director.preloadScene(SCENE_ENUM.Battle)
    Utils.Instance.Init()
    FaderManager.Instance.fadeOut(500)
    // this.node.once(Node.EventType.TOUCH_START, this.handleStart, this)
    this.node.once(Node.EventType.TOUCH_START, this.enterMenuView, this)

  }

  enterMenuView(){
    Utils.Instance.createView("prefabs/Menu", this.node);
  }

  async handleStart() {
    await FaderManager.Instance.fadeIn(300)
    director.loadScene(SCENE_ENUM.Battle)
  }
}
