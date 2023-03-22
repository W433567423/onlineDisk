<script setup lang="ts">
import { useStore } from 'vuex'
// 初始化用户信息
useStore().dispatch('userModule/initUser')
//初始化传输列表
useStore().dispatch('fileModule/initTransmitTask')
</script>

<style lang="less">
/*每个页面公共css */
@import url('common/uni.css');
@import url('common/common.css');
@import url('common/free.css');
@import url('common/icon.css');
</style>
