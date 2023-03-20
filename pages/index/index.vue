<template>
	<view class="index">
		<!-- 顶部导航 -->
		<navBar v-if="checkedCount === 0">
			<template #left>
				<text class="font-md ml-3">首页</text>
			</template>
			<template #right>
				<view
					style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3"
					hover-class="bg-hover-light-important "
				>
					<span class="iconfont icon-zengjia" @click="handleOpenAddmune"></span>
				</view>
				<view
					style="width: 60rpx;height: 60rpx;"
					class="flex align-center justify-center bg-light rounded-circle mr-3"
					hover-class="bg-hover-light-important"
				>
					<span class="iconfont icon-gengduo" @click="handleOpenSortmune"></span>
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
		<fileList
			v-for="(item, index) in list"
			:key="index"
			:item="item"
			:index="index"
			@handleSelectList="handleSelect"
			@handleClickList="handleClickListItem(item)"
		></fileList>
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
		<!-- 删除 -->
		<fDialog ref="deleteRef">是否删除选中项目</fDialog>
		<!-- 重命名 -->
		<fDialog ref="renameRef">
			<input
				type="text"
				class="bg-light rounded flex-1 px-2"
				style="height: 95rpx;font-size: 20px;"
				placeholder="请输入修改后的文件名"
				v-model="rename"
				focus
			/>
		</fDialog>
		<!-- 新建文件夹 -->
		<fDialog ref="newDirRef">
			<input
				type="text"
				class="bg-light rounded flex-1 px-2"
				style="height: 95rpx;font-size: 20px;"
				placeholder="请输入新的文件夹名称"
				v-model="newDirName"
				focus
			/>
		</fDialog>
		<!-- 顶部加号菜单 -->
		<uniPopup ref="addMuneRef" type="bottom">
			<view class="bg-white flex" style="height: 200rpx;">
				<view
					class="flex-1 flex align-center justify-center flex-column"
					hover-class="bg-light"
					v-for="(item, index) in addMuneList"
					:key="index"
					@tap="handleClickAddMuneItem(item)"
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
		<!-- 顶部排序菜单 -->
		<uniPopup ref="sortMuneRef" type="bottom">
			<view class="bg-white">
				<view
					class="flex align-center justify-center py-3 bottom-border  font border-bottom border-light-secondary"
					:class="index === sortIndex ? 'text-main' : 'text-dark'"
					hover-class="bg-light"
					v-for="(item, index) in sortOptions"
					:key="index"
					@click="handleChangeSort(index)"
				>
					{{ item.name }}
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script setup lang="ts">
import { computed, ref, getCurrentInstance, Ref } from 'vue'
import searchBox from './cpns/searchBox.vue'
import { IselectE, IactionItem, IaddItem, IlistItem, IRawlistItem } from './type'
import { useStore } from 'vuex'
const store = useStore()
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup'
const { appContext } = getCurrentInstance()
const $T = appContext.config.globalProperties.$T

type Ifunction = () => {}

// 获取数据
// 格式化数据
const formatListDate = (rawListDate: Array<IRawlistItem>) => {
	return rawListDate.map(item => {
		let type
		if (item.isdir === 1) {
			type = 'dir'
		} else {
			type = item.ext.split('/')[0] || 'none'
		}
		return {
			type,
			checked: false,
			name: item.name,
			data: 'https://' + item.url,
			created_time: item.created_time
		}
	})
}
const getListData = () => {
	$T.get('/file/list?file_id=0', { token: true }).then(res => (list.value = formatListDate(res.rows)))
}
getListData()

let list: Ref<IlistItem[]> = ref([{ type: '', checked: false, data: '', checked_time: '', name: '' }])

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

//点击列表
const handleClickListItem = (item: IlistItem) => {
	switch (item.type) {
		case 'dir':
			console.log('dir')
			break
		case 'image':
			if (typeof list.value != undefined) {
				let images = list.value.filter(item => item.type === 'image')
				uni.previewImage({
					current: item.data,
					urls: images.map(item => item.data)
				})
			}
			break
		case 'video':
			console.log(`/page/video?videourl=${item.data}`)
			uni.navigateTo({
				url: `/pages/video?videourl=${item.data}&title=${item.name}`
			})
			// uni.navigateTo({
			// 	url: '/pages/video'
			// })
			break
		case 'text':
			console.log('text')
			break
		case 'none':
			console.log('none')
			break
		default:
			break
	}
}

// 底部菜单相关
const deleteRef = ref(null)
const renameRef = ref(null)
let actions: Ref<Array<IactionItem>> = computed(() => {
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
			rename.value = checkedList.value[0].name
			renameRef.value.open((close: Ifunction) => {
				if (rename.value == '')
					return uni.showToast({
						title: '文件名不合法',
						icon: 'error'
					})
				else checkedList.value[0].name = rename.value
				close()
			})
			break
	}
}
const rename = ref('')

//顶部菜单
// 更多部分
const addMuneRef = ref(null)
const newDirRef = ref(null)
const addMuneList: Ref<Array<IaddItem>> = ref([
	{ icon: 'icon-file-b-6', color: 'text-success', text: '上传图片' },
	{ icon: 'icon-file-b-9', color: 'text-primary', text: '上传视频' },
	{ icon: 'icon-file-b-8', color: 'text-muted', text: '上传文件' },
	{ icon: 'icon-file-b-2', color: 'text-warning', text: '新建文件夹' }
])
const newDirName = ref('')

const handleOpenAddmune = () => {
	addMuneRef.value.open()
}
const handleClickAddMuneItem = (e: IaddItem) => {
	addMuneRef.value.close()
	switch (e.text) {
		case '新建文件夹':
			newDirRef.value.open((close: Ifunction) => {
				if (newDirName.value == '') {
					close()
					return uni.showToast({
						title: '请输入新的文件夹名称',
						icon: 'error'
					})
				}
				list.value.push({
					type: 'dir',
					name: newDirName.value,
					data: '',
					create_time: '2023-03-12 12:11',
					checked: false
				})
				newDirName.value = ''
				uni.showToast({
					title: '新增成功'
				})
				close()
			})
	}
}
// 排序部分
const sortMuneRef = ref(null)
const sortIndex = ref(0)
const sortOptions = [{ name: '按名称排序' }, { name: '按时间排序' }]
const handleOpenSortmune = () => {
	sortMuneRef.value.open()
}
const handleChangeSort = (index: number) => {
	sortIndex.value = index
	sortMuneRef.value.close()
}
</script>

<style lang="less" scoped>
.bg-hover-light-important {
	background-color: #dae0e5 !important;
}
</style>
