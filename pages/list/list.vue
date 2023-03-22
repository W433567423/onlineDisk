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
				<span class="rounded" style="width: 30rpx;height: 8rpx;" :class="tarbarIndex == index ? 'bg-main' : 'bg-white'"></span>
			</view>
		</view>
		<swiper :duration="200" class="flex-1 flex" :current="tarbarIndex" @change="handleChangeTarbar($event.detail.current)">
			<swiper-item class="flex-1" v-for="index in [...Array(2).keys()]" :key="index">
				<scroll-view scroll-y="true" class="flex-1 " style="height:100%">
					<transmitList v-if="index === 0" :index="index" :transmitTasks="downloadTasks"></transmitList>
					<transmitList v-else :index="index" :transmitTasks="uploadTasks"></transmitList>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onNavigationBarButtonTap } from '@dcloudio/uni-app'
import $time from '@/utils/time'

import transmitList from './cpns/transmitList'
import { ITask } from '@/store/type'
import { IFileObj } from '@/pages/index/type'
const store = useStore()

const tarbarIndex = ref(0)
const tarbarOptions = ref([{ name: '下载列表' }, { name: '上传列表' }])
const uploadTasks = computed(
	(): Array<ITask> =>
		store.state.fileModule.uploadTasks.map((item: IFileObj) => {
			item.created_time = $time.gettime(item.created_time)
			return item
		})
)
const downloadTasks = computed(
	(): Array<ITask> =>
		store.state.fileModule.downloadTasks.map((item: IFileObj) => {
			item.created_time = $time.gettime(item.created_time)
			return item
		})
)

//切换下载/上传
const handleChangeTarbar = (index: number) => {
	tarbarIndex.value = index
}

onNavigationBarButtonTap(() => {
	uni.showModal({
		content: '是否要清除所有记录?',
		success: res => {
			if (res.confirm) {
				store.dispatch('fileModule/clearTransmitTasks')
				uni.showToast({
					title: '清除成功!',
					icon: 'success'
				})
			}
		}
	})
})
</script>

<style lang="less" scoped></style>
