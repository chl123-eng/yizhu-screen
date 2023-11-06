<template>
  <div>
    <!-- <dv-full-screen-container class="outContainer"> -->
      <div class="container bg">
        <div class="dateTime">{{ dateTime }}</div>
        <ChinaMap />
        <div class="content">
          <div class="top">
            <div class="dataBox bg">
              <div class="circleArray bg" v-for="item in projectSituation" :key="item.id">
                <div class="value">{{ item.value }}</div>
                
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
            <div class="top-center">
              <div class="totalAmountBox bg">
                <div class="totalAmountBox-items">
                  <div class="totalAmountBox-items-item"
                    v-for="(item, itemIndex) in dealMoneyCount"
                    :key="itemIndex"
                  >
                    <div
                    class="totalAmountBox-items-item-i"
                      v-for="(i, index) in item"
                      :key="index"
                    >
                      <div class="unit">
                        <div v-show="itemIndex == dealMoneyCount.length - 2 && index == item.length - 1">千</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 2 && index == item.length - 2">万</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 2 && index == item.length - 3">十万</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 3 && index == item.length - 1">百万</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 3 && index == item.length - 2">千万</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 3 && index == item.length - 3">亿</div>
                        <div v-show="itemIndex == dealMoneyCount.length - 4 && index == item.length - 1">十亿</div>
                      </div>
                      <div class="totalAmountBox-items-item-i-inner"></div>
                      <div class="totalAmountBox-items-item-i-inner"></div>
                      <div class="totalAmountBox-items-item-i-value">
                        {{ i }}
                      </div>
                      
                    </div>
                    <div class="symbol" v-if="itemIndex != 0">,</div>
                  </div>
                </div>
              </div>
              <div class="info">累计成交金额(元)</div>
            </div>

            <div class="supplierChart bg">
              <div class="supplierChart-top">
                <div class="svg">
                  <svg-icon name="screen-arrow" width="20" height="20"></svg-icon>
                </div>

                <div class="title">供应商申请入驻量</div>
              </div>

              <div class="chartBox">
                <div class="chartBoxTip">
                  <div class="chartBoxTop">申请入驻量</div>
                  <div class="chartBoxBottom">单位/个</div>
                </div>
                <div class="chart">
                  <supplierChart />
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="projectSituation bg">
              <div class="projectSituation-top">
                <div class="projectSituation-top-left">
                  <span class="svg">
                    <svg-icon
                      name="screen-arrow"
                      width="20"
                      height="20"
                    ></svg-icon>
                  </span>

                  <span class="title">项目情况</span>
                </div>
                <div class="projectSituation-top-right">
                  <span class="tip">{{ today }}</span>
                </div>
              </div>
              <div class="projectSituation-bottom">
                <projectSituation></projectSituation>
              </div>
            </div>
            <div class="latestTransStatus bg">
              <div class="latestTransStatus-top">
                <div class="latestTransStatus-top-left">
                  <span class="svg">
                    <svg-icon
                      name="screen-arrow"
                      width="20"
                      height="20"
                    ></svg-icon>
                  </span>

                  <span class="title">最新交易情况</span>
                </div>
                <div class="latestTransStatus-top-right">
                  <vue-seamless-scroll
                    :data="transStatusData"
                    :class-option="optionSingleHeightTime"
                    class="warp"
                  >
                    <div>
                      <div v-for="(item, index) in transStatusData" :key="index" class="transItem">
                        <span class="svg">
                          <svg-icon
                            name="screen-person"
                            width="20"
                            height="20"
                          ></svg-icon>
                        </span>
                        <span class="tip"
                          >{{ item }}</span
                        >
                      </div>
                    </div>
                  </vue-seamless-scroll>
                </div>
              </div>
              <scrollBoard @transStatusData="getTransStatusData" ></scrollBoard>
            </div>
          </div>
        </div>
      </div>
    <!-- </dv-full-screen-container> -->
  </div>
  
</template>
<script>
import dayjs from "dayjs";
import supplierChart from "./indexs/supplierChart.vue";
import scrollBoard from "./indexs/scrollBoard.vue";
import projectSituation from "./indexs/projectSituation.vue";
import { getScreenAddData } from "@/http/api/index";
import vueSeamlessScroll from "vue-seamless-scroll";
import ChinaMap from "./indexs/ChinaMap.vue";
import { dealMoneyCountfun, filtersNum } from "./utils";
import VConsole from 'vconsole';

export default {
  components: {
    supplierChart,
    scrollBoard,
    projectSituation,
    vueSeamlessScroll,
    ChinaMap
  },
  data() {
    return {
      dateTime: null,
      timer1: null,
      timer2: null,
      allData: [
      ], //左上盒子数据
      dealMoneyCount: [],//累计金额
      projectSituation: [], //左上角各类数据
      today: dayjs(new Date()).format("YYYY[年]MM[月]DD[日]"),
      engineerData: [],
      transStatusData: [],
      key: 1
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
          singleHeight: 26, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1200, // 单步运动停止的时间(默认值1000ms)
        };
      },
  },
  methods: {
    //获取当前时间
    showNowTime() {
      this.timer1 = setInterval(() => {
        this.dateTime = dayjs(new Date()).format(
          "YYYY[年]MM[月]DD[日] HH:mm"
        );
      }, 1000);
    },
    pageShow(){
      var _this = this
      window.addEventListener('pageshow', function (e) {
        _this.$nextTick(() => {
          _this.key++
        })
      })
    },
    //左上角各类数据添加字段中文名
    transChinaprojects(key){
      switch(key){
        case "project_amount": 
          return "项目总金额";
        case "project_num": 
          return "管理工程项目";
        case "bidding_num": 
          return "发布招投标";
        case "visitor_num": 
          return "访客数uv";
        case "goods_sku_num": 
          return "SKU总数";
        case "user_num": 
          return "注册会员数";
        case "order_num": 
          return "成交订单数";
        case "suppliers_num": 
          return "入驻供应商数";
        default:
          break;

      }
    },
    
    //获取顶部数据
    async getScreenAddData(){
      this.dealMoneyCount = [];
      this.projectSituation = [];
      const res = await getScreenAddData({});
        if(res.status == 200){
          let dealMoneyCountTemp = parseInt(res.data.deal_money_count).toString();
          this.dealMoneyCount = dealMoneyCountfun(dealMoneyCountTemp);

          let projectSituationTemp = res.data.project_situation;
          for(let key of Object.keys(projectSituationTemp)){
            this.projectSituation.push({key: key, value: projectSituationTemp[key], name: this.transChinaprojects(key)});
          }
          this.projectSituation.forEach(item => {
            if(item.key == "user_num" || item.key == "visitor_num"){
              item.value = item.value == null ? "" : filtersNum(parseFloat(item.value));
              if(item.key == "user_num"){
                item.value = item.value + "人"
              }
              if(item.key == "visitor_num"){
                item.value = item.value + "人次"
              }
            }
          })
        }
    },
    getTransStatusData(value){
      this.transStatusData = value;
    }
  },
  created() {
    const vConsole = new VConsole();
    this.showNowTime();
  },

  mounted() {
    this.showNowTime();
    this.getScreenAddData();
    this.timer2 = setInterval(async () => {
      this.getScreenAddData();
    },120000)
  },
  beforeDestroy(){
    clearInterval(this.timer1);
    clearInterval(this.timer2);
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss" 
</style>
