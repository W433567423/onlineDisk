<template>
	<view class="searchBox">
		<view class="px-3 py-2">
			<view class="position-relative">
				<view
					style="height: 70rpx; width: 70rpx; position: absolute; top: 0; left: 0;"
					class="flex align-center justify-center text-light-muted"
				>
					<span class="iconfont icon-sousuo"></span>
				</view>
				<input
					type="text"
					style="height: 70rpx;padding-left: 70rpx;"
					class="bg-light font-md rounded-circle"
					placeholder="搜索网盘文件"
					@input="search"
				/>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
const emits = defineEmits(['handleSearch', 'handleFlashList'])
const search = (e: any) => {
	if (e.detail.value == '') return emits('handleFlashList')
	emits('handleSearch', e.detail.value as string)
}
</script>

<style lang="less" scoped></style>
