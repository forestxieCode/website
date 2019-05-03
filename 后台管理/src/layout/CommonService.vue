<template>
  <div class="comp__common-server" :style="{ height, padding, 'line-height': height }">
    <ul class="common-service-list">
      <li v-for="service in commonServiceList" :key="service.id" class="common-service-item">
        <link-type :link="service"></link-type>
      </li>
      <li class="common-service-item">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </li>
      <li class="common-service-item toggle-up" @click="toggleCommonService">
        <i class="fa fa-angle-up" aria-hidden="true"></i>
      </li>
      <li class="common-service-item setting">
        <i class="fa fa-cog" aria-hidden="true"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import LinkType from '@/component/LinkType'

import { commonServiceBox } from '@/app/js/config'

export default {
  name: 'CommonService',
  components: { LinkType },
  data () {
    return {
      height: commonServiceBox.height + 'px',
      padding: `${commonServiceBox.padding.top}px ${commonServiceBox.padding.right}px ${commonServiceBox.padding.bottom}px ${commonServiceBox.padding.left}px`
    }
  },
  computed: {
    commonServiceList () {
      return this.$store.state.commonService
    }
  },
  created () {
    this.$store.dispatch('getCommonService')
  },
  methods: {
    toggleCommonService () {
      this.$store.commit('changeCommonServiceHeight', this.$store.state.commonServiceHeight ? 0 : commonServiceBox.height)
    }
  }
}
</script>

<style scoped>
.comp__common-server {
  border-bottom: 1px solid #e9e9e9;
  font-size: 12px;
  background-color: #f7f7f7;
}

.common-service-list {
  padding: 0;
  margin: 0;
  width:100%;
  overflow: hidden;
}

.common-service-item {
  display: inline-block;
  margin-right: 20px;
  color: #919191;
  cursor: pointer;
}

.common-service-item:hover {
  color: #ffb800;
}

.common-service-item.toggle-up {
  float: right;
  margin-right: 0;
  margin-top: -1px;
  font-size: 22px;
}

.common-service-item.setting {
  float: right;
  font-size: 16px;
}
</style>

<style>
.comp__common-server .common-service-item a {
  display: block;
  color: #5a5a5a;
  text-decoration: none;
}

.comp__common-server .common-service-item a.router-link-exact-active,
.comp__common-server .common-service-item a:hover {
  color: #ffb800;
}
</style>
