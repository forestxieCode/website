<template>
  <div class="quill-toolbar">
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('bold')" content="粗体" placement="bottom">
        <button class="ql-bold"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('italic')" content="倾斜" placement="bottom">
        <button class="ql-italic"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('underline')" content="下划线" placement="bottom">
        <button class="ql-underline"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('strike')" content="删除线" placement="bottom">
        <button class="ql-strike"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('blockquote')" content="引用" placement="bottom">
        <button class="ql-blockquote"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('code-block')" content="代码块" placement="bottom">
        <button class="ql-code-block"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('ordered')" content="有序列表" placement="bottom">
        <button class="ql-list" value="ordered"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('bullet')" content="无序列表" placement="bottom">
        <button class="ql-list" value="bullet"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('sub')" content="下标" placement="bottom">
        <button class="ql-script" value="sub"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('super')" content="上标" placement="bottom">
        <button class="ql-script" value="super"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('indent-reduce')" content="减少缩进" placement="bottom">
        <button class="ql-indent" value="-1"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('indent-add')" content="增加缩进" placement="bottom">
        <button class="ql-indent" value="+1"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('direction')" content="切换文字方向" placement="bottom">
        <button class="ql-direction" value="rtl"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('font-size')" content="字体大小" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-size">
            <option value="small">小号</option>
            <option selected>正常</option>
            <option value="large">大号</option>
            <option value="huge">超大</option>
          </select>
        </span>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('text-type')" content="文本类型" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-header">
            <option selected>段落</option>
            <option value="1">标题1</option>
            <option value="2">标题2</option>
            <option value="3">标题3</option>
            <option value="4">标题4</option>
            <option value="5">标题5</option>
            <option value="6">标题6</option>
          </select>
        </span>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('color')" content="字体颜色" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-color"></select>
        </span>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('background')" content="文本背景色" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-background"></select>
        </span>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('font')" content="字体" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-font"></select>
        </span>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('align')" content="对齐方式" placement="top">
        <span class="tooltip-wrap">
          <select class="ql-align"></select>
        </span>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('link')" content="超链接" placement="bottom">
        <button class="ql-link"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('image')" content="图片" placement="bottom">
        <button class="ql-image"></button>
      </el-tooltip>
      <el-tooltip v-if="barList.includes('video')" content="视频" placement="bottom">
        <button class="ql-video"></button>
      </el-tooltip>
    </span>
    <span class="ql-formats">
      <el-tooltip v-if="barList.includes('clean')" content="清除格式" placement="bottom">
        <button class="ql-clean"></button>
      </el-tooltip>
    </span>
  </div>
</template>

<script>
export default {
  name: 'QuillToolbar',
  props: ['bars'],
  data () {
    return {
      barList: []
    }
  },
  created () {
    if (typeof this.bars === 'string') {
      this.barList = ['bold', 'italic']
    }
    if (this.bars === 'all') {
      this.barList = ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'ordered', 'bullet', 'sub', 'super', 'indent-reduce', 'indent-add', 'direction', 'font-size', 'text-type', 'color', 'background', 'font', 'align', 'link', 'image', 'video', 'clean']
    }
    if (this.bars === 'style') {
      this.barList = ['bold', 'italic', 'underline', 'font-size', 'color', 'font']
    }
  }
}
</script>

<style scoped>
.quill-toolbar {
  line-height: 1;
}

.tooltip-wrap {
  display: inline-block;
}
</style>
