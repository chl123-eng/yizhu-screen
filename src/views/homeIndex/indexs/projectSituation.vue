<template>
  <div class="mainBox">
    <vue-seamless-scroll
      :data="listData"
      :class-option="optionSingleHeightTime"
      class="warp"
    >
      <div>
        <div v-for="(item, index) in listData" :key="index" class="projectItem">
          <!-- <vue-seamless-scroll
            :data="item.original_img"
            :class-option="ImgOptionSingleHeightTime"
            class="warp"
          > -->
            <div class="imgList">
              <div
                class="imgItem"
                v-for="(imgItem, index) in item.original_img"
                :key="index"
              >
              <el-image :src="imgItem" class="image"></el-image>
              </div>
            </div>
          <!-- </vue-seamless-scroll> -->
          <div class="content">
            <div class="content-projectName">
              项目名称：{{ item.title }}
            </div>
            <div class="content-projectScale">
              项目规模：{{ item.construction_scope }}
            </div>
            <div class="content-projectAddress">
              项目地址：{{ item.project_location }}
            </div>
          </div>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { getProjectSituation } from "@/http/api/index"
export default {
  name: "Example01Basic",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      listData: [],
      timer1: null,
    };
  },
  computed: {
    optionSingleHeightTime() {
      return {
        step: 1.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 500, // 单步运动停止的时间(默认值1000ms)
      };
    },
    ImgOptionSingleHeightTime() {
      return {
        step: 1.2, // 数值越大速度滚动越快
        limitMoveNum: 3, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 21, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1200, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    async getProjectSituation(){
      this.listData = [];
      const res = await getProjectSituation({});
      if(res.status == 200){
          this.listData = res.data;
        }
    }
  },
  mounted(){
    this.getProjectSituation();
    this.timer1 = setInterval(async () => {
      this.getProjectSituation();
    },120000)
  },
  beforeDestroy(){
    clearInterval(this.timer1);
  }
};
</script>

<style lang="scss" scoped>
.mainBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 300px;
  padding-left: 27px;
  padding-right: 37px;
  box-sizing: border-box;
  .warp {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    .projectItem {
      margin-bottom: 16px;
      .imgList {
        display: flex;
        justify-content: flex-start;
        .imgItem {
          width: 124px;
          height: 85px;
          margin-right: 9px;
          .image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .content {
        margin-top: 20px;
        color: #fff;
        font-size: 18px;
        line-height: 21px;
        &-projectName,
        &-projectScale {
          margin-bottom: 8px;
          line-height: 21px;
        }
      }
    }
  }
}
</style>
