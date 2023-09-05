<template>
  <div>
    <div style="height: calc(100vh - 50px)">
      <RelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-click="onNodeClick"
        :on-line-click="onLineClick"
      />
    </div>
  </div>
</template>
<script>
import RelationGraph from 'relation-graph'
export default {
  components: { RelationGraph },
  data () {
    return {
      graphOptions: {
        allowSwitchLineShape: true,
        allowSwitchJunctionPoint: true,
        defaultJunctionPoint: 'border',
        'layouts': [
          {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'min_per_width': 40,
            'max_per_width': 70,
            'min_per_height': 200
          }
        ],
        'defaultNodeBorderWidth': 0,
        'defaultNodeShape': 1,
        'allowShowMiniNameFilter': false,
        // 'allowShowMiniToolBar': false,
        'defaultJunctionPoint': 'lr',
        'defaultLineShape': 2
        // 这里可以参考"Graph 图谱"中的参数进行设置:http://relation-graph.com/#/docs/graph
      }
    }
  },
  mounted () {
    this.showSeeksGraph()
  },
  methods: {
    showSeeksGraph () {
      var __graph_json_data = {
        rootId: 'a',
        'nodes': [
          { 'text': '采集管理中心', 'id': 'centre', nodeShape: 0, width: 120, height: 120, offset_y: -20, color: '#34A0CE' },
          { 'text': '《数据收集服务》<br> 2355条/分钟', 'id': 'data', nodeShape: 1, width: 330, height: 50, fixed: true, x: 30, y: -300 },
          { 'text': '《代理池服务》<br> 今日剩余：32020个', 'id': 'proxy', nodeShape: 1, width: 330, height: 50, fixed: true, x: 30, y: -220 },
          { 'text': '《采集任务分发服务》<br> 112个/分钟', 'id': 'task', nodeShape: 1, width: 330, height: 50, fixed: true, x: 30, y: -140, color: '#E6A23C' },
          { 'text': '程序调度服务', 'id': 'cron', nodeShape: 1, width: 130, height: 40, color: '#34A0CE' },
          { 'text': 'ExeSvr-01@10.0.0.201 | 最后响应：3秒前', 'id': 'exe-01', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-02@10.0.0.202 | 最后响应：5秒前', 'id': 'exe-02', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-03@10.0.0.203 | 最后响应：2秒前', 'id': 'exe-03', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-04@10.0.0.204 | 最后响应：4分钟前', 'id': 'exe-04', nodeShape: 1, width: 500, height: 35, color: '#34A0CE' },
          { 'text': 'ExeSvr-05@10.0.0.205 | 最后响应：2分钟前', 'id': 'exe-05', nodeShape: 1, width: 500, height: 35, color: '#34A0CE' },
          { 'text': 'ExeSvr-06@10.0.0.206 | 最后响应：3秒前', 'id': 'exe-06', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-07@10.0.0.207 | 最后响应：3秒前', 'id': 'exe-07', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-docker-01@10.0.0.211 | 最后响应：17天前', 'id': 'exe-08', nodeShape: 1, width: 500, height: 35, color: '#F56C6C' },
          { 'text': 'ExeSvr-docker-02@10.0.0.211 | 最后响应：3秒前', 'id': 'exe-09', nodeShape: 1, width: 500, height: 35 },
          { 'text': 'ExeSvr-docker-03@10.0.0.211 | 最后响应：3秒前', 'id': 'exe-10', nodeShape: 1, width: 500, height: 35 }
        ],
        'lines': [
          { 'from': 'data', 'to': 'centre', 'text': null, isHideArrow: true, lineShape: 4 },
          { 'from': 'proxy', 'to': 'centre', 'text': null, isHideArrow: true, lineShape: 4 },
          { 'from': 'task', 'to': 'centre', 'text': null, isHideArrow: true, lineShape: 4 },
          { 'from': 'centre', 'to': 'cron', 'text': null, isHideArrow: true },
          { 'from': 'cron', 'to': 'exe-01', 'text': null },
          { 'from': 'cron', 'to': 'exe-02', 'text': null },
          { 'from': 'cron', 'to': 'exe-03', 'text': null },
          { 'from': 'cron', 'to': 'exe-04', 'text': null },
          { 'from': 'cron', 'to': 'exe-05', 'text': null },
          { 'from': 'cron', 'to': 'exe-06', 'text': null },
          { 'from': 'cron', 'to': 'exe-07', 'text': null },
          { 'from': 'cron', 'to': 'exe-08', 'text': null },
          { 'from': 'cron', 'to': 'exe-09', 'text': null },
          { 'from': 'cron', 'to': 'exe-10', 'text': null }
        ]
      }
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // Called when the relation-graph is completed 
      })
    },
    onNodeClick (nodeObject, $event) {
      console.log('onNodeClick:', nodeObject)
    },
    onLineClick (linkObject, $event) {
      console.log('onLineClick:', linkObject)
    }
  }
}
</script>