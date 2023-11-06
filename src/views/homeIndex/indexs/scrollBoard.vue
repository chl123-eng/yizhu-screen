<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config"/>
  </div>
</template>

<script>
import { getDealData } from "@/http/api/index"
export default {
  name: "ScrollBoard",
  data() {
    return {
      config: {
        header: ["商品名称", "采购人", "下单金额", "时间"],
        data: [
        ],
        columnWidth: [200, 100, 80,120],
        align: ['center','center','center','center'],
        rowNum: 7,
        headerBGC: "#1E408A",
        headerHeight: 38,
        oddRowBGC: "",
        evenRowBGC: "",
      },
      timer1: null,
    };
  },
  mounted(){
    this.getDealData();
    this.timer1 = setInterval(async () => {
      this.getDealData();
    },120000)
  },
  beforeDestroy(){
    clearInterval(this.timer1);
  },
  methods: {
    async getDealData(){
      this.config.data = [];
      const res = await getDealData();
      if(res.status == 200){
        let temp = res.data.engineer_data;
        this.$emit("transStatusData", res.data.msg_list)
        temp.forEach(item => {
          let configItem = [];
          Object.keys(item).forEach((key) => {
            configItem.push(item[key]);
          })
          this.config.data.push(configItem);
        })
        this.config={...this.config}
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#scroll-board {
  width: 86%;
  box-sizing: border-box;
  height: 80%;
  overflow: hidden;
}
</style>
