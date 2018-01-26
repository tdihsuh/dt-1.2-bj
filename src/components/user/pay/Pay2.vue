<template>
  <div class="box">
    <div class="wallet_box">
      <div class="wallet_title">
        <div class="pay_title">账户充值</div>
        <div class="pay_steps">
          <Steps :current="1">
            <Step title="填写充值金额" icon="clipboard"></Step>
            <Step title="在线支付" icon="card"></Step>
            <Step title="充值完成" icon="ios-checkmark-outline"></Step>
          </Steps>
        </div>
      </div>
      <div class="pay_info">
        <div class="pay_info_item">
          <div class="pay_key">
            充值金额：
          </div>
          <div class="pay_value pay_amount">
            <span style="font-size: 14px">￥</span>{{pay.amount}}
          </div>
        </div>
        <div class="pay_info_item">
          <div class="pay_key">
            充值账户：
          </div>
          <div class="pay_value">
            {{logininfo.entname}}
          </div>
        </div>
        <div class="pay_info_item">
          <div class="pay_key">
            支付方式：
          </div>
          <div class="pay_value pay_choose">
            <div :class="choose_wepay?`choose_item`:`choose_item  choose` " @click="alipay">
              <img src="../../../assets/image/alipay.png" alt="">
            </div>
            <div :class="!choose_wepay?`choose_item`:`choose_item  choose`" @click="wepay">
              <img src="../../../assets/image/wepay.png" alt="">
            </div>
            <div class="qr" v-show="choose_wepay">
                <div class="qr_text">
                  打开手机端微信
                  扫一扫继续付款
                </div>
              <div class="qr_img" id="qrcode">

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'pay2',
    mounted: function () {
//      this.$store.dispatch('toPay',4);
      new QRCode(document.getElementById("qrcode"),
        {
          text: "maosen666",
          width: 120,
          height: 120,
          colorDark : "#000000",
          colorLight : "#ffffff",
          correctLevel : QRCode.CorrectLevel.H
        }
        );
    },
    data: function () {
      return {
        choose_wepay: true
      }
    },
    computed: mapGetters(
      [
        'pay',
        'logininfo'
      ]
    ),
    methods: {
      alipay(){
        this.choose_wepay = false;
      },
      wepay(){
        this.choose_wepay = true;

      }
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .wallet_box {
    width: 70%;
    height: auto;
    min-height: 440px;
    max-width: 1100px;
    margin: 0 auto;
    text-align: left;
    .wallet_title {
      width: 120%;
      font-size: 16px;
      color: #353842;
      padding-top: 26px;
      display: flex;
      .pay_title {
        flex: 1;
        text-align: left;
      }
      .pay_steps {
        flex: 2;
        vertical-align: middle;

      }
    }
    .pay_info_item {
      display: flex;
      font-size: 14px;
      color: #6a6f83;
      text-align: left;
      margin: 20px auto;
      .pay_key {
        flex: 1;
      }
      .pay_value {
        flex: 4;
      }
      .pay_amount {
        font-size: 24px;
        color: #f3484d;
        letter-spacing: 0px;
        text-align: left;
        height: 14px;
        line-height: 14px;
      }
      .pay_choose {
        display: flex;
        position: relative;
        .choose_item {
          border: 1px solid #d0d0d0;
          border-radius: 3px;
          width: 138px;
          height: 36px;
          margin-right: 30px;
          padding-top: 2px;
          text-align: center;
          cursor: pointer;
        }
        .choose {
          border: 1px solid #5f96ff;
          background: url("../../../assets/image/selected.png") no-repeat right bottom;

        }
        .qr{
          position: absolute;
          width:160px;
          height:208px;
          top:60px;
          left: 156px;
          background: url("../../../assets/image/QRcode.png") no-repeat  center;
          .qr_text{
            width: 90px;
            font-size: 12px;
            background-color: #fff;
            margin-top: 21px;
            margin-left:56px;
          }
          .qr_img{
            width: 120px;
            height: 120px;
            background-color: red;
            margin: 22px auto;
            position: relative;
          }
          .qr_img::before{
            position: absolute;
            content: '';
            width: 40px;
            height: 40px;
            top:40px;
            right:40px;
            background: url("../../../assets/image/login.png") no-repeat  center;
            background-size: 40px;
            background-color: #fff;
            border-radius: 100%;

          }
        }
      }

    }

  }


</style>
