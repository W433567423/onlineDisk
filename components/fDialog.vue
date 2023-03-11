<template>
	<uniPopup ref="dialog">
		<view class="bg-white rounded" style="width: 600rpx;">
			<view class="flex align-center justify-center font-weight-bold border-bottom border-light-secondary" style="height: 100rpx;">
				{{ title }}
			</view>
			<view class="flex align-center justify-center p-3"><slot></slot></view>
			<view class="flex  border-top border-light-secondary">
				<view class="flex-1 text-muted flex align-center justify-center" @tap="handleCancel">{{ cancelText }}</view>
				<view class="flex-1 text-main flex align-center justify-center" style="height: 100rpx;" @tap="handleConfirm">{{ comfirmText }}</view>
			</view>
		</view>
	</uniPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup'
type Ifunction = () => void
type Icallback = ((arg: Ifunction) => {}) | boolean
defineProps({
	isOpen: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: '提示'
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	comfirmText: {
		type: String,
		default: '确定'
	}
})
let callback: Icallback = false
const dialog = ref(null)
const handleCancel = () => {
	emit('cancel')
	dialog.value.close()
}
const emit = defineEmits(['confirm', 'cancel'])
const handleConfirm = () => {
	if (typeof callback == 'function') {
		callback(() => {
			handleCancel()
		})
	} else {
		emit('confirm')
		handleCancel()
	}
}
// watch(isO)
const open = (cb: Icallback = false) => {
	callback = cb
	dialog.value.open('center')
}
defineExpose({ open })
</script>

<style lang="less" scoped></style>
