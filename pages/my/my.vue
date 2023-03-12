<template>
	<view class="my ">
		<view class="p-3 flex align-center">
			<image src="../../static/touxiang.jpg" style="width: 120rpx; height: 120rpx;" class="rounded-circle flex-shrink mr-3 "></image>
			<view class="flex-1 flex flex-column text-muted border font-sm">
				<view class="flex align-end">
					<text class="font-lg text-dark m-2">涂涂</text>
					男 湖北 20 岁
				</view>
				<text class="text-ellipsis">一名平平无奇的大学生</text>
			</view>
		</view>
		<separate-line></separate-line>
		<view class="p-3">
			<progress percent="25" active stroke-width="3" class="mb-3" />
			<view class="flex align-center justify-between">
				<text class="text-light-muted font">总:10TB</text>
				<text class="te">已用:805GB</text>
			</view>
		</view>
		<separate-line></separate-line>
		<uni-list-item title="其他设置" clickable @click="onClick" link=""></uni-list-item>
	</view>
</template>

<script setup lang="ts">
import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item'
</script>

<style lang="less" scoped></style>
