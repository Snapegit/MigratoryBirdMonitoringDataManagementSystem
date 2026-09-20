<template>
	<div>
		<el-dialog v-model="formVisible" :title="formTitle" width="80%" destroy-on-close :fullscreen='false'>
			<el-form class="formModel_form" ref="formRef" :model="form" label-width="$template2.back.add.form.base.labelWidth" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="候鸟名称" prop="houniaomingcheng">
							<el-input class="list_inp" v-model="form.houniaomingcheng" placeholder="候鸟名称"
								 type="text" 								:readonly="!isAdd||disabledForm.houniaomingcheng?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="候鸟图片" prop="houniaotupian">
							<uploads
								:disabled="!isAdd||disabledForm.houniaotupian?true:false"
								action="file/upload" 
								tip="请上传候鸟图片" 
								:limit="3" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.houniaotupian?form.houniaotupian:''" 
								@change="houniaotupianUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="候鸟种类" prop="houniaozhonglei">
							<el-select
								class="list_sel"
								:disabled="!isAdd||disabledForm.houniaozhonglei?true:false"
								v-model="form.houniaozhonglei" 
								placeholder="请选择候鸟种类"
								>
								<el-option v-for="(item,index) in houniaozhongleiLists" :label="item"
									:value="item"
									>
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="观察日期" prop="guanchariqi">
							<el-date-picker
								class="list_date"
								v-model="form.guanchariqi"
								format="YYYY 年 MM 月 DD 日"
								value-format="YYYY-MM-DD"
								type="datetime"
								:readonly="!isAdd||disabledForm.guanchariqi?true:false"
								placeholder="请选择观察日期" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="观察地点" prop="guanchadidian">
							<el-input class="list_inp" v-model="form.guanchadidian" placeholder="观察地点"
								 type="text" 								:readonly="!isAdd||disabledForm.guanchadidian?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="观察数量" prop="guanchashuliang">
							<el-input class="list_inp" v-model="form.guanchashuliang" placeholder="观察数量"
								 type="text" 								:readonly="!isAdd||disabledForm.guanchashuliang?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="观察行为" prop="guanchaxingwei">
							<el-input class="list_inp" v-model="form.guanchaxingwei" placeholder="观察行为"
								 type="text" 								:readonly="!isAdd||disabledForm.guanchaxingwei?true:false" />
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="拍摄视频" prop="paisheshipin">
							<uploads
								:disabled="!isAdd||disabledForm.paisheshipin?true:false"
								type="file"
								action="file/upload" 
								tip="请上传拍摄视频" 
								:limit="1" 
								style="width: 100%;text-align: left;"
								:fileUrls="form.paisheshipin?form.paisheshipin:''" 
								@change="paisheshipinUploadSuccess">
							</uploads>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="录入时间" prop="lurushijian">
							<el-date-picker
								class="list_date"
								v-model="form.lurushijian"
								format="YYYY-MM-DD HH:mm:ss"
								value-format="YYYY-MM-DD HH:mm:ss"
								type="datetime"
								:readonly="!isAdd||disabledForm.lurushijian?true:false"
								placeholder="请选择录入时间" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="录入员" prop="luruyuan">
							<el-input class="list_inp" v-model="form.luruyuan" placeholder="录入员"
								 type="text" 								:readonly="!isAdd||disabledForm.luruyuan?true:false" />
						</el-form-item>
					</el-col>

				</el-row>
			</el-form>
			<template #footer v-if="isAdd||type=='logistics'||type=='reply'">
				<span class="formModel_btn_box">
					<el-button class="formModel_cancel" @click="closeClick">取消</el-button>
					<el-button class="formModel_confirm" type="primary" @click="save"
						>
						提交
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>
<script setup>
	import {
		reactive,
		ref,
		getCurrentInstance,
		nextTick,
		computed,
		defineEmits
	} from 'vue'
	const context = getCurrentInstance()?.appContext.config.globalProperties;	
	const emit = defineEmits(['formModelChange'])
	//基础信息
	const tableName = 'houniaoshuju'
	const formName = '候鸟数据'
	//基础信息
	//form表单
	const form = ref({})
	const disabledForm = ref({
		houniaomingcheng : false,
		houniaotupian : false,
		houniaozhonglei : false,
		guanchariqi : false,
		guanchadidian : false,
		guanchashuliang : false,
		guanchaxingwei : false,
		paisheshipin : false,
		thumbsupnum : false,
		crazilynum : false,
		storeupnum : false,
		lurushijian : false,
		luruyuan : false,
	})
	const formVisible = ref(false)
	const isAdd = ref(false)
	const formTitle = ref('')
	//表单验证
	//匹配整数
	const validateIntNumber = (rule, value, callback) => {
		if (!value) {
			callback();
		} else if (!context?.$toolUtil.isIntNumer(value)) {
			callback(new Error("请输入整数"));
		} else {
			callback();
		}
	}
	//匹配数字
	const validateNumber = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isNumber(value)) {
			callback(new Error("请输入数字"));
		} else {
			callback();
		}
	}
	//匹配手机号码
	const validateMobile = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isMobile(value)) {
			callback(new Error("请输入正确的手机号码"));
		} else {
			callback();
		}
	}
	//匹配电话号码
	const validatePhone = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isPhone(value)) {
			callback(new Error("请输入正确的电话号码"));
		} else {
			callback();
		}
	}
	//匹配邮箱
	const validateEmail = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isEmail(value)) {
			callback(new Error("请输入正确的邮箱地址"));
		} else {
			callback();
		}
	}
	//匹配身份证
	const validateIdCard = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.checkIdCard(value)) {
			callback(new Error("请输入正确的身份证号码"));
		} else {
			callback();
		}
	}
	//匹配网站地址
	const validateUrl = (rule, value, callback) => {
		if(!value){
			callback();
		} else if (!context?.$toolUtil.isURL(value)) {
			callback(new Error("请输入正确的URL地址"));
		} else {
			callback();
		}
	}
	const rules = ref({
		houniaomingcheng: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		houniaotupian: [
		],
		houniaozhonglei: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		guanchariqi: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		guanchadidian: [
			{required: true,message: '请输入',trigger: 'blur'}, 
		],
		guanchashuliang: [
		],
		guanchaxingwei: [
		],
		paisheshipin: [
		],
		thumbsupnum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		crazilynum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		storeupnum: [
			{ validator: validateIntNumber, trigger: 'blur' },
		],
		lurushijian: [
		],
		luruyuan: [
		],
	})
	//表单验证
	
	const formRef = ref(null)
	const id = ref(0)
	const type = ref('')
	//候鸟图片上传回调
	const houniaotupianUploadSuccess=(e)=>{
		form.value.houniaotupian = e
	}
	//候鸟种类列表
	const houniaozhongleiLists = ref([])
	//拍摄视频上传回调
	const paisheshipinUploadSuccess=(e)=>{
		form.value.paisheshipin = e
	}
	//methods

	//获取唯一标识
	const getUUID =()=> {
      return new Date().getTime();
    }
	//重置
	const resetForm = () => {
		form.value = {
			houniaomingcheng: '',
			houniaotupian: '',
			houniaozhonglei: '',
			guanchariqi: '',
			guanchadidian: '',
			guanchashuliang: '',
			guanchaxingwei: '',
			paisheshipin: '',
			thumbsupnum: '0',
			crazilynum: '0',
			storeupnum: '0',
			lurushijian: '',
			luruyuan: '',
		}
	}
	//获取info
	const getInfo = ()=>{
		context?.$http({
			url: `${tableName}/info/${id.value}`,
			method: 'get'
		}).then(res => {
			let reg=new RegExp('../../../file','g')
			form.value = res.data.data
			formVisible.value = true
		})
	}
	const crossRow = ref('')
	const crossTable = ref('')
	const crossTips = ref('')
	const crossColumnName = ref('')
	const crossColumnValue = ref('')
	//初始化
	const init=(formId=null,formType='add',formNames='',row=null,table=null,statusColumnName=null,tips=null,statusColumnValue=null)=>{
		resetForm()
			form.value.lurushijian = context?.$toolUtil.getCurDateTime()
		if(formId){
			id.value = formId
			type.value = formType
		}
		if(formType == 'add'){
			isAdd.value = true
			formTitle.value = '新增' + formName
			formVisible.value = true
		}else if(formType == 'info'){
			isAdd.value = false
			formTitle.value = '查看' + formName
			getInfo()
		}else if(formType == 'edit'){
			isAdd.value = true
			formTitle.value = '修改' + formName
			getInfo()
		}else if(formType == 'logistics'){
			isAdd.value = false
			formTitle.value = '修改物流信息'
			getInfo()
		}else if(formType == 'reply'){
			type.value = formType
			isAdd.value = true
			disabledForm.value.cpicture = true
			disabledForm.value.content = true
			formTitle.value = '回复'
			getInfo()
		}else if(formType == 'cross'){
			isAdd.value = true
			formTitle.value = formNames
			// getInfo()
			for(let x in row){
				if(x=='houniaomingcheng'){
					form.value.houniaomingcheng = row[x];
					disabledForm.value.houniaomingcheng = true;
					continue;
				}
				if(x=='houniaotupian'){
					form.value.houniaotupian = row[x];
					disabledForm.value.houniaotupian = true;
					continue;
				}
				if(x=='houniaozhonglei'){
					form.value.houniaozhonglei = row[x];
					disabledForm.value.houniaozhonglei = true;
					continue;
				}
				if(x=='guanchariqi'){
					form.value.guanchariqi = row[x];
					disabledForm.value.guanchariqi = true;
					continue;
				}
				if(x=='guanchadidian'){
					form.value.guanchadidian = row[x];
					disabledForm.value.guanchadidian = true;
					continue;
				}
				if(x=='guanchashuliang'){
					form.value.guanchashuliang = row[x];
					disabledForm.value.guanchashuliang = true;
					continue;
				}
				if(x=='guanchaxingwei'){
					form.value.guanchaxingwei = row[x];
					disabledForm.value.guanchaxingwei = true;
					continue;
				}
				if(x=='paisheshipin'){
					form.value.paisheshipin = row[x];
					disabledForm.value.paisheshipin = true;
					continue;
				}
				if(x=='thumbsupnum'){
					form.value.thumbsupnum = row[x];
					disabledForm.value.thumbsupnum = true;
					continue;
				}
				if(x=='crazilynum'){
					form.value.crazilynum = row[x];
					disabledForm.value.crazilynum = true;
					continue;
				}
				if(x=='storeupnum'){
					form.value.storeupnum = row[x];
					disabledForm.value.storeupnum = true;
					continue;
				}
				if(x=='lurushijian'){
					form.value.lurushijian = row[x];
					disabledForm.value.lurushijian = true;
					continue;
				}
				if(x=='luruyuan'){
					form.value.luruyuan = row[x];
					disabledForm.value.luruyuan = true;
					continue;
				}
			}
			if(row){
				crossRow.value = row
			}
			if(table){
				crossTable.value = table
			}
			if(tips){
				crossTips.value = tips
			}
			if(statusColumnName){
				crossColumnName.value = statusColumnName
			}
			if(statusColumnValue){
				crossColumnValue.value = statusColumnValue
			}
			form.value.thumbsupnum='0'
			form.value.crazilynum='0'
			form.value.storeupnum='0'
			formVisible.value = true
		}

		context?.$http({
			url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
			method: 'get'
		}).then(res => {
			var json = res.data.data
			if(json.hasOwnProperty('xingming')&& context?.$toolUtil.storageGet("role")!="管理员"){
				form.value.luruyuan = json.xingming
				disabledForm.value.luruyuan = true;
			}
		})
		context?.$http({
			url: `option/houniaozhonglei/houniaozhonglei`,
			method: 'get'
		}).then(res=>{
			houniaozhongleiLists.value = res.data.data
		})
	}
	//初始化
	//声明父级调用
	defineExpose({
		init
	})
	//关闭
	const closeClick = () => {
		formVisible.value = false
	}
	//富文本
	const editorChange = (e,name) =>{
		form.value[name] = e
	}
	//提交
	const save=()=>{
		if(form.value.houniaotupian!=null) {
			form.value.houniaotupian = form.value.houniaotupian.replace(new RegExp(context?.$config.url,"g"),"");
		}
		if(form.value.paisheshipin!=null) {
			form.value.paisheshipin = form.value.paisheshipin.replace(new RegExp(context?.$config.url,"g"),"");
		}
		var table = crossTable.value
		var objcross = JSON.parse(JSON.stringify(crossRow.value))
		let crossUserId = ''
		let crossRefId = ''
		let crossOptNum = ''
		if(type.value == 'cross'){
			if(crossColumnName.value!=''){
				if(!crossColumnName.value.startsWith('[')){
					for(let o in objcross){
						if(o == crossColumnName.value){
							objcross[o] = crossColumnValue.value
						}
					}
					//修改跨表数据
					changeCrossData(objcross)
				}else{
					crossUserId = context?.$toolUtil.storageGet('userid')
					crossRefId = objcross['id']
					crossOptNum = crossColumnName.value.replace(/\[/,"").replace(/\]/,"")
				}
			}
		}
		formRef.value.validate((valid)=>{
			if(valid){
				if(crossUserId&&crossRefId){
					form.value.crossuserid = crossUserId
					form.value.crossrefid = crossRefId
					let params = {
						page: 1,
						limit: 1000, 
						crossuserid:form.value.crossuserid,
						crossrefid:form.value.crossrefid,
					}
					context?.$http({
						url: `${tableName}/page`,
						method: 'get', 
						params: params 
					}).then(res=>{
						if(res.data.data.total>=crossOptNum){
							context?.$toolUtil.message(`${crossTips.value}`,'error')
							return false
						}else{
							context?.$http({
								url: `${tableName}/${!form.value.id ? "save" : "update"}`,
								method: 'post', 
								data: form.value 
							}).then(res=>{
								context?.$toolUtil.message(`操作成功`,'success',()=>{
									formVisible.value = false
									emit('formModelChange')
								})
							})
						}
					})
				}else{
					context?.$http({
						url: `${tableName}/${!form.value.id ? "save" : "update"}`,
						method: 'post', 
						data: form.value 
					}).then(res=>{
						context?.$toolUtil.message(`操作成功`,'success',()=>{
							formVisible.value = false
							emit('formModelChange')
						})
					})
				}
			}
		})
	}
	//修改跨表数据
	const changeCrossData=(row)=>{
		context?.$http({
			url: `${crossTable.value}/update`,
			method: 'post',
			data: row
		}).then(res=>{})
	}
</script>
<style lang="scss" scoped>
	// 表单
	.formModel_form{
		border-radius: 6px;
		padding: 30px;
		// form item
		:deep(.el-form-item) {
			margin: 0 0 20px 0;
			display: flex;
			//label
			.el-form-item__label {
			 color: #9E9E9E;
			 display: block;
			 width: 90px;
			 text-align: center;
			}
			// 内容盒子
			.el-form-item__content {
				display: flex;
				width: calc(100% - 90px);
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				// 输入框
				.list_inp {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					padding: 0 10px;
					background: #fff;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					height: 36px;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
						padding: 0;
					}
					.is-focus {
						box-shadow: none !important;
					}
				}
				//日期选择器
				.list_date {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					background: #fff;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.el-input__wrapper{
						border: none;
						box-shadow: none;
						background: none;
						border-radius: 0;
						height: 100%;
					}
				}
				// 下拉框
				.list_sel {
					border: 2px solid #5FB7FF;
					border-radius: 20px;
					padding: 0 10px;
					background: #fff;
					width: 100%;
					line-height: 36px;
					box-sizing: border-box;
					//去掉默认样式
					.select-trigger{
						height: 100%;
						.el-input{
							height: 100%;
							.el-input__wrapper{
								border: none;
								box-shadow: none;
								background: none;
								border-radius: 0;
								height: 100%;
								padding: 0;
							}
							.is-focus {
								box-shadow: none !important;
							}
						}
					}
				}
				//图片上传样式
				.el-upload-list  {
					//提示语
					.el-upload__tip {
						margin: 7px 0 0;
						color: #999;
						display: none;
						font-size: 12px;
						justify-content: flex-start;
						align-items: center;
					}
					//外部盒子
					.el-upload--picture-card {
						border: 2px solid #5FB7FF;
						cursor: pointer;
						background-color: #fff;
						border-radius: 20px;
						width: 90px;
						line-height: 100px;
						text-align: center;
						height: 90px;
						//图标
						.el-icon{
							color: #9E9E9E;
							font-size: 32px;
						}
					}
					.el-upload-list__item {
						border: 2px solid #5FB7FF;
						cursor: pointer;
						background-color: #fff;
						border-radius: 20px;
						width: 90px;
						line-height: 100px;
						text-align: center;
						height: 90px;
					}
				}
				//文件上传样式
				.upload-demo {
					width: 100%;
					//外部盒子
					.el-upload-dragger {
						border: 2px solid #5FB7FF;
						cursor: pointer;
						display: flex;
						box-sizing: border-box;
						background-color: #fff;
						border-radius: 20px;
						flex-direction: column;
						overflow: hidden;
						width: 280px;
						justify-content: flex-start;
						align-items: center;
						text-align: center;
						height: 100px;
					}
					//图标
					.el-icon--upload {
						color: #E6F1FE;
						font-size: 50px;
						line-height: 0;
					}
					//提示文字
					.el-upload__text {
						margin: 0;
						color: #9E9E9E;
						font-size: 12px;
						em {
							color: #61B7FE;
						}
					}
					//提示文字
					.el-upload__tip {
						margin: 0;
						color: #9E9E9E;
						font-size: 12px;
					}
				}
			}
		}
	}
	// 按钮盒子
	.formModel_btn_box {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		.formModel_cancel {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			margin: 0 10px 0 0;
			outline: none;
			color: #B8B8B8;
			background: #CDE9FF;
			width: auto;
			font-size: 14px;
			height: 40px;
		}
		.formModel_cancel:hover {
			color: #333;
			background: rgba(205, 233, 255, 0.5);
			font-size: 16px;
		}
		
		.formModel_confirm {
			border: 0;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 24px;
			box-shadow: inset 0px 4px 10px 0px rgba(147,147,147,0.302);
			outline: 4px solid #EAF5FF;
			margin: 0 20px;
			color: #2C2C2C;
			background: #96C6EE;
			width: auto;
			font-size: 14px;
			height: 40px;
		}
		.formModel_confirm:hover {
			background: rgba(150, 198, 238, 0.5);
			font-size: 16px;
		}
	}
</style>