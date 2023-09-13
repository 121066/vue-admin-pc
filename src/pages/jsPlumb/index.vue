<template>
  <div>
    <div id="diagramContainer">
      <div class="list" v-for="item in list" :key="item.id" :id="item.id">
        <div class="list_title">{{ item.text }}</div>
        <div
          class="list_item"
          v-for="Item in item.list"
          :key="Item.id"
          :id="Item.id"
        >
          {{ Item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import jsPlumb from 'jsplumb'
export default {
  data () {
    return {
      jsPlumb: null,
      list: [
        { id: 'a', text: '测试A', list: [{ text: '字段a', id: 'a1' }] },
        { id: 'b', text: '测试B', list: [{ text: '字段b', id: 'b1' }] },
        { id: 'c', text: '测试C', list: [{ text: '字段c', id: 'c1' }] }
      ],
      lineList: [{ from: 'a', to: 'b' }, { from: 'b', to: 'c' }]
    }
  },
  mounted () {
    console.log('执行', jsPlumb)
    const jsPlumb_ = jsPlumb.jsPlumb
    this.jsPlumb = jsPlumb_.getInstance({
      Container: 'container', // 选择器id
      EndpointStyle: { radius: 0.11, fill: '#999' }, // 端点样式
      PaintStyle: { stroke: '#999', strokeWidth: 2 }, // 绘画样式，默认8px线宽  #456
      HoverPaintStyle: { stroke: '#994B0A', strokeWidth: 3 }, // 默认悬停样式  默认为null
      ConnectionOverlays: [ // 此处可以设置所有箭头的样式
        ['Arrow', { // 设置参数可以参考中文文档
          location: 1,
          length: 12,
          paintStyle: {
            stroke: '#999',
            fill: '#999'
          }
        }]
      ],
      Connector: ['Straight'], // 要使用的默认连接器的类型：直线，折线，曲线等
      DrapOptions: { cursor: 'crosshair', zIndex: 2000 }
    }),

      //   this.jsPlumb.ready(function () {
      //     this.jsPlumb.connect({
      //       source: 'item_left',
      //       target: 'item_right',
      //       paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
      //       endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 }
      //     })
      //   })
      this.lineOver()
    // jsPlumb_.draggable('item_left')
    // jsPlumb_.draggable('item_right')
  },
  methods: {
    lineOver () {
      const jsplumbConnectOptions = {
        isSource: true,
        isTarget: true,
        connector: ['Straight'],
        // 动态锚点、提供了4个方向 Continuous、AutoDefault
        anchors: ['Right', 'Left']
      }
      this.jsPlumb.deleteEveryConnection()
      for (var i = 0; i < this.lineList.length; i++) {
        let line = this.lineList[i]
        this.jsPlumb.connect({
          source: line.from,
          target: line.to,
          paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
          endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 }
        }, jsplumbConnectOptions);
        const _jsplumn = this.jsPlumb
        _jsplumn.bind('connectionMoved', function (params) {
          console.log(params, '>><<<')
        })
      }

    }
  }
}
</script>
<style lang="scss" scoped>
#diagramContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  justify-content: space-between;
  .list {
    width: 140px;
    border: 1px solid #00ff66;

    .list_title {
      height: 32px;
      line-height: 32px;
      padding-left: 12px;
    }
    .list_item {
      height: 28px;
      line-height: 28px;
      padding-left: 12px;
    }
  }
}
</style>