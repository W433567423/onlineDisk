<template>
	<view class="fileList">
		<view class=" p-3 flex align-center border-bottom border-light-secondary" hover-class="bg-light" @click="emit('handleClickList')">
			<span class="iconfont icon" :class="iconClass" style="font-size: 60rpx;"></span>
			<view class="flex flex-column ml-3" style="line-height: 1.2;">
				<text class="font-md">{{ item.name }}</text>
				<text class="font-sm text-muted">{{ item.create_time }}</text>
			</view>
			<!-- 右边选择框 -->
			<view v-if="isShowSelect" class="ml-auto ">
				<slot>
					<view class="flex align-center justify-center" style="width: 70rpx;height: 70rpx;" @click.stop="handleSelectList">
						<span class="iconfont icon-xuanze-yixuan text-primary" style="font-size: 40rpx;" v-if="item.checked"></span>
						<span class="rounded-circle border" style="height: 25rpx;width: 25rpx ;" v-else></span>
					</view>
				</slot>
			</view>
		</view>
		<slot name="bottom"></slot>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IlistItem } from '@/pages/index/type'

const props = withDefaults(
	defineProps<{
		item: IlistItem
		index: Number | String
		isShowSelect?: boolean
	}>(),
	{ isShowSelect: true }
)
// 图标处理
const icons = {
	dir: {
		icon: 'icon-file-b-2',
		color: 'text-warning'
	},
	image: {
		icon: 'icon-file-b-6',
		color: 'text-success'
	},
	video: {
		icon: 'icon-file-b-9',
		color: 'text-primary'
	},
	text: {
		icon: 'icon-file-s-7',
		color: 'text-info'
	},
	none: {
		icon: 'icon-file-b-8',
		color: 'text-muted'
	}
}
const iconClass = computed(() => {
	const item = icons[props.item.type]
	return `${item.icon} ${item.color}`
})

// 处理选中事件
const emit = defineEmits(['handleSelectList', 'handleClickList'])
const handleSelectList = () => {
	emit('handleSelectList', { index: props.index, value: !props.item.checked })
}
</script>

<style lang="less" scoped></style>
