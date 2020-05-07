<template>
<!-- 新增 -->
    <el-dialog :title="title" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh">
                        
                    <el-form :model="form" label-width="150px" :rules="formRule" ref="form"  style="max-height:70vh;overflow-y:scroll">
                        <div v-for="(item,index) in tableTitle" :key="index">
                        <el-form-item :label="item.title" :prop="item.name" v-if="item.type=='name'" >
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item">
                                 <span style="float: left" v-text="item.label"></span>
                                 <span style="float: right; color: #8492a6; font-size: 13px"  v-text="item.dept"></span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='userselect'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择"  @change="userChange">
                                <el-option
                                v-for="item in userOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='roleselect'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择">
                                <el-option
                                v-for="item in roleOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='personselect'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择" @change="personChange(item.name,form[item.name])">
                                <el-option
                                v-for="item in personOptions"
                                :key="item.userId"
                                :label="item.name"
                                :value="item.userId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='equipselects'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择"  @change="equipChange">
                                <el-option
                                v-for="(item,index) in equipOptions"
                                :key="item.name+index"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='cascaderselect'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择">
                                <el-option
                                v-for="item in cascaderselectOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='cascader'" >
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择"  @change="organChange">
                                <el-option
                                v-for="item in organOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                               >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.need==='1'&&item.type==='input'">
                            <el-input v-model="form[item.name]" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='userbutton'">
                            <el-button type="primary" @click="handleChooseUser()">选择</el-button>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='equipbutton'">
                            <el-button v-if="form.submitType!='insert'&&keyId" type="primary" @click="handleRemoveUser()">解绑</el-button>
                            <!-- <el-button v-else-if="form.keyId!='undefined'" type="primary" @click="handleChooseUser()">解绑</el-button> -->
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='radio'&&item.name==='sex'">
                            <el-radio-group v-model="form[item.name]">
                                <el-radio class="radio" :label="1">男</el-radio>
                                <el-radio class="radio" :label="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='radio'&&item.name==='tenureStatus'">
                            <el-radio-group v-model="form[item.name]">
                                <el-radio class="radio" :label="1">在职</el-radio>
                                <el-radio class="radio" :label="0">离职</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='radio'">
                            <el-radio-group v-model="form[item.name]">
                                <el-radio class="radio" :label="1">是</el-radio>
                                <el-radio class="radio" :label="0">否</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.name==='age'">
                            <el-input-number v-model="form.age" :min="0" :max="200"></el-input-number>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='date'">
                            <el-date-picker type="datetime" placeholder="选择日期" v-model="form[item.name]" format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='textarea'">
                            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form[item.name]" >
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='number'">
                            <el-input v-model="form[item.name]" type="number"></el-input>
                        </el-form-item>
                         <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type==='equipselect'">
                            <el-radio-group v-model="equipmentType">
                                <el-radio-button v-model="equipmentType" label="1">活动监测器</el-radio-button>
                                <el-radio-button v-model="equipmentType" label="2">睡眠监测器</el-radio-button>
                                <el-radio-button v-model="equipmentType" label="3">智能手表</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="人员位置" v-else-if="item.type=='mappos'">
                            <div class="equip-map">
                                <i class="equip-map-icon iconicon-test-copy"></i>
                                <my-map ref="map" :centerR="centerR" :Elatitude="Elatitude" :Elongitude="Elongitude"></my-map>
                            </div>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else>
                            <el-input v-model="form[item.name]"></el-input>
                        </el-form-item>
                        
                        </div>
                        <el-form-item label="上传频率" v-if="equipmentType=='3'">
                            <el-input type="number" v-model="form['uploadInterval']"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="设备位置" v-if="equipmentType=='1'">
                            <div class="equip-map">
                                <i class="equip-map-icon iconicon-test-copy"></i>
                                <my-map ref="map" :centerR="centerR" :Elatitude="Elatitude" :Elongitude="Elongitude"></my-map>
                            </div>
                        </el-form-item> -->
                        <el-form-item label="人员位置" v-if="mappos=='1'">
                            <div class="equip-map">
                                <i class="equip-map-icon iconicon-test-copy"></i>
                                <my-map ref="map" :centerR="centerR" :Elatitude="Elatitude" :Elongitude="Elongitude"></my-map>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">取消</el-button>
                        <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import { getOrganData,getRoleData,getKeyPnlData,getUserData,getEquipData } from "@/api/table"
import { getUser, getRole } from '@/utils/auth'
import myMap from "@/components/map/map"
import "@/assets/icon/iconfont.css"
function filterArray(data) {
    data.forEach(function (item) {
    delete item.children;
    });
    var map = {};
    data.forEach(function (item) {
    map[item.id] = item;
    });
    var val = [];
    data.forEach(function (item) {
        var parent = map[item.parentId];
        if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
        } else {
            val.push(item);
        }
    });
    return val;
}
export default {
    props:{
        tableTitle:Array,
        formRule:Object
    },
    components:{
        myMap
    },
    data(){
        return {
            radio1:"1",
            formVisible:false,
            loading: false,
            fileList: [],
            options: [],
            selectOptions:[],
            //新增界面数据
            form: {},
            props:{
                value:"id",
                label:"name",
                children:"children"
            },
            organValue:[],
            organOptions: [],
            roleOptions:[],
            userOptions:[],
            personOptions:[],
            equipOptions:[],
            cascaderselectOptions:[],
            title:"",
            equipmentType:"",
            mappos:"",
            keyId:"",
            centerR:true,
            Elatitude:"",
            Elongitude:""
            
        }
    },
    methods:{
            
        //显示界面
			async handleShow(arr) {
                console.log(this.form)
                this.keyId = this.form.keyId
                if(this.form.submitType=="update"){
                    this.title="修改"
                    this.Elongitude = this.form['longitude']
                    this.Elatitude = this.form['latitude']
                    this.mappos = this.form['mappos']
                    if(this.mappos=="1"){
                        setTimeout(()=>{
                            this.showMap()
                        },0)
                    }
                }  
                else if(this.form.submitType=="insert"){
                     this.title="新增"
                     this.mappos = this.form['mappos']
                    if(this.mappos=="1"){
                        setTimeout(()=>{
                            this.showMap()
                        },0)
                    }
                } 
                for(let i in arr){
                    if(arr[i]=="organ")
                      this.getOrganData()
                    if(arr[i]=="role")
                      this.getRoleData()
                    if(arr[i]=="user")
                      this.getUserData()
                    if(arr[i]=="person")
                      this.getPersonData()
                    if(arr[i]=="equip")
                      this.getEquipData()
                }
                
                this.formVisible = true;
                
                
			},
			addSubmit() {
                this.$refs.form.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.loading = true;
							//NProgress.start();
                            let para = Object.assign({}, this.form);
                            //console.log(para)
                             if(para.mappos==1){
                                para.longitude = this.$refs.map.longitude
                                para.latitude = this.$refs.map.latitude
                             }
                            if(para.submitType=="insert"){
                                this.$emit("insertData",para)
                            }else if(para.submitType=="update"){
                                this.$emit("updateData",para)
                            }else{
                                this.$message.warning("参数不明确");
                                this.loading = false;
                            }
						});
					}
				});
               
            },
            handleClose() {
                this.options=[]
                this.form={};
                this.formVisible=false
                this.loading=false
            },
             getOrganData(){
                let user = JSON.parse(getUser()) 
                console.log(user)
                let organizaId = user.organizationId;
                let userid = user.userId;
                let role = JSON.parse(getRole()) 
                let para ={organizaId:organizaId,roleId:role,userId:userid}
                getOrganData(para).then((res)=>{
                //console.log(res)
                if(res.code==0){
                    let data = res.data.data;
                    if(data.length>0){
                    //console.log(data)
                    this.organOptions=data
                    }else{

                    }
                }
                }).catch(function (error) {
                //console.log(error);
                });
            },
            getPersonData(){
                getUserData({roleId:4}).then(res=>{
                    //console.log(res)
                    if(res.code==0){
                    this.personOptions=res.data.data
                    }

                }).catch(error => {
                    //console.log(error)
                })
            },
            getEquipData(){
                let para ={currentPage:1,pageSize:100}
                getEquipData(para).then(res=>{
                //console.log(res)
                if(res.code==0){
                    this.equipOptions=res.data.data
                    console.log(this.equipselect)
                }

                }).catch(error => {
                    //console.log(error)
                })
            },
            organChange(value){
                //console.log(value)
                // let id = this.$refs['cascader'][0].getCheckedNodes()[0].value
                // let name = this.$refs['cascader'][0].getCheckedNodes()[0].label
                let arr = this.organOptions.filter(item=>{
                    return item.id == value
                })
                this.form.organizationName = arr[0].name
                this.form.parentId = value
            },
            userChange(value){
                //console.log(value)
                // let id = this.$refs['cascader'][0].getCheckedNodes()[0].value
                // let name = this.$refs['cascader'][0].getCheckedNodes()[0].label
                let arr = this.userOptions.filter(item=>{
                    return item.id == value
                })
                this.form.keyUserid = arr[0].name
                //console.log(this.form)
            },
            personChange(name,value){
                console.log(name)
                console.log(value)
                name = name.substring(0, name.length - 2)
                // let id = this.$refs['cascader'][0].getCheckedNodes()[0].value
                // let name = this.$refs['cascader'][0].getCheckedNodes()[0].label
                let arr = this.personOptions.filter(item=>{
                    return item.userId == value
                })
                this.form[name] = arr[0].name
                console.log(this.form)
            },
            equipChange(value){
                let arr = this.equipOptions.filter(item=>{
                    return item.id == value
                })
                this.form.equipmentName = arr[0].name
                console.log(this.form)
            },
            getRoleData(){
                getRoleData().then(res=>{
                    ////console.log(res)
                    if(res.code==0){
                        res.data.data.shift()
                    this.roleOptions=res.data.data
                    //console.log(this.roleOptions)
                    
                    }

                }).catch(error => {
                    ////console.log(error)
                })
            },
            getUserData(){
                let role = JSON.parse(getRole())
                let user = JSON.parse(getUser());
                console.log(user)
                let param ={}
                param.roleId=role
                param.userId=user.userId
                param.organizationId=user.organizationId||""
                getKeyPnlData(param).then(res=>{
                    //console.log(res)
                    if(res.code==0){
                    this.userOptions=res.data.data
                    //console.log(this.tableData)
                    }

                }).catch(error => {
                //console.log(error)
                })
            },
            handleChooseUser(){

            },
            handleRemoveUser(){
                this.$refs.form.validate((valid) => {
					if (valid) {
						this.$confirm('确认解绑用户吗？', '提示', {}).then(() => {
							this.loading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.form);
                            console.log(para)

                            this.$emit("untying",para)
                            
						});
					}
				});
            },
            showMap(){
                this.$nextTick(()=>{
                     console.log(1)
                 this.$refs.map.getmap()
                }
                   
                )
                
            }
              
    },
    watch:{
        equipmentType(val){
               
            this.form["equipmentType"]=val
        }
    }
}
</script>
<style lang="scss" scoped>
.equip-map{
    width:100%;
    height:40vh;
    position: relative;
    &-icon{
        position:absolute;
        top:calc(50% - 40px);
        left:calc(50% - 20px);
        z-index: 2;
        color: #409EFF;
        font-size: 40px;
    }
}
</style>