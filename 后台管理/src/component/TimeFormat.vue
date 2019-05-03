<template>
  <span class="comment-format-time">{{ formatTime }}</span>
</template>

<script>
import moment from 'moment'

export default {
  name: 'time-format',
  props: {
    time: [Date, Number],
    format: String
  },
  data () {
    return {}
  },
  computed: {
    formatTime () {
      return moment(this.time).format(this.format)
    }
  },
  created () {
    if (!this.time) this.time = new Date()
    if (!this.format) this.format = 'YYYY-MM-DD HH:mm:ss'
  }
}
</script>
