<template>
  <el-card class="comp__Date-card">
    <label class="el-form-item__label">开始日期：</label>
    <el-date-picker v-model="startDate" type="date" placeholder="选择日期时间" size="small" class="el-form-item__content"></el-date-picker>
    <label class="el-form-item__label">结束日期：</label>
    <el-date-picker v-model="endDate" type="date" placeholder="选择日期时间" size="small" class="el-form-item__content"></el-date-picker>
		<el-button type="primary" size="small" @click="handleConfigDate">查询</el-button>
  </el-card>
</template>

<script>
const startDate = '2016-01-01'
const endDate = '2017-01-01'

export default {
  name: 'DeviceMonitorDateCard',
  data () {
    return {
      startDate,
      endDate
    }
  },
  methods: {
    handleConfigDate () {
      if (!this.startDate) this.startDate = startDate
      if (!this.endDate) this.endDate = endDate

      this.$emit('configDate', { startDate: this.startDate, endDate: this.endDate })
    }
  }
}
</script>

<style>
	.comp__Date-card .el-form-item__label{
		float: initial;
	}
	.comp__Date-card .el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 160px;
	}
</style>