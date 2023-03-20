<template>
	<view class="bg-main text-white flex align-center justify-center font-lg py-2 rounded-circle" hover-class="bg-main-hover" @click="handleLogout">
		你要离开了么?我的宝~
	</view>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
const store = useStore()

const handleLogout = () => {
	store.dispatch('userModule/UserLogout')
}
</script>

<style lang="less" scoped></style>
