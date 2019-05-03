<template>
  <div class="comp__sidebar-ear" :class="[ sidebarSwitch ? 'left' : 'right' ]" @click="toggleSidebarVisible">
    <i v-show="!sidebarSwitch" class="fa fa-angle-double-left" aria-hidden="true"></i>
    <i v-show="sidebarSwitch" class="fa fa-angle-double-right" aria-hidden="true"></i>
  </div>
</template>

<script>
import { sidebarStatus } from '@/app/js/config'

export default {
  name: 'SidebarEar',
  data () {
    return {}
  },
  computed: {
    sidebarSwitch () {
      return this.$store.state.sidebarState === sidebarStatus.open
    }
  },
  methods: {
    toggleSidebarVisible () {
      this.$store.commit('changeSidebarState', this.sidebarSwitch ? sidebarStatus.close : sidebarStatus.open)
    }
  }
}
</script>

<style scoped>
.comp__sidebar-ear {
  position: absolute;
  z-index: 2;
  top: 20px;
  width: 18px;
  height: 38px;
  text-align: center;
  line-height: 36px;
  color: #7ec2f3;
  border: 1px solid #c7e0ef;
  background-color: #f0f6f6;
  cursor: pointer;
}

.comp__sidebar-ear.left {
  right: 1px;
  border-right-width: 0;
  border-radius: 3px 0 0 3px;
}

.comp__sidebar-ear.right {
  right: -18px;
  border-left-width: 0;
  border-radius: 0 3px 3px 0;
}
</style>
