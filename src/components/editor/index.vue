<template>
  <div class="editor">
    <div ref="editor"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    height: {
      type: Number,
      default: null,
    },
  },
  watch: {
    value(val) {
      if (!this.createdFlag && this.hasChangeFlag) {
        this.$nextTick(() => {
          this.editor.txt.html(val)
        })
      }
    },
  },
  data() {
    return {
      editor: null,
      createdFlag: false,
      hasChangeFlag: false,
    }
  },
  methods: {
    cratedEidtor() {
      this.editor = new E(this.$refs.editor)
      this.editor.config.height = this.height
      this.editor.config.width = 800
      // const menuKey = 'alertMenuKey'
      const menuKey = ['alertMenuKey']
      // emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' ')
      this.editor.menus.extend(menuKey)
      this.editor.config.menus = this.editor.config.menus.concat(menuKey)
      // this.editor.config.tryChangeActive = function (e) {}
      //视频上传
      this.editor.config.customUploadVideo = async function (
        resultFiles,
        insertImgFn
      ) {}
      // 图片上传
      // this.editor.config.customUploadImg = async function (
      //   resultFiles,
      //   insertImgFn
      // ) {
      //   console.log(resultFiles)
      //   const fd = new FormData()
      //   fd.append('files', resultFiles[0])
      //   fd.append('sourceId', 1)
      //   insertImgFn(resultFiles)
      // }
      console.log(this.editor)
      this.hasChangeFlag = true
      this.editor.config.onchange = (html) => {
        this.$emit('input', html)
        this.createdFlag = true
      }
      this.editor.create()
      if (this.value) {
        this.editor.txt.html(this.value)
      }
    },
  },
  mounted() {
    this.cratedEidtor()
  },
}
</script>
<style lang="scss" scoped>
.editor {
  width: 100%;
}
::v-deep .w-e-text {
  text-align: left;
}
</style>
