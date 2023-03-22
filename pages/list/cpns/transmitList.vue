<template>
	<view class="transmitList">
		<view style="height: 60rpx;" class="bg-light flex align-center font-sm px-2 text-muted" v-if="index === 0">文件下载至:storage/xxxx/xxxx</view>
		<view class="p-2 border-bottom border-light-secondary font-sm text-muted">
			{{ index === 0 ? '下载中' : '上传中' }}({{ transmiting.length }})
		</view>
		<fileList :item="item" :index="index" v-for="(item, index) in transmiting" :key="index">
			<view style="width: 70rpx;" class="flex align-center">
				<span class="iconfont icon-zanting text-main"></span>
				<text class="ml-1 font-smaller">{{ item.progress }}%</text>
			</view>

			<template #bottom>
				<progress :percent="item.progress" active-color="#009cff" :stroke-width="4" />
			</template>
		</fileList>
		<view class="p-2 border-bottom border-light-secondary font-sm text-muted">下载完成</view>
		<fileList :item="item" :index="index" v-for="(item, index) in transmited" :key="index" :isShowSelect="false"></fileList>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IFileObj } from '@/pages/index/type'

const props = defineProps<{ index: number; transmitTasks: IFileObj[] }>()
const transmiting = computed(() => props.transmitTasks.filter((item: IFileObj) => item.progress < 100))
const transmited = computed(() => props.transmitTasks.filter((item: IFileObj) => item.progress === 100))
</script>

<style lang="less" scoped></style>
