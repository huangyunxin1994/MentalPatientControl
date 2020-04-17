<template>
    <div id="allmap" ref="allmap" style="width:100%;min-height:100%"> </div>
</template>

<script>
import inhome from "@/icons/png/zaijia.png"
import outhome from "@/icons/png/lijia.png"
import warning from "@/icons/png/yujing.png"
export default {
  name: 'Map',
  props:{
    enterElecArr:Array,
    leaveElecArr:Array
  },
  data(){
    return{
      mainMap:"",
    }
  },
  methods:{
      getMapData(){
      },
      getmap (arr1) {
        this.mainMap = new BMap.Map(this.$refs.allmap, {enableMapClick:false}) // 创建Map实例
        
        this.mainMap.centerAndZoom(new BMap.Point(116.323066,39.989956), 14) // 初始化地图,设置中心点坐标和地图级别
        this.mainMap.addControl(new BMap.MapTypeControl({ // 添加地图类型控件
          mapTypes: [
            window.BMAP_NORMAL_MAP,
            window.BMAP_HYBRID_MAP
          ]
        }))
        this.mainMap.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
        
        this.mainMap.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
        
        if(arr1.length>0){
          for( var i = 0;i < arr1.length; i++){
            var point = new BMap.Point(arr1[i].longitude,arr1[i].latitude);
            var circle = new BMap.Circle(point,arr1[i].radius,{strokeColor:"#F56C6C", strokeWeight:6, strokeOpacity:0.8});
            this.mainMap.addOverlay(circle); 
            
          }
        }
      },
      movePosBypoint(x,y){
        this.mainMap.setZoom(16); 
        this.mainMap.panTo(new BMap.Point(x, y));
      },
  },
  mounted(){
    
    this.getMapData()
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
