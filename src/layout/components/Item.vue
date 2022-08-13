<template>
  <div class="icon_list">
    <i :class="icon" class="sub-el-icon" />
    <span class="title" slot="title">{{ title }}</span>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  // render(h, context) {
  //   const { icon, title } = context.props
  //   const vnodes = []

  //   if (icon) {
  //     if (icon.includes('el-icon')) {
  //       vnodes.push(<i class={[icon, 'sub-el-icon']} />)
  //     } else {
  //       vnodes.push(<svg-icon icon-class={icon} />)
  //     }
  //   }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // }
}
</script>

<style scoped>
.icon_list {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /* transform: translateX(-10%); */
  overflow: hidden;
}
.icon_list span {
  margin-left: 10px;
}
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
  /* margin-left: 20px; */
}
</style>
