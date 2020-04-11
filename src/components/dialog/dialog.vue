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
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='select'">
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择">
                                <el-option
                                v-for="item in selectOptions"
                                :key="item.name"
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
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.type=='cascader'" >
                            <!-- <el-input v-model="editForm.name" auto-complete="off"></el-input> -->
                            <el-select v-model="form[item.name]" filterable placeholder="请选择">
                                <el-option
                                v-for="item in organOptions"
                                :key="item.name"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="item.title" :prop="item.name" v-else-if="item.need==='1'&&item.type==='input'">
                            <el-input v-model="form[item.name]" auto-complete="off"></el-input>
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
                        <el-form-item :label="item.title" :prop="item.name" v-else>
                            <el-input v-model="form[item.name]"></el-input>
                        </el-form-item>
                        </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="handleClose">取消</el-button>
                        <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
                    </div>
                </el-dialog>
</template>
<script>
import { getOrganData } from "@/api/table"
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
    data(){
        return {
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
            cascaderselectOptions:[],
            title:""
            
        }
    },
    methods:{
            
        //显示界面
			handleShow() {
                if(this.form.submitType=="update")
                    this.title="修改"
                else if(this.form.submitType=="insert")
                    this.title="新增"
                this.getOrganData()
                this.formVisible = true;	
			},
			addSubmit() {
                this.$refs.form.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.loading = true;
							//NProgress.start();
                            let para = Object.assign({}, this.form);
                            console.log(para)
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
                let params={}
                params.organizaId=1;
                params.best=1
                getOrganData(params).then((res)=>{
                console.log(res)
                if(res.code==0){
                    let data = res.data.data;
                    if(data.length>0){
                    console.log(data)
                    this.organOptions=data
                    }else{

                    }
                }
                }).catch(function (error) {
                console.log(error);
                });
            },
            organChange(value){
                // let id = this.$refs['cascader'][0].getCheckedNodes()[0].value
                // let name = this.$refs['cascader'][0].getCheckedNodes()[0].label
                this.form.parentId = value[value.length-1]
            }
              
    }
}
</script>