<template>
	<view class="login">
		<view style="height: 44px;"></view>
		<view class="flex align-center justify-center font-lg text-muted" style="margin-top: 100rpx;margin-bottom: 80rpx;">
			{{ status === 'login' ? '欢迎回来!' : '呀!又多了个小可耐呢~' }}
		</view>
		<view class="px-4">
			<input type="text" v-model="form.username" class="uni-input bg-light rounded mb-4" placeholder="手机号/用户名/邮箱" />
			<input type="password" v-model="form.password" class="uni-input bg-light rounded mb-4" placeholder="密码" />
			<input type="password" v-model="form.repassword" class="uni-input bg-light rounded mb-4" placeholder="确认密码" v-if="status === 'reg'" />
			<view
				class="bg-main text-white flex align-center justify-center font-lg py-2 rounded-circle"
				hover-class="bg-main-hover"
				@click="handleSubmit"
			>
				{{ status === 'login' ? '登 录' : '立即注册' }}
			</view>
		</view>
		<view class="flex align-center justify-center pt-5">
			<view class="text-muted mx-2 font-sm" @click="handleChange" style="text-decoration: underline;font-style: italic;">
				{{ status === 'login' ? '注册账号' : '登录' }}
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
	username: '',
	password: '',
	repassword: ''
})
const status = ref('login')
const handleChange = () => {
	status.value = status.value === 'login' ? 'reg' : 'login'
}
// 登录
const handleSubmit = () => {}
</script>

<style lang="less" scoped></style>
