<template>
	<view class="navBar">
		<!--  :style="`top: ${statusBarHeight}`" -->
		<view class="fixed-top bg-white">
			<view style="height: 44px;" class="flex border-bottom align-center">
				<view class="flex-2 flex justify-start"><slot name="left"></slot></view>
				<view class="flex-2 flex justify-center"><slot></slot></view>
				<view class="flex-1 flex justify-end"><slot name="right"></slot></view>
			</view>
		</view>
		<!-- 占位 -->
		<view>
			<uniStatusBar></uniStatusBar>
			<view style="height: 44px"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
const statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
</script>

<style lang="less" scoped></style>
