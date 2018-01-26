<template>
  <div class="box">
    <div class="wallet_box">
      <div class="wallet_title">
        <div class="pay_title">账户充值</div>
        <div class="pay_steps">
          <Steps :current="2">
            <Step title="填写充值金额" icon="person-add"></Step>
            <Step title="在线支付" icon="camera"></Step>
            <Step title="充值完成" icon="email"></Step>
          </Steps>
        </div>
      </div>
      <div class="pay_remind">
        <p class="pay_remind_title">支付成功！</p>
        <p>充值金额：¥8000.00
          <br>
          充值账户：{{logininfo.entname}}
          <br>
          支付方式：微信支付</p>

      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'pay3',
    mounted: function () {
//      this.$store.dispatch('toPay',4);
    },
    data: function () {
      return {

      }
    },
    computed: mapGetters(
      [
        'pay',
        'logininfo'
      ]
    ),
    methods: {
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .wallet_box {
    width: 70%;
    height: auto;
    min-height: 400px;
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
    .pay_remind {
      background: url("../../../assets/image/success.png") no-repeat 20px 20px;
      background-color: #f3faf0;
      border: 1px solid rgba(255, 255, 255, 0.80);
      border-radius: 4px;
      width: 104%;
      height: 110px;
      margin: 20px auto;
      padding: 20px 40px;
      font-size:12px;
      color:#57595f;
      line-height:18px;
      .pay_remind_title{
        font-size:14px;
        color:#353842;
        margin-bottom: 8px;
      }
    }

  }


</style>
