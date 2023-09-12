<template>
  <div>
    <el-divider content-position="left">自定义【节点】插槽</el-divider>
    <div
      style="clear: both; border-bottom: 1px solid #efefef; height: 10px"
    ></div>
    <div style="height: calc(100vh - 300px)">
      <relation-graph
        ref="seeksRelationGraph"
        :options="userGraphOptions"
        :on-line-click="onLineClick"
      >
        <template slot="node" slot-scope="{ node }">
          <Slot1 :node="node" v-if="node.data.slotType === 'slot1'" />
          <Slot2 :node="node" v-if="node.data.slotType === 'slot2'" />
        </template>
      </relation-graph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph';
import Slot1 from './components/labelSolt.vue';
import Slot2 from './components/labelSolt2.vue';
export default {
  name: 'Demo',
  components: { Slot1, RelationGraph, Slot2 },
  data () {
    return {
      slotTeamplateId: '',
      userGraphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        "defaultNodeBorderWidth": 0,
        "defaultNodeShape": 1,
        "defaultJunctionPoint": "border",
        "layouts": [
          {
            "label": "中心",
            "layoutName": "tree",

            "layoutClassName": "seeks-layout-center",
            "defaultJunctionPoint": "border",
            "defaultNodeShape": 0,
            "from": "left",
            "min_per_width": "120",
            "min_per_height": "120",
            "max_per_width": "390",
          }
        ]
        // defaultJunctionPoint: 'border'
        // 这里可以参考"Graph 图谱"中的参数进行设置
      }
    };
  },
  mounted () {
    this.showSeeksGraph();
  },
  methods: {
    showSeeksGraph () {
      const __graph_json_data = {
        'rootId': 'a',
        'nodes': [
          {
            'id': 'a',
            'text': 'a',
            'data': {
              'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2308340537,462224207&fm=58&app=83&f=JPEG?w=250&h=250&s=EC708F46DA96B89CB69D5DDA0300D014',
              'name': '侯亮平',
              'slotType': 'slot1',
              'myicon': 'el-icon-star-on'
            }
          },
          {
            'id': 'b',
            'text': 'b',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2677153550,2207805387&fm=58&app=83&f=JPEG?w=250&h=250&s=249039DDC2D153D411A851360300C062',
              'name': '李达康',
              'slotType': 'slot2',
              'myicon': 'el-icon-setting',
              props: [{ text: '字段1' }, { text: '字段2' }, { text: '字段3' }]
            }
          },
          {
            'id': 'c',
            'text': 'c',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092',
              'name': '祁同伟',
              'slotType': 'slot2',
              'myicon': 'el-icon-setting',
              props: [{ text: '字段1' }, { text: '字段2' }, { text: '字段3' }]
            }
          },
          {
            'id': 'd',
            'text': 'd',
            'data': {
              'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021',
              'name': '陈岩石',
              'slotType': 'slot1',
              'myicon': 'el-icon-star-on'
            }
          },
          {
            'id': 'e',
            'text': 'e',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060',
              'name': '陆亦可',
              'slotType': 'slot2',
              'myicon': 'el-icon-setting',
              props: [{ text: '字段1' }, { text: '字段2' }, { text: '字段3' }]
            }
          },
          {
            'id': 'f',
            'text': 'f',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
              'name': '高育良',
              'myicon': 'el-icon-setting',
              'slotType': 'slot2',
              props: [{ text: '字段1' }, { text: '字段2' }, { text: '字段3' }]
            }
          },
          {
            'id': 'f1',
            'text': 'f1',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
              'name': '高育良',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'f2',
            'text': '测试字段',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
              'name': '高育良',
              'slotType': 'slot2',
              'myicon': 'el-icon-setting',
              props: [{ text: '字段1' }, { text: '字段2' }, { text: '字段3' }]
            }
          }
        ],
        'lines': [
          {
            'from': 'a',
            'to': 'b'
          },
          {
            'from': 'a',
            'to': 'c'
          },
          {
            'from': 'a',
            'to': 'd'
          },
          {
            'from': 'a',
            'to': 'e'
          },
          {
            'from': 'a',
            'to': 'f'
          },
          {
            'from': 'f1',
            'to': 'f2'
          }
        ]
      };
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (graphInstance) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      });
    },
    resetGraphOptions () {
      console.log('options update:resetGraphOptions:', this.userGraphOptions);
      this.$refs.seeksRelationGraph.setOptions(this.userGraphOptions, (graphInstance) => {
        // this.initData();
        if (this.slotTeamplateId === 'slot6') {
          this.showSeeksGraph();
        }
      });
    },
    setSlotTeamplate (slotTeamplateId) {
      this.slotTeamplateId = slotTeamplateId;
      // this.userGraphOptions.defaultNodeColor = '#409EFF';
      this.userGraphOptions.defaultNodeShape = 1;
      this.userGraphOptions.defaultNodeBorderWidth = 0;
      this.resetGraphOptions(this.userGraphOptions);
    },
    onLineClick (lineObject, linkObject, $event) {
      console.log('onLineClick:', lineObject);
      this.$notify({
        title: '点击连线：',
        type: 'success',
        message: '点击了线:' + linkObject.fromNode.text + ' to ' + linkObject.toNode.text
      });
    }
  }
};
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
::v-deep .rel-node {
  text-align: left;
  color: #222 !important;
  background: transparent !important;
  border: 1px solid #eee !important;
}
</style>
