import { Component, Prefab, ScrollView, _decorator,Node, instantiate } from "cc";

const {ccclass, property} = _decorator;

@ccclass
export default class VirtualList extends Component {
    @property(Prefab)
    listItemPrefab: Prefab = null;

    @property
    listItemHeight: number = 100;

    @property
    totalItems: number = 1000;

    scrollView: ScrollView = null;
    content: Node = null;
    visibleItemCount: number = 0;
    startIndex: number = 0;

    onLoad() {
        this.scrollView = this.getComponent(ScrollView);
        this.content = this.scrollView.content;
        this.visibleItemCount = Math.ceil(this.scrollView.node.getTransfrom().height / this.listItemHeight) + 1;
        this.startIndex = 0;

        // 初始化虚拟列表
        this.updateVirtualList();
    }

    updateVirtualList() {
        // 清空内容节点下的所有子节点
        this.content.removeAllChildren();

        // 计算可见的列表项范围
        let startIdx = Math.max(0, this.startIndex - 1);
        let endIdx = Math.min(this.startIndex + this.visibleItemCount, this.totalItems);

        // 动态创建和回收列表项节点
        for (let i = startIdx; i < endIdx; i++) {
            let listItem = this.createOrUpdateListItem(i);
            listItem.setPosition(listItem.position.x, -(i * this.listItemHeight));
            this.content.addChild(listItem);
        }
    }

    createOrUpdateListItem(index: number): Node {
        let listItem = this.content.children[index];
        if (!listItem) {
            listItem = instantiate(this.listItemPrefab);
            listItem.setSiblingIndex(index);
            // 设置列表项的内容
            // listItem.getComponent(ListItem).updateContent(data[index]);
        } else {
            // 更新列表项的内容
            // listItem.getComponent(ListItem).updateContent(data[index]);
        }
        return listItem;
    }

    onScroll() {
        let offsetY = this.content.position.y;
        let scrollPos = Math.floor(-offsetY / this.listItemHeight);
        if (scrollPos !== this.startIndex) {
            this.startIndex = scrollPos;
            this.updateVirtualList();
        }
    }
}