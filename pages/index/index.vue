<template>
	<view class="index">
		<!-- 顶部导航 -->
		<navBar v-if="checkedCount === 0">
			<template #left>
				<text class="font-md ml-3">首页</text>
			</template>
			<template #right>
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
					<span class="iconfont icon-zengjia" @click="handleOpenAddmune"></span>
				</view>
				<view style="width: 60rpx;height: 60rpx;" class="flex align-center justify-center bg-light rounded-circle mr-3">
					<span class="iconfont icon-gengduo"></span>
				</view>
			</template>
		</navBar>
		<navBar v-else>
			<template #left>
				<text class="font-md ml-3 text-primary">取消</text>
			</template>
			<template #default>
				<text class="font-md font-weight-bold">已选{{ checkedCount }}个</text>
			</template>
			<template #right>
				<text class="font-md mr-3 text-primary" @click="handleCheckAll(false)" v-if="checkedCount === list.length">全不选</text>
				<text class="font-md mr-3 text-primary" @click="handleCheckAll(true)" v-else>全选</text>
			</template>
		</navBar>
		<!-- 搜索框部分 -->
		<searchBox></searchBox>
		<!-- 列表 -->
		<fileList v-for="(item, index) in list" :key="index" :item="item" :index="index" @select="handleSelect"></fileList>
		<!-- 底部选项 -->
		<template v-if="checkedCount !== 0">
			<view style="height: 115rpx;"></view>
			<view style="height: 115rpx;" class="flex align-stretch bg-primary text-white fixed-bottom">
				<view
					class="flex-1 flex flex-column align-center justify-center border"
					style="line-height: 1.5;"
					v-for="(item, index) in actions"
					:key="index"
					@click="handleClickAction(item)"
					hover-class="bg-hover-primary"
				>
					<span class="iconfont " :class="item.icon"></span>
					{{ item.text }}
				</view>
			</view>
		</template>
		<!-- 弹出层 -->
		<fDialog ref="deleteRef">是否删除选中项目</fDialog>
		<fDialog ref="renameRef">
			<input
				type="text"
				class="bg-light rounded flex-1 px-2"
				style="height: 95rpx;font-size: 20px;"
				placeholder="请输入修改后的文件名"
				v-model="renameValue"
			/>
		</fDialog>
		<uniPopup ref="addMuneRef" type="bottom">
			<view class="bg-white flex" style="height: 200rpx;">
				<view
					class="flex-1 flex align-center justify-center flex-column"
					hover-class="bg-light"
					v-for="(item, index) in addMuneList"
					:key="index"
				>
					<span
						style="width: 110rpx; height: 110rpx;font-size: 65rpx;"
						class="rounded-circle bg-light iconfont  flex align-center justify-center "
						:class="[item.icon, item.color]"
					></span>
					<text class="font text-muted">{{ item.text }}</text>
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import searchBox from './cpns/searchBox.vue'
import { IselectE, IactionItem } from './type'
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup'

type Ifunction = () => {}

let list = ref([
	{ type: 'dir', name: '我的笔记', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'image', name: '风景.jpg', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'video', name: '小视频.mp4', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'text', name: '记事本.txt', create_time: '2023-03-11 12:37', checked: false },
	{ type: 'none', name: '压缩包.zip', create_time: '2023-03-11 12:37', checked: false }
])
const handleSelect = (e: IselectE) => {
	list.value[e.index].checked = e.value
}
// 选中
const checkedList = computed(() => list.value.filter(item => item.checked))
const checkedCount = computed(() => checkedList.value.length)
//全选事件
const handleCheckAll = (state: boolean) => {
	list.value.forEach(item => (item.checked = state))
}

// 底部菜单相关
const deleteRef = ref(null)
const renameRef = ref(null)
let actions = computed(() => {
	if (checkedCount.value > 1) return [{ text: '下载', icon: 'icon-xiazai' }, { text: '删除', icon: 'icon-shanchu' }]
	else
		return [
			{ text: '下载', icon: 'icon-xiazai' },
			{ text: '分享', icon: 'icon-fenxiang-1' },
			{ text: '删除', icon: 'icon-shanchu' },
			{ text: '重命名', icon: 'icon-chongmingming' }
		]
})
const handleClickAction = (item: IactionItem) => {
	switch (item.text) {
		case '下载':
			console.log('下载ssss')
			break
		case '分享':
			console.log('分享')
			break
		case '删除':
			deleteRef.value.open((close: Ifunction) => {
				list.value = list.value.filter(item => !item.checked)
				close()
				uni.showToast({
					title: '删除成功'
				})
			})
			break
		case '重命名':
			renameValue.value = checkedList.value[0].name
			renameRef.value.open((close: Ifunction) => {
				if (renameValue.value == '')
					return uni.showToast({
						title: '文件名不合法'
					})
				else checkedList.value[0].name = renameValue.value
				close()
			})
			break
	}
}
const renameValue = ref('')

//顶部菜单
const addMuneRef = ref(null)
const handleOpenAddmune = () => {
	addMuneRef.value.open()
}
const addMuneList = ref([
	{ icon: 'icon-file-b-6', color: 'text-success', text: '上传图片' },
	{ icon: 'icon-file-b-9', color: 'text-primary', text: '上传视频' },
	{ icon: 'icon-file-b-8', color: 'text-muted', text: '上传文件' },
	{ icon: 'icon-file-b-2', color: 'text-warning', text: '上传文件夹' }
])
</script>

<style lang="less" scoped></style>
