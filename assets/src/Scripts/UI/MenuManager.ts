import { _decorator, Component, Node, director, Label, sys } from 'cc'
import EventManager from '../../Runtime/EventManager'
import { EVENT_ENUM, SCENE_ENUM } from '../../Enum'
import Utils from '../../Utils/Utils';
import levels from '../../Levels';
import FaderManager from '../../Runtime/FaderManager';
const { ccclass, property } = _decorator


@ccclass('MenuManager')
export class MenuManager extends Component {

  @property(Label) lbLevel:Label = null;

  levelIndex = 1;

  protected start(): void {
    let level = Utils.Instance.getLevelLocalData();
    this.levelIndex = level || this.levelIndex;
    this.updateLevel();
  }

  handleRevoke() {
    EventManager.Instance.emit(EVENT_ENUM.REVOKE_STEP)
  }

  handleRestart() {
    EventManager.Instance.emit(EVENT_ENUM.RESTART_LEVEL)
  }

  handleOut() {
    EventManager.Instance.emit(EVENT_ENUM.QUIT_BATTLE)
  }

  async handleStart() {
    await FaderManager.Instance.fadeIn(300)
    director.loadScene(SCENE_ENUM.Battle)
  }

  updateLevel(){
    this.lbLevel && (this.lbLevel.string = "Level:" + this.levelIndex.toString());
    Utils.Instance.setLevelLocalData(this.levelIndex) ;
  }

  nextLevel() {
    
    if(this.levelIndex >= Object.keys(levels).length){
      console.log("已经是最后一关");
      return;
    }
    this.levelIndex++;
    this.updateLevel();
  }

  preLevel() {
    if(this.levelIndex <= 1){
      console.log("已经是第一关");
      return;
    }
    this.levelIndex--;
    this.updateLevel();
  }
}
