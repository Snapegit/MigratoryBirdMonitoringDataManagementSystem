import { createRouter, createWebHashHistory } from 'vue-router'
import index from '../views'
import home from '../views/pages/home.vue'
import login from '../views/pages/login.vue'
import forumList from '@/views/pages/forum/list'
import newsList from '@/views/pages/news/list'
import yonghuList from '@/views/pages/yonghu/list'
import yonghuDetail from '@/views/pages/yonghu/formModel'
import yonghuAdd from '@/views/pages/yonghu/formAdd'
import yonghuRegister from '@/views/pages/yonghu/register'
import yonghuCenter from '@/views/pages/yonghu/center'
import houniaozhongleiList from '@/views/pages/houniaozhonglei/list'
import houniaozhongleiDetail from '@/views/pages/houniaozhonglei/formModel'
import houniaozhongleiAdd from '@/views/pages/houniaozhonglei/formAdd'
import houniaoshujuList from '@/views/pages/houniaoshuju/list'
import houniaoshujuDetail from '@/views/pages/houniaoshuju/formModel'
import houniaoshujuAdd from '@/views/pages/houniaoshuju/formAdd'
import qianxiluxianList from '@/views/pages/qianxiluxian/list'
import qianxiluxianDetail from '@/views/pages/qianxiluxian/formModel'
import qianxiluxianAdd from '@/views/pages/qianxiluxian/formAdd'
import storeupList from '@/views/pages/storeup/list'
import luruyuanList from '@/views/pages/luruyuan/list'
import luruyuanDetail from '@/views/pages/luruyuan/formModel'
import luruyuanAdd from '@/views/pages/luruyuan/formAdd'
import menuList from '@/views/pages/menu/list'
import menuDetail from '@/views/pages/menu/formModel'
import menuAdd from '@/views/pages/menu/formAdd'
import discusshouniaoshujuList from '@/views/pages/discusshouniaoshuju/list'
import discusshouniaoshujuDetail from '@/views/pages/discusshouniaoshuju/formModel'
import discusshouniaoshujuAdd from '@/views/pages/discusshouniaoshuju/formAdd'

const routes = [{
		path: '/',
		redirect: '/index/home'
	},
	{
		path: '/index',
		component: index,
		children: [{
			path: 'home',
			component: home
		}
		, {
			path: 'forumList',
			component: forumList
		}
		, {
			path: 'newsList',
			component: newsList
		}
		, {
			path: 'yonghuList',
			component: yonghuList
		}, {
			path: 'yonghuDetail',
			component: yonghuDetail
		}, {
			path: 'yonghuAdd',
			component: yonghuAdd
		}
		, {
			path: 'yonghuCenter',
			component: yonghuCenter
		}
		, {
			path: 'houniaozhongleiList',
			component: houniaozhongleiList
		}, {
			path: 'houniaozhongleiDetail',
			component: houniaozhongleiDetail
		}, {
			path: 'houniaozhongleiAdd',
			component: houniaozhongleiAdd
		}
		, {
			path: 'houniaoshujuList',
			component: houniaoshujuList
		}, {
			path: 'houniaoshujuDetail',
			component: houniaoshujuDetail
		}, {
			path: 'houniaoshujuAdd',
			component: houniaoshujuAdd
		}
		, {
			path: 'qianxiluxianList',
			component: qianxiluxianList
		}, {
			path: 'qianxiluxianDetail',
			component: qianxiluxianDetail
		}, {
			path: 'qianxiluxianAdd',
			component: qianxiluxianAdd
		}
		, {
			path: 'storeupList',
			component: storeupList
		}
		, {
			path: 'luruyuanList',
			component: luruyuanList
		}, {
			path: 'luruyuanDetail',
			component: luruyuanDetail
		}, {
			path: 'luruyuanAdd',
			component: luruyuanAdd
		}
		, {
			path: 'menuList',
			component: menuList
		}, {
			path: 'menuDetail',
			component: menuDetail
		}, {
			path: 'menuAdd',
			component: menuAdd
		}
		, {
			path: 'discusshouniaoshujuList',
			component: discusshouniaoshujuList
		}, {
			path: 'discusshouniaoshujuDetail',
			component: discusshouniaoshujuDetail
		}, {
			path: 'discusshouniaoshujuAdd',
			component: discusshouniaoshujuAdd
		}
		]
	},
	{
		path: '/login',
		component: login
	}
	,{
		path: '/yonghuRegister',
		component: yonghuRegister
	}
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
