import {
	createStore
} from 'vuex'
import userModule from './userModule'
import fileModule from './fileModule'
const store = createStore({
	modules: {
		userModule,
		fileModule
	}
})
export default store
