<template>
    <!-- <div> -->
        <div id="china_map_box" :class="isFullScreen ? 'isFullMap' : ''">
            <div id="china_map" :key="key"></div>
            <!-- <dv-flyline-chart :config="config" style="width:100%;height:100%;position: absolute;"></dv-flyline-chart> -->
        </div>
     
    <!-- </div> -->
</template>
  
<script>
import * as echarts from 'echarts';
import "@/utils/chinaMap.js";
export default {
    props: {
        isFullScreen:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
                config: {
                centerPoint: [0.625, 0.775],
                points: [
                    {
                        position: [0.52, 0.4],
                    },
                    {
                        position: [0.33, 0.29],
                    },
                    {
                        position: [0.45, 0.54],
                    },
                    {
                        position: [0.62, 0.55],
                    },
                    {
                        position: [0.37, 0.66],
                    },
                    {
                        position: [0.55, 0.81],
                    },
                    {
                        position: [0.75, 0.28],
                    },
                    {
                        position: [0.68, 0.37],
                    },
                    {
                        position: [0.60, 0.40],
                    }
                ],
            },
            //echart 配制option  
            options: {
                visualMap: { 
                    type: 'continuous', 
                    show: false
                }, 
                geo: {
                    show: true,
                    map: 'china',
                    label: {
                        show: false
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#003ED6',
                            borderWidth: 4, //设置外层边框
                            borderColor:'#00FFFF',
                            shadowColor: 'rgba(1, 39, 44, 1)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 12
                        },
                    },
                },
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            areaColor: '#003ED6',
                            borderColor: '#49BAFF',
                            borderWidth: 1
                        },
                        data: [{ 
                            name: '广东',
                            itemStyle: {
                                areaColor: '#FFE500',
                            },
                        },
                        { 
                            name: '海南',
                            itemStyle: {
                                areaColor: '#FFE500',
                            },
                        },
                        { 
                            name: '湖南',
                            itemStyle: {
                                areaColor: '#FFE500',
                            },
                        }]
                    },
                    {
                        type: 'custom',
                        coordinateSystem: 'geo',
                        clickable:true,
                        data:[],
                    }
                ]
            },
            key: 1,
        };
    },
    methods: {
        //初始化中国地图
        initEchartMap() {
            let mapDiv = document.getElementById('china_map');
            let myChart = echarts.init(mapDiv);
            this.setEchartOption();
            myChart.setOption(this.options);
            
        },
        //修改echart配制
        setEchartOption(){
                //红色标注点的坐标
            let markList = [
                { name: '广东', value: [113.280,24.125178] },
                { name: '海南', value: [109.83119,19.531971] },
                { name: '湖南', value: [111.782279,28.09409] },
            ]
            this.options.series[1].data = markList
                if(markList.length>0){
                    this.options.series[1].renderItem = function(params,api){
                    return {
                        type: 'image',
                        name: 'aaa',
                        style: {
                        image: require("@/assets/img/provinceIcon.png"), //标注点图标
                        width: 14,
                        height: 18,
                        x: api.coord([markList[params.dataIndex].value[0], markList[params.dataIndex].value[1]])[0],
                        y: api.coord([markList[params.dataIndex].value[0], markList[params.dataIndex].value[1]])[1]
                        }
                    }
                }
            }
        }
    },
    watch:{
        isFullScreen(){
            this.key = this.key++;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initEchartMap();
        })

    }
};
</script>
  
<style scoped>
#china_map_box {
    padding-top: 200px;
    width: 100%;
    height: 900px;
    position: relative;
    
}

.isFullMap{
    padding-top: 100px;
    height: 1000px !important;
}

#china_map_box #china_map {
    position: absolute;
    width: 100%;
    height: 900px;
    /* z-index: 0; */
}

</style>