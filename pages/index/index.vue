<template>
	<view class="index">
		<!-- 顶部导航 -->
		<navBar>
			<template #left>
				<text class="font-md ml-3">首页</text>
			</template>
			<template #right>
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
					<span class="iconfont icon-zengjia"></span>
				</view>
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
					<span class="iconfont icon-gengduo"></span>
				</view>
			</template>
		</navBar>
		<!-- 搜索框部分 -->
		<searchBox></searchBox>
		<!-- 列表 -->
		<fileList v-for="(item, index) in list" :key="index" :item="item" :index="index" @select="handleSelect"></fileList>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import searchBox from './cpns/searchBox.vue'
import { IselectE } from './type'

let list = ref([
	{ type: 'dir', name: '我的笔记', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'image', name: '风景.jpg', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'video', name: '小视频.mp4', create_time: '2023-03-11 12:37', checked: true },
	{ type: 'text', name: '记事本.txt', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'none', name: '压缩包.zip', create_time: '2023-03-11 12:37', checked: false }
])
const handleSelect = (e: IselectE) => {
	list.value[e.index].checked = e.value
}
</script>

<style lang="less" scoped></style>
