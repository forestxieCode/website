<template>
	<div class="page-header" :class="[fixed ? 'fixed' : '']" :style="style">
		<span class="line" v-if="!historyBack"></span>
		<h2 class="page-title">
			<history-back v-if="historyBack" :route="route"></history-back>
			<slot name="title"></slot>
		</h2>
		<slot></slot>
	</div>
</template>

<script>
	import HistoryBack from './HistoryBack'
	import {
		mainContentBox
	} from '@/app/js/config'

	export default {
		name: 'PageHeader',
		components: {
			HistoryBack
		},
		props: {
			historyBack: {
				type: Boolean,
				default: false
			},
			route: String,
			fixed: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			mainContent() {
				return this.$store.getters.mainContent
			},
			style() {
				return this.fixed ? {
					top: this.mainContent.top - mainContentBox.padding.top + 'px',
					width: this.mainContent.width + 'px',
					height: mainContentBox.padding.top + 40 + 'px',
					paddingTop: mainContentBox.padding.top + 'px'
				} : {}
			}
		}
	}
</script>

<style scoped>
	.fixed {
		position: fixed;
		z-index: 2;
		background-color: #fbfbfb;
	}

	.page-header {
		position: relative;
	}

	.page-header .line {
		position: absolute;
		top: 9px;
		left: 0;
		width: 3px;
		height: 22px;
		background: #208DF7;
	}
</style>
