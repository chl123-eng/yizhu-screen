<template>
    <!-- <div> -->
        <div id="china_map_box">
            <div id="china_map"></div>
            <dv-flyline-chart :config="config" style="width:100%;height:100%;position: absolute;"></dv-flyline-chart>
        </div>
     
    <!-- </div> -->
</template>
  
<script>
import * as echarts from 'echarts';
import "@/utils/chinaMap.js";
export default {
    data() {
        return {
                config: {
                centerPoint: [0.60, 0.78],
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
                                areaColor: '#FFC637',
                            }
                        }]
                    }
                ]
            },
        };
    },
    methods: {
        //初始化中国地图
        initEchartMap() {
            let mapDiv = document.getElementById('china_map');
            let myChart = echarts.init(mapDiv);
            myChart.setOption(this.options);
        },
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
    width: 90%;
    height: 90%;
    position: relative;
    
}

#china_map_box #china_map {
    position: absolute;
    width: 100%;
    height: 100%;
    /* z-index: 0; */
}

#china_map_box .china_map_logo {
    position: absolute;
    top: 0;
    left: 0;
    width: 45px;
}
</style>