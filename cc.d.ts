declare module "cc" {
    /**
     * @zh
     * 场景树中的基本节点，基本特性有：
     * * 具有层级关系
     * * 持有各类组件
     * * 维护空间变换（坐标、旋转、缩放）信息
     */
    /**
     * @en
     * Class of all entities in Cocos Creator scenes.
     * Basic functionalities include:
     * * Hierarchy management with parent and children
     * * Components management
     * * Coordinate system with position, scale, rotation in 3d space
     * @zh
     * Cocos Creator 场景中的所有节点类。
     * 基本特性有：
     * * 具有层级关系
     * * 持有各类组件
     * * 维护 3D 空间左边变换（坐标、旋转、缩放）信息
     */
    export interface Node{
        getTransfrom():UITransform;
    }
    
}