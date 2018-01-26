<template>
  <div class="box">
    <div class="content_box">
      <div class="tab">
        <span class="title"> 黑猫察使用数据统计</span>
        <Select style="width:200px;margin-top: -3px;display: none;" size="large" v-model="search.time" @on-change="select1">
          <Option v-for="item in select" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div class="balance">账户余额￥{{logininfo.balance|NumInt}}</div>

      </div>
      <div class="box_card">
        <MyCard :num="t.num0" string="查询企业次数" class="card_detail card0" key="0"></MyCard>
        <MyCard :num="t.num1" string="匹配企业次数" class="card_detail card1" key="1"></MyCard>
        <MyCard :num="t.num2" string="查询个人次数" class="card_detail card2" key="2"></MyCard>
        <MyCard :num="t.num3" string="匹配个人次数" class="card_detail card3" key="3"></MyCard>
        <MyCard :num="t.num4" string="总匹配次数" class="card_detail card4" key="4"></MyCard>
      </div>
      <div id="echarts" style="display: none;"></div>

    </div>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'infolist',
    mounted: function () {
      this.$store.dispatch('SelectTime');
    },
    data: function () {
      return {
        select: [
          {
            value: '1',
            label: '近一个月'

          },
          {
            value: '6',
            label: '近半年'

          },
          {
            value: '12',
            label: '近一年'

          },
        ],
      }
    },
    computed: mapGetters(
      [
        'search',
        'option',
        't',
        'logininfo'
      ]
    ),
    methods: {
      select1(){
        this.$store.dispatch('SelectTime');

      }

    },
  }

</script>
<style scoped lang="less" rel="stylesheet/less">
  .box {
    width: 70%;
    min-width: 700px;
    max-width: 1100px;
    margin: 0 auto;
    background-color: #f2f2f2;
    .title {
      text-align: left;
      font-size: 16px;
      height: 56px;
      line-height: 56px;
      color:#353842;
    }
    .content_box {
      width: 100%;
      min-height: 500px;
      background-color: #fff;
      padding-bottom: 40px;
      .box_card {
        display: flex;
        justify-content: space-between;
        padding: 20px ;
        .card0 {
          background-image: url("../../assets/image/card0.png");
        }
        .card1 {
          background-image: url("../../assets/image/card1.png");
        }
        .card2 {
          background-image: url("../../assets/image/card2.png");
        }
        .card3 {
          background-image: url("../../assets/image/card3.png");
        }
        .card4 {
          background-image: url("../../assets/image/card4.png");
        }
        .card_detail {
          flex: 1;
          margin:0 0.6%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
      #echarts {
        width: 100%;
        height: 500px;
        margin: 20px 0;
        margin-left:-20px;
      }
    }
  }

  .tab {
    text-align: left;
    padding-left: 2%;
    padding-top: 10px;
    .title {
      font-size: 16px;
      font-weight: 500;
      padding-right: 20px
    }
  }
  .ivu-select-item-selected, .ivu-select-item-selected:hover{
    background: rgba(165, 205, 255, 0.9);
  }
.balance{
  display: none;
  float: right;
  margin-right: 28px;
  margin-top: 20px;
  height: 34px;
  line-height: 34px;
  background:#5f96ff;
  border-radius:4px;
  text-align: center;
  color: #fff;
  padding: 0 10px;
}

</style>
