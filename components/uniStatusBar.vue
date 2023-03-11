<template>
	<view :style="{ height: statusBarHeight, background: bgcolor }" class="uni-status-bar"><slot /></view>
</template>

<script setup lang="ts">
let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
defineProps({
	bgcolor: {
		type: String,
		// default: '#FFE933'
		default: ''
	}
})
</script>

<style lang="less" scoped>
.uni-status-bar {
	width: 750rpx;
	height: 20px;
	height: var(--status-bar-height);
}
</style>
