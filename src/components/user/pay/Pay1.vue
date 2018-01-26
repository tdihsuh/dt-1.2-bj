<template>
  <div class="box">
    <div class="wallet_box">
      <div class="wallet_title">
        <div class="pay_title">账户充值</div>
        <div class="pay_steps">
          <Steps :current="0">
            <Step title="填写充值金额" icon="person-add"></Step>
            <Step title="在线支付" icon="camera"></Step>
            <Step title="充值完成" icon="email"></Step>
          </Steps>
        </div>
      </div>
      <div class="pay_info">
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
            充值金额：
          </div>
          <div class="pay_value">
            <Input v-model="pay.amount" placeholder="充值金额必须是不小于10元不大于50000的正整数值" style="width: 320px" :maxlength="5" @on-enter="toPay"/>
          </div>
        </div>
      </div>
      <Button type="primary" size="large" @click="toPay" class="pay_bt">下一步</Button>
      <div class="pay_hr"></div>
      <div class="pay_remind">
        <p class="pay_remind_title">温馨提示：</p>
        <p>1.充值成功后，余额可能存在延迟现象，一般1到5分钟内到账，如有问题，请咨询客服；
          <br>
          2.充值金额输入值必须是不小于10且不大于50000的正整数；
          <br>
          3.充值完成后，您可以进入账户充值记录页面进行查看余额充值状态。</p>

      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'pay1',
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
      toPay(){
        this.$store.dispatch('toNext');
      }
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

    }
    .pay_bt {
      background: #5f96ff;
      border-radius: 3px;
      width: 102px;
      height: 38px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      margin-left: 110px;
      margin-top: 10px;
    }
    .pay_hr {
      width: 104%;
      height: 1px;
      background: #e8e8e8;
      margin: 30px auto;
    }
    .pay_remind {
      background: url("../../../assets/image/wallet.png") no-repeat 20px 20px;
      background-color: #fff6e6;
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
