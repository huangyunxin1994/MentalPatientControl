<template>
    <div id="allmap" ref="allmap" style="width:100%;min-height:100%"> </div>
</template>

<script>
import inhome from "@/icons/png/zaijia.png"
import outhome from "@/icons/png/lijia.png"
import warning from "@/icons/png/yujing.png"
import endMarker from "@/icons/png/endMarker.png"
import startMarker from "@/icons/png/startMarker.png"
import person from "@/icons/png/person.png"
import { getPersonStatusQuery,selectPosition } from "@/api/table"
BMap.Icon.prototype.name = "";
BMap.Icon.prototype.setName = function(name){
    this.name = name;
}
export default {
  name: 'Map',
  props:{
    pointsArr:Array,
    bulletArr:Array,
    enterElecArr:Array,
    locusPorint:Array,
    personPoint:Object,
    warnPoint:Object,
    centerR:Boolean,
    Elongitude:String,
    Elatitude:String
  },
  data(){
    return{
      mainMap:"",
      infoWindowArr:[],
      pointTemp:[],
      circleShow:false,
      longitude:"",
      latitude:"",
      scaling:""

    }
  },
  methods:{
      async getmap () {
        await this.selectPosition()
        if(this.centerR){
          if(this.Elongitude&&this.Elatitude&&this.Elongitude!=""&&this.Elatitude!=""){
            this.longitude = this.Elongitude
            this.latitude = this.Elatitude
          }
        }
        console.log(this.bulletArr)
        BMap.Icon.prototype.name = "";
        BMap.Icon.prototype.setName = function(name){
            this.name = name;
        }
        this.mainMap = new BMap.Map(this.$refs.allmap, {enableMapClick:false}) // 创建Map实例


        this.mainMap.centerAndZoom(new BMap.Point(this.longitude,this.latitude), this.scaling) // 初始化地图,设置中心点坐标和地图级别
        this.mainMap.addControl(new BMap.MapTypeControl({ // 添加地图类型控件
          mapTypes: [
            window.BMAP_NORMAL_MAP,
            window.BMAP_HYBRID_MAP
          ]
        }))
        this.mainMap.setCurrentCity('北京') // 设置地图显示的城市 此项是必须设置的

        this.mainMap.enableScrollWheelZoom(true)// 开启鼠标滚轮缩放
        if(this.centerR){
            let that = this
            this.mainMap.addEventListener("moveend",function(){
                    that.longitude = that.mainMap.getCenter().lng
                    that.latitude = that.mainMap.getCenter().lat
            });
            this.mainMap.addEventListener("zoomend",function(){
                    that.longitude = that.mainMap.getCenter().lng
                    that.latitude = that.mainMap.getCenter().lat
            });

        }
        console.log(this.personPoint)
        if(this.personPoint&&Object.keys(this.personPoint).length>0){
            let points=[]
            let temp = new BMap.Point(this.personPoint.longitude,this.personPoint.latitude)
            points.push(temp)
            let that = this
                 let myIcon = new BMap.Icon(person, new BMap.Size(48, 48), {
                  // 指定定位位置
                  anchor: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                for(let i in points){
                  // 创建标注对象并添加到地图
                  let marker = new BMap.Marker(points[i],{icon: myIcon});
                  that.mainMap.addOverlay(marker);
                  that.addClickHandlerP(marker);
                  that.mainMap.centerAndZoom(temp,16)
                }


        }
        console.log("this.warnPoint")
        console.log(this.warnPoint)
        if(this.warnPoint&&Object.keys(this.warnPoint).length>0){
            let points=[]
            let temp = new BMap.Point(this.warnPoint.longitude,this.warnPoint.latitude)
            points.push(temp)
            let that = this
                 let myIcon = new BMap.Icon(person, new BMap.Size(48, 48), {
                  // 指定定位位置
                  anchor: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                for(let i in points){
                  // 创建标注对象并添加到地图
                  let marker = new BMap.Marker(points[i],{icon: myIcon});
                  that.mainMap.addOverlay(marker);
                  that.addClickHandlerP(marker);
                  that.mainMap.centerAndZoom(temp,16)
                }


        }
        if(this.bulletArr&&this.bulletArr.length>0){
          console.log(this.bulletArr)
          // 向地图添加标注
          var inHomeArr = this.bulletArr.filter((item) => {
            return item.personnelStatus === "1"&&item.warning != 2
          })
          var outHomeArr = this.bulletArr.filter((item) => {
            return item.personnelStatus === "2"&&item.warning != 2
          })
          var warningArr = this.bulletArr.filter((item) => {
            return item.warning == 2
          })
          if(inHomeArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < inHomeArr.length; i++){
              let temp = new BMap.Point(inHomeArr[i].keyLongitude,inHomeArr[i].keyLatitude)
              points.push(temp)
            }
                 var myIcon = new BMap.Icon(inhome, new BMap.Size(48, 48), {
                  // 指定定位位置
                  anchor: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                myIcon.setName("0");
                for(var i in points){
                  // 创建标注对象并添加到地图
                  var marker = new BMap.Marker(points[i],{icon: myIcon});
                  var content= "<p class='mymap-item'><span>姓名："+inHomeArr[i].name+"</span><p/><p>状态：<span style='color:#409EFF'>在家</span><p/><p>"+"联系电话："+inHomeArr[i].phone+"</p></input>";
                  that.mainMap.addOverlay(marker);
                  that.addClickHandlerBull(content,marker);

                }
          }
          if(outHomeArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < outHomeArr.length; i++){
              let temp = new BMap.Point(outHomeArr[i].keyLongitude,outHomeArr[i].keyLatitude)
              points.push(temp)
            }

                 var myIcon = new BMap.Icon(outhome, new BMap.Size(48, 48), {
                  // 指定定位位置
                  anchor: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                myIcon.setName("1");
                for(var i in points){
                  // 创建标注对象并添加到地图
                  var marker = new BMap.Marker(points[i],{icon: myIcon});
                  var content= "<p class='mymap-item'><span>姓名："+outHomeArr[i].name+"</span><p/><p>状态：<span style='color:#909399'>离家</span><p/><p>"+"联系电话："+outHomeArr[i].phone+"</p></input>";
                  that.mainMap.addOverlay(marker);
                  that.addClickHandlerBull(content,marker);
                }
          }
          if(warningArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < warningArr.length; i++){
              let temp = new BMap.Point(warningArr[i].keyLongitude,warningArr[i].keyLatitude)
              points.push(temp)
            }
                 var myIcon = new BMap.Icon(warning, new BMap.Size(48, 48), {
                  // 指定定位位置
                  anchor: new BMap.Size(24, 48),
                  // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
                });
                myIcon.setName("2");
                for(var i in points){
                  // 创建标注对象并添加到地图
                  var marker = new BMap.Marker(points[i],{icon: myIcon});
                  var content= "<p class='mymap-item'><span>姓名："+warningArr[i].name+"</span><p/><p>状态：<span style='color:#F56C6C'>预警</span><p/><p>"+"联系电话："+warningArr[i].phone+"</p></input>";
                  that.mainMap.addOverlay(marker);
                  that.addClickHandlerBull(content,marker);
                }

          }
          // var points= []
          // for(let i in this.bulletArr){
          //    let temp = new BMap.Point(this.bulletArr[i].keyLongitude,this.bulletArr[i].keyLatitude)
          //    points.push(temp)
          // }
          // var view = this.mainMap.getViewport(eval(points));
          // var mapZoom = view.zoom;
          // var centerPoint = view.center;
          // this.mainMap.centerAndZoom(centerPoint,mapZoom)
        }
        if(this.pointsArr&&this.pointsArr.length>0){
          // 向地图添加标注
          var inHomeArr = this.pointsArr.filter((item) => {
            return item.personnelStatus === "1"&&item.warning != 2
          })
           var outHomeArr = this.pointsArr.filter((item) => {
            return item.personnelStatus === "2"&&item.warning != 2
          })
          var warningArr = this.pointsArr.filter((item) => {
            return item.warning == 2
          })
          if(inHomeArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < inHomeArr.length; i++){
              let temp = new BMap.Point(inHomeArr[i].keyLongitude,inHomeArr[i].keyLatitude)
              points.push(temp)
            }
            var myIcon = new BMap.Icon(inhome, new BMap.Size(48, 48), {
            // 指定定位位置
            anchor: new BMap.Size(24, 48),
            // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
          });
          myIcon.setName("0");
          for(var i in points){
            // 创建标注对象并添加到地图
            var content= "<p class='mymap-item'><span>姓名："+inHomeArr[i].name+"</span><input class='mymap-button' type='button' value='查看详情' id='btn_name'><p/><p>状态：<span style='color:#409EFF'>在家</span><p/><p>"+"联系电话："+inHomeArr[i].phone+"</p></input>";
            console.log(points[i])
            var marker = new BMap.Marker(points[i],{icon: myIcon});
            that.mainMap.addOverlay(marker);
            that.addClickHandler(content,marker,inHomeArr[i]);

          }
          }
          if(outHomeArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < outHomeArr.length; i++){
              let temp = new BMap.Point(outHomeArr[i].keyLongitude,outHomeArr[i].keyLatitude)
              points.push(temp)
            }
            var myIcon = new BMap.Icon(outhome, new BMap.Size(48, 48), {
              // 指定定位位置
              anchor: new BMap.Size(24, 48),
              // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            myIcon.setName("1");
            for(var i in points){
              // 创建标注对象并添加到地图
              var content= "<p class='mymap-item'><span>姓名："+outHomeArr[i].name+"</span><input class='mymap-button' type='button' value='查看详情' id='btn_name'><p/><p>状态：<span style='color:#909399'>离家</span><p/><p>"+"联系电话："+outHomeArr[i].phone+"</p></input>";
              console.log(points[i])
              var marker = new BMap.Marker(points[i],{icon: myIcon});
              that.mainMap.addOverlay(marker);
              that.addClickHandler(content,marker,outHomeArr[i]);
            }
          }
          if(warningArr.length>0){
            let that = this
            let points = []
            for( var i = 0;i < warningArr.length; i++){
              let temp = new BMap.Point(warningArr[i].keyLongitude,warningArr[i].keyLatitude)
              points.push(temp)
            }
            var myIcon = new BMap.Icon(warning, new BMap.Size(48, 48), {
              // 指定定位位置
              anchor: new BMap.Size(24, 48),
              // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            myIcon.setName("2");
            for(var i in points){
              // 创建标注对象并添加到地图
              var content= "<p class='mymap-item'><span>姓名："+warningArr[i].name+"</span><input class='mymap-button' type='button' value='查看详情' id='btn_name'><p/><p>状态：<span style='color:#F56C6C'>预警</span><p/><p>"+"联系电话："+warningArr[i].phone+"</p></input>";
              console.log(points[i])
              var marker = new BMap.Marker(points[i],{icon: myIcon});
              that.mainMap.addOverlay(marker);
              that.addClickHandler(content,marker,warningArr[i]);
            }

          }
          var points= []
          for(let i in this.pointsArr){
             let temp = new BMap.Point(this.pointsArr[i].keyLongitude,this.pointsArr[i].keyLatitude)
             points.push(temp)
          }
          console.log("#########################################")
          console.log(points)
          var view = this.mainMap.getViewport(eval(points));
          var mapZoom = view.zoom;
          var centerPoint = view.center;
          this.mainMap.centerAndZoom(centerPoint,mapZoom)
          }
          console.log(this.enterElecArr)
          if(this.enterElecArr&&this.enterElecArr.length>0){
            for( var i = 0;i < this.enterElecArr.length; i++){
              var point = new BMap.Point(this.enterElecArr[i].longitude,this.enterElecArr[i].latitude);
              var circle = new BMap.Circle(point,this.enterElecArr[i].radius,{strokeColor:"#F56C6C", strokeWeight:6, strokeOpacity:0.8});
              this.mainMap.addOverlay(circle);
              if(!this.circleShow)
              circle.hide()
            }
          }
        if(this.locusPorint&&this.locusPorint.length>0){
          console.log(this.locusPorint)
          let that = this
          let point = []
          let pointM = []
          for(let i in this.locusPorint){
            let temp = new BMap.Point(this.locusPorint[i].longitude,this.locusPorint[i].latitude)
            point.push(temp)
          }
          pointM.push(new BMap.Point(this.locusPorint[0].longitude,this.locusPorint[0].latitude))
          pointM.push(new BMap.Point(this.locusPorint[this.locusPorint.length-1].longitude,this.locusPorint[this.locusPorint.length-1].latitude))
           console.log(point)
          this.markerChange(pointM)
          this.polylineChange(point)
          var points= []
          for(let i in this.locusPorint){
             let temp = new BMap.Point(this.locusPorint[i].longitude,this.locusPorint[i].latitude)
             points.push(temp)
          }
          var view = this.mainMap.getViewport(eval(points));
          var mapZoom = view.zoom;
          var centerPoint = view.center;
          this.mainMap.centerAndZoom(centerPoint,mapZoom)
        }



      },
      async selectPosition(){
        await selectPosition().then(res=>{
                if(res.code==0){
                    this.longitude = res.data.data[0].longitude
                    this.latitude = res.data.data[0].latitude
                    this.scaling = res.data.data[0].scaling
                }
            }).catch(err=>{

            })
      },
      //绑定标注点击事件显示新窗口并平移
      addClickHandlerP(marker){
            let opts = {
              width : 250,     // 信息窗口宽度
              height: 80,     // 信息窗口高度
              enableMessage:true//设置允许信息窗发送短息
            };
            let that = this
            marker.addEventListener("click",function(e){
              let this_= this
              var p = e.target;
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
              console.log(point)
              var geoc = new BMap.Geocoder();

              geoc.getLocation(point, (rs)=>{
                var addComp = rs.addressComponents;
                let address =  addComp.province + " " + addComp.city + " " + addComp.district + " " + addComp.street + " " + addComp.streetNumber;
                var content= "<p class='mymap-item'><span>当前定位地址："+address+"</span><p/>";
                var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                console.log(infoWindow)
                this_.openInfoWindow(infoWindow,point); //开启信息窗口
                that.movePosition(e)
              });




          });
      },
      //绑定标注点击事件显示新窗口并平移
      addClickHandlerBull(content,marker){
            let opts = {
              width : 250,     // 信息窗口宽度
              height: 160,     // 信息窗口高度
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
              console.log(point)
              this.openInfoWindow(infoWindow,point); //开启信息窗口
              that.movePosition(e)


          });
      },
      //绑定标注点击事件显示新窗口并平移
      addClickHandler(content,marker,obj){

            let opts = {
              width : 250,     // 信息窗口宽度
              height: 160,     // 信息窗口高度
              enableMessage:true//设置允许信息窗发送短息
            };
            let that = this
            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象

            var params={}
            params.infoWindow=infoWindow;
            params.x=marker.getPosition().lng;
            params.y=marker.getPosition().lat;
            that.infoWindowArr.push(params)
            console.log(params)
            marker.addEventListener("click",function(e){

              var p = e.target;
              var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
              console.log(352)
              console.log(obj)
              this.openInfoWindow(infoWindow,point); //开启信息窗口
              that.movePosition(e)
              let pointP = []
              pointP.push(new BMap.Point(obj.keyLongitude, obj.keyLatitude))
              pointP.push(new BMap.Point(obj.longitude, obj.latitude))
              that.polylinePos(pointP)
              that.markerPos(new BMap.Point(obj.longitude, obj.latitude))
              var btn = document.getElementById("btn_name")
              setTimeout(() => {
                  btn.onclick = ()=>{
                    that.getPersonData(obj)
                  }
              },100)


          });
      },
      getPersonData(obj){
          getPersonStatusQuery({keyUserid:obj.id}).then((res)=>{
          if(res.code==0){
            console.log(res)
            console.log(res.data.data)
            var objArr=[];
            for(let i in res.data.data){
              res.data.data[i].personnelStatus.eqlist=res.data.data[i].eqlist
              objArr.push(res.data.data[i].personnelStatus)
            }
            console.log(objArr)
            this.$router.push(
            {
              path: '/persondetails' ,
              query: {
                id: objArr[0].keyUserid
              }
          })
          }

        }).catch((err)=>{

        })
      },
      markerChange1(point){
        let that = this
            var myIcon = new BMap.Icon(startMarker, new BMap.Size(32, 32), {
                    // 指定定位位置
                    offset: new BMap.Size(16, 32),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            var myIcon2 = new BMap.Icon(endMarker, new BMap.Size(48, 32), {
                    // 指定定位位置
                    offset: new BMap.Size(24, 32),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            for( var i = 0;i < point.length; i++){

                // 创建标注对象并添加到地图
                var marker;
                if(i==0){
                  marker = new BMap.Marker(point[i],{icon: myIcon});
                }else{
                  marker = new BMap.Marker(point[i],{icon: myIcon2});
                }
                that.mainMap.addOverlay(marker);
            };

      },
      markerChange(point){
        let that = this
            var myIcon = new BMap.Icon(startMarker, new BMap.Size(32, 32), {
                    // 指定定位位置
                    offset: new BMap.Size(16, 32),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            var myIcon2 = new BMap.Icon(endMarker, new BMap.Size(48, 32), {
                    // 指定定位位置
                    offset: new BMap.Size(24, 32),
                    // 当需要从一幅较大的图片中截取某部分作为标注图标时，需要指定大图的偏移位置
            });
            for( var i = 0;i < point.length; i++){

                // 创建标注对象并添加到地图
                var marker;
                if(i==0){
                  marker = new BMap.Marker(point[i],{icon: myIcon});
                }else{
                  marker = new BMap.Marker(point[i],{icon: myIcon2});
                }
                that.mainMap.addOverlay(marker);
            };

      },
      markerPos(point){

        this.reomveMaker('Marker')
            var myIcon = new BMap.Icon(person, new BMap.Size(48, 48), {
                    // 指定定位位置
                    anchor: new BMap.Size(24, 46),
            });
            myIcon.setName("person");
            // 创建标注对象并添加到地图
            var marker = new BMap.Marker(point,{icon: myIcon});
            this.mainMap.addOverlay(marker);


      },
      polylinePos(point){
        this.reomveMaker('Polyline')
        console.log(point)
        let that = this
        var polyline = new BMap.Polyline(point, {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: true,//是否响应点击事件，默认为true
          strokeWeight:'3',//折线的宽度，以像素为单位
          strokeStyle:"dashed",
          strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
          strokeColor:"#18a45b" //折线颜色
        });   //创建折线
        that.mainMap.addOverlay(polyline);   //增加折线

      },
      polylineChange(point){
        let that = this
        var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
        scale: 0.6,//图标缩放大小
        strokeColor:'#fff',//设置矢量图标的线填充颜色
        strokeWeight: '2',//设置线宽
        });
        console.log(point)
        var icons = new BMap.IconSequence(sy, '10', '30');
        var polyline = new BMap.Polyline(point, {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: true,//是否响应点击事件，默认为true
          icon:[icons],
          strokeWeight:'8',//折线的宽度，以像素为单位
          strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
          strokeColor:"#18a45b" //折线颜色
        });   //创建折线
        that.mainMap.addOverlay(polyline);   //增加折线

      },
      reomveMaker(obj) {
        var allmap = this.mainMap.getOverlays();
        var map_length = allmap.length;
        for (var i = 0; i < map_length; i++) {
          if (allmap[i].toString() == `[object ${obj}]`) {
            if(obj==='Marker'){
              if(allmap[i].getIcon().name=='person')
                this.mainMap.removeOverlay(allmap[i]);
            }else if(obj==='Polyline'){
              this.mainMap.removeOverlay(allmap[i]);
            }

          }
        }
      },
      movePosition(e){
        let that = this
          var p = e.target;
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
          that.mainMap.panTo(point);


      },
      movePosBypoint(x,y){
        let that = this
        let point = new BMap.Point(x,y);
        that.mainMap.panTo(point);


      },
      showMarkerOver(val,flag){
          var allOverlay = this.mainMap.getOverlays();
          for (var i = 0; i < allOverlay.length; i++){
            if(allOverlay[i].toString() == "[object Marker]"){
              console.log(allOverlay[i].getIcon().name)
              if(flag){
                allOverlay[i].show()
              }

              else if(allOverlay[i].getIcon().name == val){
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
