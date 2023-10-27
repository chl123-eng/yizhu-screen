<template>
  <div class="container bg">
    <div class="dateTime">{{ dateTime }}</div>
    <div class="content">
      <div class="top">
        <div class="dataBox bg">
          <div class="circleArray bg" v-for="item in allData" :key="item.id">
            <div class="value">{{ item.value }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
        <div class="totalAmountBox bg"></div>
        <div class="supplierChart bg">
          <div class="title">
            供应商申请入驻量
          </div>
          <div class="chartBox">
            <div class="tip">
              <div class="top">申请入驻量</div>
              <div class="bottom">单位/个</div>
            </div>
            <div class="chart"></div>
          </div>
        </div>
      </div>
    <div class="bottom">
      <div class="projectSituation bg">

      </div>
      <div class="latestTransStatus bg"></div>
    </div>
    </div>
   
  </div>
</template>
<script>
import dayjs from "dayjs"
export default {
  data() {
    return {
      dateTime: null,
      allData: [
        {
          id: 1,
          name: "项目总金额",
          value: "26亿元"
        },
        {
          id: 2,
          name: "管理工程项目",
          value: "132个"
        },
        {
          id: 3,
          name: "项目总金额",
          value: "26亿元"
        },
        {
          id: 4,
          name: "管理工程项目",
          value: "132个"
        },
        {
          id: 5,
          name: "项目总金额",
          value: "26亿元"
        },
        {
          id: 6,
          name: "管理工程项目",
          value: "132个"
        },
        {
          id: 7,
          name: "项目总金额",
          value: "26亿元"
        },
        { id: 8,
          name: "管理工程项目",
          value: "132个"
        }
      ],//左上盒子数据
    } 
  },
  methods: {
    showNowTime() {
      this.timer = setInterval(() => {
        this.dateTime = dayjs(new Date()).format("YYYY[年]-MM[月]-DD[日] HH:mm")
    }, 1000);
  
    },
  },
  created() {
    this.showNowTime();
  },

  mounted() {
    this.showNowTime()
  },
}
</script>
<style lang="scss" scoped>
.bg{
  background-position: top center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.container{
  position: relative;
  min-width: 1920px;
  height: 1080px;
  background-image: url("@/assets/img/screen-bg.png");
 
  .dateTime{
    position: absolute;
    left: 50%;
    top: 111px;
    transform: translate(-50%, -50%);
    font-size: 25px;
    font-weight: 600;
    color: #FFF;
    line-height: 29px;
  }
  .content{
    width: 100%;
    box-sizing: border-box;
    padding: 150px 67px 43px;
    position: absolute;
    box-sizing: border-box;
    .top{
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      .dataBox{
        width: 452px;
        height: 335px;
        background-image: url("@/assets/img/screentop-bg.png");
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 58px 12px;
        box-sizing: border-box;
        .circleArray{
          width: 104px;
          height: 100px;
          background-image: url("@/assets/img/screenData-bg.png");
          text-align: center;
          padding-top: 35px;
          padding-bottom: 35px;
          box-sizing: border-box;
          .value{
            font-size: 18px;
            color: #00FFFF;
            line-height: 21px;
            text-shadow: 0px 0px 4px #00FFFF;
            margin-bottom: 4px;
          }
          .name{
            font-size: 10px;
            font-weight: bold;
            color: #A8D4E4;
            line-height: 12px;
          }
        }
      }
      .totalAmountBox{
        width: 811px;
        height: 164px;
        background-image: url("@/assets/img/screenCenter-bg.png");
        margin-top: 26px;
      }
      .supplierChart::before{
        content: "";
        position: absolute;
        left: 0;
        width: 452px;
        height: 335px;
        background: url('@/assets/img/screentop-bg.png');
        transform: rotateY(180deg); 
        z-index: -1;
        background-position: top center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
      .supplierChart{
        width: 452px;
        height: 335px;
        position: relative;
        z-index: 1;
        .title{
          font-size: 20px;
          color: #FFFFFF;
          margin-left: 20px;
          margin-top: 30px;
        }
        .chartBox{
          position: relative;
          .tip{
            position: absolute;
            right: 15px;
            .top, .bottom{
              font-size: 12px;
              color: #FFFFFF;
              line-height: 14px;
            }
            .top{
              margin-bottom: 5px;
            }
            .bottom{
              display: flex;
              justify-content: flex-end;
            }
            .top::before{
              content: "";
              position: absolute;
              left: -20px;
              width: 15px;
              height: 15px;
              background: #00FFFF;
            }
          }
        }
      }
    }
    .bottom{
      width: 100%;
      display: flex;
      justify-content: space-between;
      .projectSituation{
        width: 584px;
        height: 528px;
        background-image: url("@/assets/img/screenBotom-bg.png");
      }
      .latestTransStatus{
        width: 584px;
        height: 528px;
        background-image: url("@/assets/img/screenBotom-bg.png");
        transform: rotateY(180deg);
      }
    }
  }
  
}

</style>
