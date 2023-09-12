import { JsonAsset, Layers, Node, Prefab, SpriteFrame, UITransform, Vec2, assetManager, instantiate, resources, sys } from 'cc'
import Singleton from '../Base/Singleton';

export enum LocalStorage{
  LEVEL = "LEVEL",
}

export default class Utils extends Singleton{

  jsonData = {};

  static get Instance() {
    return super.GetInstance<Utils>()
  }

  Init(){
    // let json =  JSON.parse('{"1":101,"2":201, "aa":11}')
  //   assetManager.loadBundle("resources", (err, bundle) => {
  //     if (err) {
  //         console.error('Failed to load bundle:', err);
  //         return;
  //     }
  //     // 资源包加载成功
  //     // 在这里可以通过 bundle 来访问和使用资源
  //     console.log("资源包加载成功")
  //     // 加载预设
  //     // bundle.load('prefabs/myPrefab', Prefab, (err, prefab) => {
  //     //     if (err) {
  //     //         console.error('Failed to load prefab:', err);
  //     //         return;
  //     //     }
  //     //     // 预设加载成功
  //     //     // 可以使用所加载的预设进行实例化、添加到场景中等操作
  //     // });
  //   })
    this.loadJsonRes("json/configCommon");
  }

  createView(url:string, parent:Node){
    let strs = url.split("/")
    if(strs && strs.length > 0){
      let child = parent.getChildByName(strs[strs.length-1]);
      if(child){
        console.warn("已存在该页面");
        return;
      }
    }
    resources.load(url, Prefab,(err, prefab)=>{
      if(err){
        console.error("加载失败");
        return;
      }
      const view = instantiate(prefab);
      parent.addChild(view)
    })
  }

  /**加载json文件 */
  loadJsonRes(url:string){
    resources.load(url, JsonAsset, null, (err, json)=>{
      if(err){
        console.error("加载失败");
        return;
      }
      console.log("加载完成");
      json;
      let strs = url.split("/")
      if(strs && strs.length > 0){
        this.jsonData[strs[strs.length-1]] = json.json;
      }
    })
    // res = resources.get(url, JsonAsset)
  }

  /**关卡信息存本地 */
  setLevelLocalData(level:number | string){
    let levelStr = "1";
    if(typeof level == "number"){
      levelStr = level.toString();
    }else{
      levelStr = level;
    }
    sys.localStorage.setItem(LocalStorage.LEVEL, levelStr);
  }
  /**获取本地存储的关卡信息 */
  getLevelLocalData(){
    let levelStr = sys.localStorage.getItem(LocalStorage.LEVEL);
    if (levelStr && levelStr.length > 0) return Number(levelStr);
    return null;
  }

} 
