import { game, RenderRoot2D, Node, director, Scene } from 'cc'
import Singleton from '../Base/Singleton'
import { DEFAULT_FADE_DURATION, DrawManager } from '../Scripts/UI/DrawManager'
import { createUINode } from '../Utils'

export default class FaderManager extends Singleton {
  static get Instance() {
    return super.GetInstance<FaderManager>()
  }

  private _fader: DrawManager = null

  get fader(): DrawManager {
    if (this._fader !== null) {
      return this._fader
    }

    const root = createUINode()
    root.addComponent(RenderRoot2D)
    const canvas = (director.getScene() as Scene).getChildByName("Canvas") as any as Node;
    root.setPosition(canvas.position.x, canvas.position.y)
    const node = createUINode()
    node.setParent(root)
    this._fader = node.addComponent(DrawManager)
    this._fader.init()
    game.addPersistRootNode(root)

    return this._fader
  }

  async fadeIn(duration: number = DEFAULT_FADE_DURATION) {
    await this.fader.fadeIn(duration)
  }

  async fadeOut(duration: number = DEFAULT_FADE_DURATION) {
    await this.fader.fadeOut(duration)
  }

  async mask() {
    await this.fader.mask()
  }
}
