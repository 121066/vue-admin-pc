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
          <Slot1 :node="node" />
        </template>
      </relation-graph>
    </div>
  </div>
</template>

<script>
// 如果您没有在main.js文件中使用Vue.use(RelationGraph); 就需要使用下面这一行代码来引入relation-graph
import RelationGraph from 'relation-graph';
import Slot1 from './components/labelSolt.vue';

export default {
  name: 'Demo',
  components: { Slot1, RelationGraph },
  data () {
    return {
      slotTeamplateId: '',
      userGraphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        "defaultNodeBorderWidth": 0,
        "defaultNodeShape": 1,
        "defaultJunctionPoint": "tb",
        allowSwitchLineShape: true,
        "layouts": [
          {
            "label": "中心",
            "layoutName": "tree",
            "layoutClassName": "seeks-layout-center",
            "defaultJunctionPoint": "border",
            "defaultNodeShape": 0,
            "from": "left",
            "min_per_width": "280",
            "min_per_height": "280",
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
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'c',
            'text': 'c',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1725297532,1915921796&fm=58&app=83&f=JPEG?w=250&h=250&s=FE8EA444A60759554DAC1DBB03000092',
              'name': '祁同伟',
              'slotType': 'slot3',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'd',
            'text': 'd',
            'data': {
              'pic': 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2025797948,1615296290&fm=58&app=83&f=JPEG?w=250&h=250&s=B5B04C331F32739C4604F9F503007021',
              'name': '陈岩石',
              'slotType': 'slot4',
              'myicon': 'el-icon-star-on'
            }
          },
          {
            'id': 'e',
            'text': 'e',
            'data': {
              'pic': 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=344720653,260255884&fm=58&app=83&f=JPEG?w=250&h=250&s=57B8AB676AE862941D94ED170300E060',
              'name': '陆亦可',
              'slotType': 'slot5',
              'myicon': 'el-icon-setting'
            }
          },
          {
            'id': 'f',
            'text': 'f',
            'data': {
              'pic': 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3098576865,849900134&fm=58&app=83&f=JPEG?w=250&h=250&s=EDE01A63A65917DC104509920300C0C1',
              'name': '高育良',
              'myicon': 'el-icon-setting'
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
          }
        ]
      };
      // if (this.slotTeamplateId === 'slot6') {
      //   Object.assign(__graph_json_data.nodes[0], { color: '#67C23A', borderColor: '#90EE90', nodeShape: 0, borderWidth: 5 });
      //   Object.assign(__graph_json_data.nodes[1], { color: '#409EFF', borderColor: '#409EFF', nodeShape: 1, borderWidth: 1 });
      //   Object.assign(__graph_json_data.nodes[2], { color: '', borderColor: '', nodeShape: 0, borderWidth: 0 });
      //   Object.assign(__graph_json_data.nodes[3], { color: '#409EFF', borderColor: '#409EFF', nodeShape: 1, borderWidth: 1 });
      //   Object.assign(__graph_json_data.nodes[4], { color: '', borderColor: '#409EFF', nodeShape: 0, borderWidth: 0 });
      // }
      console.log(this.slotTeamplateId, __graph_json_data);
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
      //   if (this.slotTeamplateId === '') {
      //     this.userGraphOptions.defaultNodeColor = '#67C23A';
      //     this.userGraphOptions.defaultNodeBorderColor = '#90EE90';
      //     this.userGraphOptions.defaultNodeShape = 0;
      //     this.userGraphOptions.defaultNodeBorderWidth = 5;
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot1') {
      //     this.userGraphOptions.defaultNodeColor = '#67C23A';
      //     this.userGraphOptions.defaultNodeBorderColor = '#90EE90';
      //     this.userGraphOptions.defaultNodeShape = 0;
      //     this.userGraphOptions.defaultNodeBorderWidth = 5;
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot2') {
      //     this.userGraphOptions.defaultNodeColor = '#409EFF';
      //     this.userGraphOptions.defaultNodeShape = 1;
      //     this.userGraphOptions.defaultNodeBorderWidth = 0;
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot3') {
      //     this.userGraphOptions.defaultNodeColor = '';
      //     this.userGraphOptions.defaultNodeShape = 0;
      //     this.userGraphOptions.defaultNodeBorderWidth = 0;
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot4') {
      //     this.userGraphOptions.defaultNodeColor = '#409EFF';
      //     this.userGraphOptions.defaultNodeShape = 1;
      //     this.userGraphOptions.defaultNodeBorderWidth = 1;
      //     this.userGraphOptions.defaultNodeBorderColor = '#409EFF';
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot5') {
      //     this.userGraphOptions.defaultNodeColor = '';
      //     this.userGraphOptions.defaultNodeShape = 0;
      //     this.userGraphOptions.defaultNodeBorderWidth = 0;
      //     this.userGraphOptions.defaultNodeBorderColor = '#409EFF';
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
      //   if (this.slotTeamplateId === 'slot6') {
      //     this.userGraphOptions.defaultNodeColor = '#eeeeee';
      //     this.userGraphOptions.defaultNodeShape = 1;
      //     this.userGraphOptions.defaultNodeBorderWidth = 1;
      //     this.userGraphOptions.defaultNodeBorderColor = '#eeeeee';
      //     this.resetGraphOptions(this.userGraphOptions);
      //   }
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
.c-node-menu-item {
  line-height: 30px;
  padding-left: 10px;
  cursor: pointer;
  color: #444444;
  font-size: 14px;
  border-top: #efefef solid 1px;
}
.c-node-menu-item:hover {
  // background-color: rgba(66, 187, 66, 0.2);
}
.c-slot-teamplate {
  border: 1px solid #efefef;
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  height: 150px;
  float: left;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 12px;
}
.c-slot-teamplate:hover {
  // border: 1px solid #00bb00;
}
.c-slot-teamplate-checked {
  border: 1px solid #409eff;
}
</style>
