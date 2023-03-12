<template>
	<view style="height: 100vh" class="list flex flex-column">
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
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 导航
const tarbarIndex = ref(0)
const tarbarOptions = ref([{ name: '下载列表' }, { name: '上传列表' }])
const handleChangeTarbar = (index: number) => {
	tarbarIndex.value = index
}
</script>

<style lang="less" scoped></style>
