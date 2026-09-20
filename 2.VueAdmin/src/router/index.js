	import {
		createRouter,
		createWebHashHistory
	} from 'vue-router'
	import discusshouniaoshuju from '@/views/discusshouniaoshuju/list'
	import houniaoshuju from '@/views/houniaoshuju/list'
	import forum from '@/views/forum/list'
	import news from '@/views/news/list'
	import yonghu from '@/views/yonghu/list'
	import houniaozhonglei from '@/views/houniaozhonglei/list'
	import luruyuan from '@/views/luruyuan/list'
	import storeup from '@/views/storeup/list'
	import config from '@/views/config/list'
	import qianxiluxian from '@/views/qianxiluxian/list'
	import luruyuanCenter from '@/views/luruyuan/center'

export const routes = [{
		path: '/login',
		name: 'login',
		component: () => import('../views/login.vue')
	},{
		path: '/',
		name: '首页',
		component: () => import('../views/index'),
		children: [{
			path: '/',
			name: '首页Home',
			component: () => import('../views/HomeView.vue'),
			meta: {
				affix: true
			}
		}, {
			path: '/updatepassword',
			name: '修改密码',
			component: () => import('../views/updatepassword.vue')
		}
		
		,{
			path: '/luruyuanCenter',
			name: '录入员个人中心',
			component: luruyuanCenter
		}
		,{
			path: '/discusshouniaoshuju',
			name: '候鸟数据评论',
			component: discusshouniaoshuju
		}
		,{
			path: '/houniaoshuju',
			name: '候鸟数据',
			component: houniaoshuju
		}
		,{
			path: '/forum',
			name: '我的发布',
			component: forum
		}
		,{
			path: '/news',
			name: '新闻资讯',
			component: news
		}
		,{
			path: '/yonghu',
			name: '用户',
			component: yonghu
		}
		,{
			path: '/houniaozhonglei',
			name: '候鸟种类',
			component: houniaozhonglei
		}
		,{
			path: '/luruyuan',
			name: '录入员',
			component: luruyuan
		}
		,{
			path: '/storeup',
			name: '我的收藏',
			component: storeup
		}
		,{
			path: '/config',
			name: '轮播图',
			component: config
		}
		,{
			path: '/qianxiluxian',
			name: '迁徙路线',
			component: qianxiluxian
		}
		]
	},
]

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes
})

export default router
