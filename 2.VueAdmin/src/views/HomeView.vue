<template>
	<div class="home_view">
		<div class="projectTitle">欢迎使用 {{projectName}}</div>
		<div class="count_list">
			<el-collapse-transition v-if="btnAuth('houniaoshuju','首页总数')">
				<el-card v-show="countTypeList.closehouniaoshujuCountType" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								候鸟数据
							</div>
							<div class="card_head_right">
								<el-icon @click="countTypeClick('hiddenhouniaoshujuCountType')" class="showIcons"
									:class="countTypeList.hiddenhouniaoshujuCountType?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="countTypeClick('closehouniaoshujuCountType')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
							
						</div>
					</template>
					<el-collapse-transition>
						<div class="count_item" v-show="countTypeList.hiddenhouniaoshujuCountType">
							<div class="count_title">候鸟数据总数</div>
							<div class="count_num">{{houniaoshujuCount}}</div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
		<div class="card_list">
			<el-collapse-transition v-if="btnAuth('houniaoshuju','首页统计')">
				<el-card v-show="cardTypeList.closehouniaoshujuChartType1" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								候鸟数据
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenhouniaoshujuChartType1')" class="showIcons"
									:class="cardTypeList.hiddenhouniaoshujuChartType1?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closehouniaoshujuChartType1')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenhouniaoshujuChartType1">
							<div id="houniaoshujuhouniaozhongleiEchart1" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
			<el-collapse-transition v-if="btnAuth('houniaoshuju','首页统计')">
				<el-card v-show="cardTypeList.closehouniaoshujuChartType2" class="card_view">
					<template #header>
						<div class="index_card_head">
							<div class="card_head_title">
								候鸟数据
							</div>
							<div class="card_head_right">
								<el-icon @click="cardTypeClick('hiddenhouniaoshujuChartType2')" class="showIcons"
									:class="cardTypeList.hiddenhouniaoshujuChartType2?'showIcons1':''">
									<ArrowUpBold />
								</el-icon>
								<el-icon @click="cardTypeClick('closehouniaoshujuChartType2')" class="closeIcons">
									<CloseBold />
								</el-icon>
							</div>
						</div>
					</template>
					<el-collapse-transition>
						<div class="card_item" v-show="cardTypeList.hiddenhouniaoshujuChartType2">
							<div id="houniaoshujuhouniaomingchengEchart2" style="width: 100%;height: 400px;"></div>
						</div>
					</el-collapse-transition>
				</el-card>
			</el-collapse-transition>
		</div>
	</div>
</template>

<script setup>
	import {
		inject,
		nextTick,
		ref,
		getCurrentInstance
	} from 'vue';
	const context = getCurrentInstance()?.appContext.config.globalProperties;
	const projectName = context.$project.projectName
	const countTypeList = ref({
	})
	const getCountList=()=>{
		countTypeList.value.closehouniaoshujuCountType = true
		countTypeList.value.hiddenhouniaoshujuCountType = true
		if(btnAuth('houniaoshuju','首页总数')){
			gethouniaoshujuCount()
		}
	}
	const houniaoshujuCount = ref(0)
	const gethouniaoshujuCount = () => {
		context?.$http({
			url:'houniaoshuju/count',
			method: 'get'
		}).then(res=>{
			houniaoshujuCount.value = res.data.data
		})
	}
	const countTypeClick = (e) => {
		countTypeList.value[e] = !countTypeList.value[e]
	}
	const init=()=>{
		getCountList()
		getCardList()
	}
	//权限验证
	const btnAuth = (e,a)=>{
		return context?.$toolUtil.isAuth(e,a)
	}
	let echarts = inject("echarts")
	const cardTypeClick = (e) =>{
		cardTypeList.value[e] = !cardTypeList.value[e]
		setTimeout(()=>{
			getCardList()
		},1000)
	}
	const cardTypeList = ref({
		closehouniaoshujuChartType1: true,
		hiddenhouniaoshujuChartType1: true,
		closehouniaoshujuChartType2: true,
		hiddenhouniaoshujuChartType2: true,
	})
	const getCardList = () => {
		if(btnAuth('houniaoshuju','首页统计')){
			gethouniaoshujuChart1()
		}
		if(btnAuth('houniaoshuju','首页统计')){
			gethouniaoshujuChart2()
		}
	}
	const gethouniaoshujuChart1 = () => {
		nextTick(()=>{
			var houniaozhongleiEchart1 = echarts.init(document.getElementById("houniaoshujuhouniaozhongleiEchart1"),'macarons');
			context?.$http({
				url: "houniaoshuju/group/houniaozhonglei",
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].houniaozhonglei);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].houniaozhonglei
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '候鸟种类分析',
                        left: 'center'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    tooltip: {
						trigger: 'item',
						formatter: '{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: pArray,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
				houniaozhongleiEchart1.clear()
				// 使用刚指定的配置项和数据显示图表。
				houniaozhongleiEchart1.setOption(option);
				//根据窗口的大小变动图表
				houniaozhongleiEchart1.resize();
			})
		})
	}
	const gethouniaoshujuChart2 = () => {
		nextTick(()=>{
			var houniaomingchengEchart2 = echarts.init(document.getElementById("houniaoshujuhouniaomingchengEchart2"),'macarons');
			context?.$http({
				url: "houniaoshuju/group/houniaomingcheng",
				method: "get",
			}).then(obj=>{
				let res = obj.data.data
				let xAxis = [];
				let yAxis = [];
				let pArray = []
				for(let i=0;i<res.length;i++){
				    xAxis.push(res[i].houniaomingcheng);
				    yAxis.push(parseFloat((res[i].total)));
				    pArray.push({
				        value: parseFloat((res[i].total)),
				        name: res[i].houniaomingcheng
				    })
				}
				var option = {};
                option = {
                    title: {
                        text: '候鸟观察统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel: {
                            rotate: 40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
				// 使用刚指定的配置项和数据显示图表。
				houniaomingchengEchart2.clear()
				houniaomingchengEchart2.setOption(option);
				//根据窗口的大小变动图表
				houniaomingchengEchart2.resize();
			})
		})
	}
	init()
</script>
<style lang="scss">
	.projectTitle{
		padding: 20px 0;
		font-weight: bold;
		display: flex;
		width: 100%;
		font-size: 30px;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.showIcons {
		transition: transform 0.3s;
		margin-right: 10px;
	}

	.showIcons1 {
		transform: rotate(-180deg);
	}
	
	// 总数盒子
	.count_list{
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 总数card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// card头部
			.el-card__header {
				border: 1px solid #e4e7ed;
				padding: 7px 20px;
				left: 0;
				background: #62B8FF;
				bottom: 0;
				width: 100%;
				border-width: 0;
				position: absolute;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #868686;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon {
							cursor: pointer;
							color: #868686;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.count_item{
					padding: 30px 20px 60px;
					flex-direction: column-reverse;
					display: flex;
					// 总数标题
					.count_title{
						color: #3753A2;
						font-weight: bold;
						font-size: 16px;
						line-height: 1;
						order: 1;
					}
					// 总数数字
					.count_num{
						color: #3753A2;
						font-weight: bold;
						font-size: 50px;
						line-height: 1.5;
						order: 2;
					}
				}
			}
		}
	}
	// 首页盒子
	.home_view {
	}
	// 统计图盒子
	.card_list {
		padding: 0 0 20px;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: flex-start;
		flex-wrap: wrap;
		// 统计图card
		.card_view {
			border: 0px solid #e4e7ed;
			border-radius: 10px;
			box-shadow: none;
			margin: 0 10px 10px;
			flex: 1;
			background: linear-gradient(90deg, #E3EDF9 0%, #D9E6F7 100%);
			width: 100%;
			position: relative;
			box-sizing: border-box;
			height: auto;
			// 头部
			.el-card__header {
				border: 0px solid #e4e7ed;
				padding: 7px 20px;
				left: 0;
				bottom: 0;
				background: #62B8FF;
				width: 100%;
				border-width: 0;
				position: absolute;
				// 头部盒子
				.index_card_head {
					display: flex;
					width: 100%;
					justify-content: space-between;
					align-items: center;
					// 标题
					.card_head_title {
						color: #868686;
						font-weight: bold;
						font-size: 14px;
					}
					// 按钮盒子
					.card_head_right {
						display: flex;
						align-items: center;
						// 按钮
						.el-icon{
							cursor: pointer;
							color: #868686;
							font-weight: bold;
							font-size: 12px;
						}
					}
				}
			}
			// body
			.el-card__body {
				padding: 0;
				// body盒子
				.card_item{
					padding: 30px;
					text-align: center;
				}
			}
		}
	}
</style>
