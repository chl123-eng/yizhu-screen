<template>
  <div id="container" ref="chart" style="width: 100%; height: 100%"></div>
</template>

<script>
import Charts from "@jiaminghi/charts";
import { getSuppliersAdd } from "@/http/api/index"
export default {
  name: "lineChart",
  data() {
    return {
      timer1: null,
      options: {
        xAxis: {
          data: [],
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 10,
            },
          },
        },
        yAxis: {
          data: "value",
          minInterval: 1,
          splitNumber: 6,
          min: 0,
          axisLabel: {
            style: {
              fill: "#fff",
              fontSize: 10,
            },
          },
          axisLine: {
            style: {
              stroke: "#33487E",
              lineWidth: 1,
            },
          },
          splitLine: {
            style: {
              stroke: "#33487E",
              lineWidth: 1,
            },
          },
        },

        series: [
          {
            data: [],
            type: "bar",
            gradient: {
              color: ["#37a2da", "#67e0e3"],
            },
            label: { //柱体上显示数值
              show: true,//开启显示
              position: 'top',//在上方显示
              style: { // 数值样式
                color: "#fff",
                fontSize: 12
              },
              formatter: '{value}',
            }
          },
        ],
      
      }
    };
  },
  async mounted() {
    await this.getSuppliersAdd();
    this.setMap();
    this.timer1 = setInterval(async () => {
      this.getSuppliersAdd();
    },120000)
  },
  methods: {
    setMap() {
      const container = document.getElementById("container");
      const myChart = new Charts(container);
      myChart.setOption(this.options);
    },

    async getSuppliersAdd(){
      const res = await getSuppliersAdd();
      if(res.status == 200){
        let resTemp = res.data;
        let xAxisData = [];
        let value = [];

        for(let item of resTemp){
          xAxisData.push(item.month + '月');
          value.push(item.supplier_count);
        };

        this.options.xAxis.data = xAxisData;
        this.options.series[0].data = value;
      }
    }
  },
  beforeDestroy(){
    clearInterval(this.timer1);
  }
};
</script>
