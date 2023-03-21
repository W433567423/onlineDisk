<template>
	<view class="index">
		<!-- 顶部导航 -->
		<navBar v-if="checkedCount === 0">
			<template #left>
				<view
					style="width: 44rpx; height: 44rpx; background-color: yellow"
					class="flex align-center justify-center bg-light rounded-circle ml-3"
					hover-class="bg-hover-light-important "
					@tap="handleBackTap"
					v-if="currentFile"
				>
					<span class="iconfont icon-fanhui" style="font-size: 10px"></span>
				</view>
				<text class="font-sm ml-2" style="line-height: 44rpx">{{ currentFile ? currentFile.name : '首页' }}</text>
			</template>
			<template #right>
				<view
					style="width: 60rpx; height: 60rpx"
					class="flex align-center justify-center bg-light rounded-circle mr-3"
					hover-class="bg-hover-light-important "
				>
					<span class="iconfont icon-zengjia" @click="handleOpenAddmune"></span>
				</view>
				<view
					style="width: 60rpx; height: 60rpx"
					class="flex align-center justify-center bg-light rounded-circle mr-3"
					hover-class="bg-hover-light-important"
				>
					<span class="iconfont icon-gengduo" @click="sortMuneRef.open()"></span>
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
		<searchBox @handleSearch="handleSearchEmits" @handleFlashList="getListData()"></searchBox>
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
			<view style="height: 115rpx"></view>
			<view style="height: 115rpx" class="flex align-stretch bg-primary text-white fixed-bottom">
				<view
					class="flex-1 flex flex-column align-center justify-center border"
					style="line-height: 1.5"
					v-for="(item, index) in actions"
					:key="index"
					@click="handleClickAction(item)"
					hover-class="bg-hover-primary"
				>
					<span class="iconfont" :class="item.icon"></span>
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
				style="height: 95rpx; font-size: 20px"
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
				style="height: 95rpx; font-size: 20px"
				placeholder="请输入新的文件夹名称"
				v-model="newDirName"
				focus
			/>
		</fDialog>
		<!-- 顶部加号菜单 -->
		<uniPopup ref="addMuneRef" type="bottom">
			<view class="bg-white flex" style="height: 200rpx">
				<view
					class="flex-1 flex align-center justify-center flex-column"
					hover-class="bg-light"
					v-for="(item, index) in addMuneList"
					:key="index"
					@tap="handleClickAddMuneItem(item)"
				>
					<span
						style="width: 110rpx; height: 110rpx; font-size: 65rpx"
						class="rounded-circle bg-light iconfont flex align-center justify-center"
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
					class="flex align-center justify-center py-3 bottom-border font border-bottom border-light-secondary"
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
import { useStore } from 'vuex'

import searchBox from './cpns/searchBox.vue'
import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup'
import { genID } from '@/utils'

import { IselectE, IactionItem, IaddItem, IlistItem, IRawlistItem, IDirs } from './type'

// 上下文对象，发送请求对象，vuex站台对象
const { appContext } = getCurrentInstance()
const $T = appContext.config.globalProperties.$T
const store = useStore()

const addMuneList: IaddItem[] = [
	{ icon: 'icon-file-b-6', color: 'text-success', text: '上传图片' },
	{ icon: 'icon-file-b-9', color: 'text-primary', text: '上传视频' },
	{ icon: 'icon-file-b-8', color: 'text-muted', text: '上传文件' },
	{ icon: 'icon-file-b-2', color: 'text-warning', text: '新建文件夹' }
]
const sortOptions = [{ name: '按名称排序', key: 'name' }, { name: '按时间排序', key: 'created_time' }]

const rename = ref('')
const newDirName = ref('')
const sortIndex = ref(0)
const deleteRef = ref(null)
const renameRef = ref(null)
const addMuneRef = ref(null)
const sortMuneRef = ref(null)
const newDirRef = ref(null)
const dirs: Ref<Array<IDirs>> = ref([]) // 当前目录列表
const list: Ref<Array<IlistItem>> = ref([{ type: '', checked: false, data: '', checked_time: '', name: '' }])

const actions: Ref<Array<IactionItem>> = computed(() => {
	if (checkedCount.value > 1) return [{ text: '下载', icon: 'icon-xiazai' }, { text: '删除', icon: 'icon-shanchu' }]
	return [
		{ text: '下载', icon: 'icon-xiazai' },
		{ text: '分享', icon: 'icon-fenxiang-1' },
		{ text: '删除', icon: 'icon-shanchu' },
		{ text: '重命名', icon: 'icon-chongmingming' }
	]
})
const currentFile = computed(
	// 当前文件
	(): number => {
		let l = dirs.value.length
		if (l === 0) {
			return false
		}
		return dirs.value[l - 1]
	}
)
const currenfFile_id = computed(
	// 当前文件id
	(): number => {
		let l = dirs.value.length
		if (l === 0) {
			return 0
		}
		return dirs.value[l - 1].id
	}
)
const checkedList = computed(() => list.value.filter(item => item.checked))
const checkedCount = computed(() => checkedList.value.length)

// 格式化列表数据
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
			created_time: item.created_time,
			id: item.id
		}
	})
}
// 获取列表数据
const getListData = () => {
	let orderby = sortOptions[sortIndex.value].key as string
	$T.get(`/file/list?file_id=${currenfFile_id.value}&orderby=${orderby}`, {
		token: true
	}).then(res => (list.value = formatListDate(res.rows)))
}
// 处理选择事件
const handleSelect = (e: IselectE) => {
	list.value[e.index].checked = e.value
}
//处理全选事件
const handleCheckAll = (state: boolean) => {
	list.value.forEach(item => (item.checked = state))
}
// 处理点击列表
const handleClickListItem = (item: IlistItem) => {
	switch (item.type) {
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
			break
		default:
			dirs.value.push({ id: item.id, name: item.name })
			getListData()
			uni.setStorage({ key: 'dirs', data: JSON.stringify(dirs.value) })
			break
	}
}
// 处理底部菜单点击事件
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
				let ids = checkedList.value.map(item => item.id).join(',')
				uni.showLoading({ title: '删除中...', icon: 'loading' })
				$T.post('/file/delete', { ids }, { token: true }).then(() => {
					getListData()
					uni.showToast({
						title: '删除成功',
						icon: 'success'
					})
				})
				uni.hideLoading()
				close()
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
// 顶部菜单之更多按钮菜单
const handleOpenAddmune = () => {
	addMuneRef.value.open()
}
// 顶部菜单之加号按钮菜单
const handleClickAddMuneItem = (e: IaddItem) => {
	addMuneRef.value.close()
	switch (e.text) {
		case '上传图片':
			uni.chooseImage({
				count: 9,
				success: res => {
					res.tempFiles.forEach(item => {
						uploadFile(item, 'image')
					})
				}
			})
			break
		case '新建文件夹':
			newDirRef.value.open((close: Ifunction) => {
				if (newDirName.value == '') {
					close()
					uni.showToast({
						title: '请输入新的文件夹名称',
						icon: 'error'
					})
					return
				}
				$T.post('/file/mkdir', { file_id: currenfFile_id.value, name: newDirName.value }, { token: true }).then(() => {
					getListData()
					newDirName.value = ''
					uni.showToast({
						title: '新增成功',
						icon: 'success'
					})
				})
				newDirName.value = ''
				close()
			})
			break
		default:
			break
	}
}
// 返回上一个目录
const handleBackTap = () => {
	dirs.value.pop()
	getListData()
	uni.setStorage({ key: 'dirs', data: JSON.stringify(dirs.value) })
}
// 处理排序切换事件
const handleChangeSort = (index: number) => {
	sortIndex.value = index
	getListData()
	sortMuneRef.value.close()
}
// 搜索框事件
const handleSearchEmits = (e: string) => {
	console.log(e)
	$T.get('/file/search?keyword=' + e, { token: true }).then(res => (list.value = formatListDate(res)))
}

const uploadFile = (file, type) => {
	let t = type
	const key = genID(8)
	let name = file.name
	if (!name) {
		name = file.path.substring(file.path.lastIndexOf('/') + 1)
	}
	let obj = {
		name,
		type: t,
		size: file.size,
		key,
		progress: 0,
		status: true,
		created_time: new Date().getTime()
	}
	// 创建上传任务
	store.dispatch('fileModule/createUploadTask', obj)
	// 上传
	$T.upload(
		'/file/upload?file_id=' + currenfFile_id,
		{
			filePath: file.path
		},
		p => {
			console.log(p)
			// 更新上传任务进度
			store.dispatch('fileModule/updateUploadProgress', {
				status: true,
				progress: p,
				key
			})
		}
	).then(res => {
		console.log(res)
		getListData()
	})
}
// 生命周期直接执行的函数
getListData() // 获取数据
if (uni.getStorageSync('dirs')) {
	// 初始化当前目录
	dirs.value = JSON.parse(uni.getStorageSync('dirs'))
}
</script>

<style lang="less" scoped>
.bg-hover-light-important {
	background-color: #dae0e5 !important;
}
</style>
