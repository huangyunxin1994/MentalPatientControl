<template>
    <el-container class="plansetting-container">
        <el-header>
      <breadcrumb></breadcrumb>
      </el-header>
      
          <div style="width:20%;padding:20px">
                  <el-input ></el-input>
            </div>
            <div  style="width:20%;padding:20px">
                  <el-button type="primary">添加预案</el-button>
            </div>
            <el-main>
          <el-scrollbar style="height:100%">
              
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true">
              <div>
                <el-form-item label="预案名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                </div>
                <div>
                <el-form-item label="预警类型" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间段" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="超过/低于平均值n%触发预警" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域" >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="达到某个值触发预警" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                </div>
                <div>
                <el-form-item label="预警类型" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间段" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="超过/低于平均值n%触发预警" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="达到某个值触发预警" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                </div>
            </el-form>
            
          </el-scrollbar>
      </el-main>
      

    </el-container>
</template>
<script>
import breadcrumb from "@/components/Breadcrumb/index"
  export default {
    name: 'Plansetting',
    components:{
        breadcrumb
    },
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style lang="scss" scoped>
.plansetting {
  &-container {
    width: 100%;
    height: 100%;
  }
}
</style>
