<template>
	<view class="my ">
		<view class="p-3 flex align-center">
			<image src="../../static/touxiang.jpg" style="width: 120rpx; height: 120rpx;" class="rounded-circle flex-shrink mr-3"></image>
			<view class="flex-1 flex flex-column text-muted">
				<view class="flex align-end font-sm">
					<text class="font-lg text-dark m-2">{{ user.nickname ? user.nickname : user.username }}</text>
					{{ user.sex }} 湖北 20 岁
				</view>
				<span class="text-ellipsis" style="font-weight:initial;font-size: 14rpx;font-style: italic; ">
					{{ user.desc ? user.desc : '对方很懒,暂无描述~' }}
				</span>
			</view>
		</view>
		<separate-line></separate-line>
		<view class="p-3">
			<progress :percent="progress" active stroke-width="3" class="mb-3" />
			<view class="flex align-center justify-between">
				<text class="text-light-muted font">总:{{ toGB(user.total_size) }}</text>
				<text>已用:{{ toGB(user.used_size) }}</text>
			</view>
		</view>
		<separate-line></separate-line>
		<uni-list-item title="其他设置" clickable @click="onClick" link=""></uni-list-item>
	</view>
</template>

<script setup lang="ts">
import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item'
import { useStore } from 'vuex'
import { computed, getCurrentInstance, onMounted } from 'vue'
const { appContext } = getCurrentInstance()
const $T = appContext.config.globalProperties.$T
// 工具函数(byte转GB)
import { toGB } from '@/utils'
const store = useStore()

// 引入user数据
const user = computed(() => store.state.userModule.user)
// 进度条
const progress = computed(() => (user.value.used_size / user.value.total_size) * 100)
//
// 更新容量
const getSize = () => {
	const res = $T.get('/user/getSize', { token: true }).then(res => store.commit('userModule/syncSize', res))
}

getSize()

const onClick = () => {}
</script>

<style lang="less" scoped></style>
