<template>
  <div>
    <selectList :optins="optins" />
  </div>
</template>
<script>
import selectList from '@/components/select/index.vue'
export default {
  components: { selectList },
  data() {
    return {
      optins: [
        { id: 1, name: '奥林老师' },
        { id: 2, name: '春蕾老师' },
        { id: 3, name: '宝剑锋至磨砺出,梅花香自苦寒来' },
      ],
    }
  },
}
</script>
<style lang="scss" scoped></style>
