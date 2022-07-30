<template>
  <div>
    <formSearch :opts="opts"></formSearch>
  </div>
</template>
<script>
import formSearch from '@/components/formSearch/index'
export default {
  components: {
    formSearch,
  },
  data() {
    return {
      opts: [
        {
          label: '客户编码1',
          type: 'input',
          key: 'customerNumber1',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码2',
          type: 'input',
          key: 'customerNumber2',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码3',
          type: 'input',
          key: 'customerNumber3',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码4',
          type: 'input',
          key: 'customerNumber4',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
        {
          label: '客户编码5',
          type: 'input',
          key: 'customerNumber5',
          val: '这是一个默认值',
          placeholder: '请输入客户编码',
        },
      ],
    }
  },
}
</script>
<style scoped>
.main {
}
</style>
