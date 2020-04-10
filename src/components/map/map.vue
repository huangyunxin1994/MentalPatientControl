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
    pointsArr:Array,
    electricFenceArr:Array
  },
  data(){
    return{
      mainMap:"",
      infoWindowArr:[]
    }
  },
  methods:{
      getMapData(){
      },
      getmap () {
        BMap.Icon.prototype.name = "";
        BMap.Icon.prototype.setName = function(name){
            this.name = name;
        }
        this.mainMap = new BMap.Map(this.$refs.allmap, {enableMapClick:false}) // 创建Map实例
        
        this.mainMap.centerAndZoom(new BMap.Point(116.323066,39.989956), 16) // 初始化地图,设置中心点坐标和地图级别
        this.mainMap.addControl(new BMap.MapTypeControl({ // 添加地图类型控件
          mapTypes: [
            window.BMAP_NORMAL_MAP,
            window.BMAP_HYBRID_MAP
          ]
        }))
        this.mainMap.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的
        
        this.mainMap.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
        if(this.pointsArr){
          // 向地图添加标注
          var inHomeArr = this.pointsArr.filter((item) => {
            return item.state === 0
          })
           var outHomeArr = this.pointsArr.filter((item) => {
            return item.state === 1
          })
          var warningArr = this.pointsArr.filter((item) => {
            return item.state === 2
          })
          if(inHomeArr.length>0){
            for( var i = 0;i < inHomeArr.length; i++){
              var myIcon = new BMap.Icon(inhome, new BMap.Size(48, 48), {
                  // 指定定位位置
                  offset: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
              });
              myIcon.setName("0");
              var content= "<p>姓名："+inHomeArr[i].name+"<p/><p style='color:blue'>状态：在家<p/><p>"+"联系电话："+inHomeArr[i].phone+"</p>";
              var point = new BMap.Point(inHomeArr[i].pointX,inHomeArr[i].pointY);
              // 创建标注对象并添加到地图 
              var marker = new BMap.Marker(point,{icon: myIcon});
              this.mainMap.addOverlay(marker);
              this.addClickHandler(content,marker);
            };
          }
          if(outHomeArr.length>0){
            for( var i = 0;i < outHomeArr.length; i++){
                var myIcon = new BMap.Icon(outhome, new BMap.Size(48, 48), {
                    // 指定定位位置
                    offset: new BMap.Size(24, 48),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                myIcon.setName("1");
                var content= "<p>姓名："+outHomeArr[i].name+"<p/><p style='color:blue'>状态：离家<p/><p>"+"联系电话："+outHomeArr[i].phone+"</p>";
                var point = new BMap.Point(outHomeArr[i].pointX,outHomeArr[i].pointY);
                // 创建标注对象并添加到地图 
                var marker = new BMap.Marker(point,{icon: myIcon});
                this.mainMap.addOverlay(marker);
                this.addClickHandler(content,marker);
            };
          }
          if(warningArr.length>0){
            for( var i = 0;i < warningArr.length; i++){
                var myIcon = new BMap.Icon(warning, new BMap.Size(48, 48), {
                    // 指定定位位置
                    offset: new BMap.Size(24, 48),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                myIcon.setName("2");
                var content= "<p>姓名："+warningArr[i].name+"<p/><p style='color:blue'>状态：预警<p/><p>"+"联系电话："+warningArr[i].phone+"</p>";
                var point = new BMap.Point(warningArr[i].pointX,warningArr[i].pointY);
                // 创建标注对象并添加到地图 
                var marker = new BMap.Marker(point,{icon: myIcon});
                this.mainMap.addOverlay(marker);
                this.addClickHandler(content,marker);
            };
          }
          for( var i = 0;i < this.electricFenceArr.length; i++){
            var point = new BMap.Point(this.electricFenceArr[i].pointX,this.electricFenceArr[i].pointY);
            var circle = new BMap.Circle(point,200);
            this.mainMap.addOverlay(circle);   
            circle.hide()
            }
        }
        
        
      },
      //绑定标注点击事件显示新窗口并平移
      addClickHandler(content,marker){
            let opts = {
              width : 250,     // 信息窗口宽度
              height: 100,     // 信息窗口高度
              enableMessage:true//设置允许信息窗发送短息
            };
            let that = this
            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
            
            var params={}
            params.infoWindow=infoWindow;
            params.x=marker.getPosition().lng;
            params.y=marker.getPosition().lat;
            that.infoWindowArr.push(params)
            marker.addEventListener("click",function(e){
            var p = e.target;
            var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
            this.openInfoWindow(infoWindow,point); //开启信息窗口
            that.movePosition(e)
          });
      },
      movePosition(e){
          var p = e.target;
          this.mainMap.setZoom(16); 
          this.mainMap.panTo(new BMap.Point(p.getPosition().lng, p.getPosition().lat));
      },
      movePosBypoint(x,y){
        this.mainMap.setZoom(16); 
        this.mainMap.panTo(new BMap.Point(x, y));
        this.infoWindowArr.filter((item)=>{
            if(item.x===x&&item.y===y){
              var point = new BMap.Point(item.x, item.y);
              this.mainMap.openInfoWindow(item.infoWindow,point); //开启信息窗口
            }
        })
      },
      showMarkerOver(val){
          var allOverlay = this.mainMap.getOverlays();
          for (var i = 0; i < allOverlay.length; i++){
            if(allOverlay[i].toString() == "[object Marker]"){
              if(allOverlay[i].getIcon().name == val){
                allOverlay[i].show()
                
              }else{
                allOverlay[i].hide()
              }
            }
          } 
        },
      showCircleOver(val){
         var allOverlay = this.mainMap.getOverlays();
          for (var i = 0; i < allOverlay.length; i++){
            if(allOverlay[i].toString() == "[object Circle]"){
              if(val){
                allOverlay[i].show()
              }else{
                allOverlay[i].hide()
              }
            }
          }
      }
  },
  mounted(){
    this.getmap();
    this.getMapData()
  },
  watch:{
    pointsArr:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
            this.getmap()
         },
         deep:true //true 深度监听
     }
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
