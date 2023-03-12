<template>
	<view class="newtab" style="height: 100vh;">
		<video
			:src="url"
			preload
			style="width: 100%;height: 
	100vh;"
			@ended="handleVideoEnd"
		></video>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const pages = getCurrentPages()
const page: any = pages[pages.length - 1]
const url = ref('')
if (page.$page.options.videourl) url.value = page.$page.options.videourl
if (page.$page.options.title)
	uni.setNavigationBarTitle({
		title: page.$page.options.title
	})
const handleVideoEnd = () => {
	console.log(1)
	uni.navigateBack({ delta: 1 })
}
</script>

<style lang="less" scoped></style>
