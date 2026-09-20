const config = {
    get() {
        return {
            url : process.env.VUE_APP_BASE_API_URL + process.env.VUE_APP_BASE_API + '/',
            name: process.env.VUE_APP_BASE_API,
			menuList:[
				{
					name: '迁徙路线管理',
					icon: '${frontMenu.fontClass}',
					child:[
						{
							name:'迁徙路线',
							url:'/index/qianxiluxianList'
						},
					]
				},
				{
					name: '论坛交流',
					icon: '${frontMenu.fontClass}',
					child:[
						{
							name:'论坛交流',
							url:'/index/forumList'
						},
					]
				},
				{
					name: '候鸟信息管理',
					icon: '${frontMenu.fontClass}',
					child:[
						{
							name:'候鸟数据',
							url:'/index/houniaoshujuList'
						},
					]
				},
			]
        }
    },
    getProjectName(){
        return {
            projectName: "候鸟监测数据管理系统"
        } 
    }
}
export default config
