<template>
  <div class="comp__code-mirror">
    <div class="editor__header">
      <h5 class="editor__title slo fl">
        <i class="fa fa-code" aria-hidden="true"></i>{{ title }}</h5>
      <ul class="ns">
        <el-tooltip content="Ctrl + Enter" placement="top">
          <li :class="{ disabled: inService }" class="editor__action-item" @click="runCode">
            <span v-show="!inService">
              <i class="fa triangle"></i>运行</span>
            <i v-show="inService" class="fa fa-refresh fa-spin fa-fw"></i>
          </li>
        </el-tooltip>
        <el-tooltip content="Ctrl + S" placement="top">
          <li :class="{ disabled: inSave }" class="editor__action-item editor__action-save" @click="saveCode">
            <span v-show="!inSave">
              <i class="fa fa-cloud" aria-hidden="true"></i>保存</span>
            <i v-show="inSave" class="fa fa-cloud-upload" aria-hidden="true"></i>
          </li>
        </el-tooltip>
      </ul>
    </div>
    <div class="editor__body"></div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'development-test') {
  require('codemirror/lib/codemirror.css')
  require('codemirror/theme/seti.css')
  require('codemirror/addon/fold/foldgutter.css')
  require('codemirror/mode/python/python.js')
  require('codemirror/addon/fold/foldgutter.js')
  require('codemirror/addon/fold/indent-fold.js')
}

let codeMirror = null

const codeMirrorOptions = {
  mode: 'python',
  theme: 'seti',
  lineNumbers: true,
  foldGutter: true,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
}

export default {
  name: 'CodeMirror',
  props: {
    title: { type: String, default: 'Python' },
    code: { type: String, default: '' },
    inService: { type: Boolean, default: false },
    inSave: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false }
  },
  data () {
    return {}
  },
  created () {
    Object.assign(codeMirrorOptions, {
      value: this.code,
      readOnly: this.readOnly,
      autofocus: !this.readOnly,
      extraKeys: {
        'Ctrl-Enter': this.runCode
      }
    })
  },
  mounted () {
    codeMirror = CodeMirror(document.querySelector('.comp__code-mirror .editor__body'), codeMirrorOptions)
    CodeMirror.commands.save = this.saveCode
  },
  methods: {
    runCode () {
      if (!this.inService) {
        this.$emit('run', codeMirror.doc.getValue())
      }
    },
    saveCode () {
      this.$emit('save', codeMirror.doc.getValue())
    }
  }
}
</script>

<style scoped>
.editor__header {
  position: absolute;
  width: 100%;
  height: 40px;
  border-radius: 5px 5px 0 0;
  color: #fff;
  background-color: #333;
}

.editor__title {
  max-width: 50%;
  margin: 0 15px 0 10px;
  font-size: 18px;
  line-height: 40px;
}

.editor__title .fa-code {
  margin-right: 10px;
  color: #f56a00;
}

.editor__action-item {
  float: right;
  min-width: 71px;
  padding: 0 10px;
  margin: 4px 17px 0 0;
  border: 2px solid #bfbfbf;
  border-radius: 6px;
  font-size: 14px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}

.editor__action-item:hover {
  background-color: rgba(191, 191, 191, .3);
}

.editor__action-item:active {
  transform: translateY(1px);
}

.editor__action-item.disabled {
  cursor: default;
}

.editor__action-item.disabled:hover {
  background-color: transparent;
}

.editor__action-item.disabled:active {
  transform: translateY(0);
}

.editor__action-item .triangle {
  position: relative;
  top: 2px;
  border: 7px solid transparent;
  border-left: 11px solid #fff;
  border-right: none;
}

.editor__action-item .fa-refresh {
  margin-left: 5px;
}

.editor__body {
  height: 100%;
  padding-top: 40px;
}

.fa-cloud-upload {
  animation: uploading 1s ease-in-out infinite alternate;
}

@keyframes uploading {
  from {
    opacity: 1
  }
  to {
    opacity: 0.1
  }
}
</style>

<style>
.comp__code-mirror .CodeMirror {
  height: 100%;
  border-radius: 0 0 5px 5px;
}

.comp__code-mirror .editor__action-item span>.fa {
  margin-right: 5px;
}
</style>
