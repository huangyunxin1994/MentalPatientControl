<template>
    <el-dialog title="设置初始经纬度" :visible.sync="formVisible" :before-close="handleClose" :close-on-click-modal="false" top="5vh" width="70vw">
        <div class="dialog-map">
            <i class="dialog-map-icon iconicon-test-copy"></i>
            <div id="allmap" ref="allmap" class="dialog-map">
                
            </div> 
        </div>
    <div slot="footer" class="dialog-footer">
            <el-button @click.native="handleClose">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" :loading="loading">设置</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { parseTime } from '@/utils/index.js'
import { addElectronicFence,deleteElectronicFence,selectElectronicFenceQuery,updateElectronicFence,selectPosition,updateOrganData } from  "@/api/table"
import "@/assets/icon/iconfont.css"
export default {
    name: 'Map',
    data(){
        return{
            formVisible:false,
            loading:false,
            mainMap:"",
            infoWindowArr:[],
            point:"",
            longitude:"",
            latitude:"",
            scaling:"",
            form:{
                longitude: "108.386207",
                latitude: "22.830839",
                scaling:16
            },
            map:"",
            marker:"",
            circle:""
            }
    },
    methods:{
        getMapData(){
        },
        getmap () {
            this.map = new BMap.Map(this.$refs.allmap, {enableMapClick:false}) // 创建Map实例 
           
            this.map.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
            this.map.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
            let zoom = this.form.scaling
             this.map.centerAndZoom(new BMap.Point(this.form.longitude,this.form.latitude), zoom) // 初始化地图,设置中心点坐标和地图级别
            this.longitude = this.map.getCenter().lng
            this.latitude = this.map.getCenter().lat
            let that = this
            this.map.addEventListener("moveend",function(){
                    that.longitude = that.map.getCenter().lng
                    that.latitude = that.map.getCenter().lat
            });
            this.map.addEventListener("zoomend",function(){
                    that.longitude = that.map.getCenter().lng
                    that.latitude = that.map.getCenter().lat
                    that.scaling = that.map.getZoom()
            });
            
        },
        handleShow(){
            this.formVisible=true
            selectPosition().then(res=>{
                if(res.code==0){
                    console.log(res.data.data)
                    this.form = res.data.data[0]
                    this.$nextTick(() => {
                        this.getmap();
                    }) 
                }
            }).catch(err=>{

            })
             
        },
        handleClose(){
            this.form={
                longitude: "",
                latitude: ""
            };
            this.formVisible=false
            this.loading=false
        },
        addSubmit(){
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.loading = true;
                //NProgress.start();
                let para = Object.assign({}, this.form);
                para.longitude = this.longitude
                para.latitude = this.latitude
                para.scaling = this.scaling
                updateOrganData(para).then((res)=>{
                    if(res.code==0){
                        this.$message({
                            message: '设置成功',
                            type: 'success'
                        });
                        this.form={
                            longitude: "",
                            latitude: ""
                        };
                        this.formVisible=false
                        this.loading=false
                    }else{
                        this.$message({
                            message: '设置失败',
                            type: 'error'
                        });
                    }
                }).catch(err=>{
                    this.$message({
                        message: '设置失败',
                        type: 'error'
                    });
                })
            });  
        }
    },
    mounted(){
        
       
    }
}
</script>
<style lang="scss" scoped>
.dialog-map{
    width: 100%;
    height: 60vh;
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