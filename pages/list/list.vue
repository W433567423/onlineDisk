<template>
	<!-- calc(100vh - 100rpx - 90rpx) -->
	<view class="list flex flex-column" style="height: 100vh;">
		<view class="flex border-bottom border-light-secondary" style="height: 100rpx;">
			<view
				class="flex-1 flex flex-column align-center justify-center font-md "
				:class="tarbarIndex == index ? 'text-main' : ''"
				v-for="(item, index) in tarbarOptions"
				@click="handleChangeTarbar(index)"
				:key="index"
			>
				<text>{{ item.name }}</text>
				<span class=" rounded" style="width: 30rpx;height: 8rpx;" :class="tarbarIndex == index ? 'bg-main' : 'bg-white'"></span>
			</view>
		</view>
		<swiper :duration="200" class="flex-1 flex" :current="tarbarIndex" @change="handleChangeTarbar($event.detail.current)">
			<swiper-item class="flex-1" v-for="(item, index) in tarbarOptions" :key="index">
				<scroll-view scroll-y="true" class="flex-1 " style="height:100%">
					<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted">文件下载至:storage/xxxx/xxxx</view>
					<view class="p-2 border-bottom border-light-secondary font-sm text-muted">下载中({{ downloading.length }})</view>
					<fileList :item="item" :index="index" v-for="(item, index) in downloading" :key="index">
						<view style="width: 70rpx;" class="flex align-center">
							<span class="iconfont icon-zanting text-main"></span>
							<text class="ml-1 font-smaller">{{ item.download }}%</text>
						</view>

						<template #bottom>
							<progress :percent="item.download" active-color="#009cff" :stroke-width="4" />
						</template>
					</fileList>
					<view class="p-2 border-bottom border-light-secondary font-sm text-muted">下载完成</view>
					<fileList :item="item" :index="index" v-for="(item, index) in downloaded" :key="index" :isShowSelect="false"></fileList>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
// 导航
const tarbarIndex = ref(0)
const tarbarOptions = ref([{ name: '下载列表' }, { name: '上传列表' }])
const handleChangeTarbar = (index: number) => {
	tarbarIndex.value = index
}

//处理列表
let list = ref([
	{ type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', download: 35 },
	{ type: 'video', name: '小视频.mp4', data: '/static/210710122716702150.mp4', create_time: '2023-03-11 12:37', download: 7 },
	{ type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', download: 100 },
	{ type: 'text', name: '记事本.txt', data: '', create_time: '2023-03-11 12:37', download: 80 },
	{ type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', download: 64 },
	{ type: 'none', name: '压缩包.zip', data: '', create_time: '2023-03-11 12:37', download: 96 },
	{ type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', download: 100 }
])
const downloading = computed(() => list.value.filter(item => item.download < 100))
const downloaded = computed(() => list.value.filter(item => item.download === 100))
</script>

<style lang="less" scoped></style>
