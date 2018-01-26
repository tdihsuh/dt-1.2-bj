<template>
  <div class="forget_wrap">
    <div class="logo_div">
      <div class="logo_img" @click="toLogin"></div>
      <div class="logo_title" @click="toLogin"></div>
      <div class="logo_text_a" @click="toLogin">
        查尽天下失信行为
      </div>
      <a href="http://www.cycredit.com.cn/" class="logo_a">中青信用官网</a>
    </div>
    <div class="content">
      <div class="forget_form">
        <div class="forget_form_title">
          重置密码
        </div>
        <div class="forget_form_step">
          <Steps :current="forgetinfo.current">
            <Step title="填写用户名"></Step>
            <Step title="验证身份" ></Step>
            <Step title="重置密码" ></Step>
            <Step title="设置成功" ></Step>
          </Steps>
        </div>
        <div class="forger_form_wrap">
          <router-view></router-view>
        </div>
      </div>

    </div>
    <div class="footer">
      <div class="footer_item">中青信用管理有限公司</div>
      <div class="footer_item">地址：北京市海淀区致真大厦B座6层｜电话：010-59837372｜邮箱：service@cycredit.com.cn</div>
      <div class="footer_item ">京ICP备17002651号-3 <span class="footer_span_img"></span> 京公网安备 11010802024911号</div>
      <div class="footer_codeImg"></div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'forget',
    computed: mapGetters(
      [
        'forgetinfo'
      ]
    ),
    methods: {
      toLogin(){
        this.$store.commit('toLogin');
      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .forget_wrap {
    width: 100%;
    height: 100%;
    .logo_div {
      height: 80px;
      width: 100%;
      padding-top: 14px;
      text-align: left;
      position: fixed;
      background-color: #fff;
      color: #5f96ff;
      z-index: 11;
      .logo_img {
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-left: 32px;
        background: url('../assets/image/login.png') no-repeat center;
        background-size: contain;
      }
      .logo_title {
        display: inline-block;
        width: 80px;
        height: 42px;
        margin-left: 1%;
        background: url('../assets/image/text2.png') no-repeat center;
        background-size: contain;
      }
      .logo_text_a {
        display: inline-block;
        border-radius: 100px;
        margin-left: 1%;
        width: 128px;
        color: #000;
        height: 26px;
        line-height: 23px;
        font-size: 16px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
      }
      .logo_text {
        display: inline-block;
        border-radius: 100px;
        margin-left: 1%;
        color: #000;
        width: 98px;
        height: 26px;
        line-height: 23px;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
      }
      .logo_a {
        display: inline-block;
        position: absolute;
        height: 26px;
        line-height: 23px;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
        right: 20px;
        border: 1px solid #5f96ff;
        border-radius: 2px;
        width: 98px;
      }
    }
    .content {
      min-height: 80%;
      padding-top: 80px;
      position: relative;
      .forget_form {
        width: 70%;
        max-width: 800px;
        min-width: 600px;
        height: auto;
        margin: 0px auto;
        text-align: center;
        font-size: 14px;
        .forget_form_title {
          padding: 20px;
          color: #353842;
          font-size: 24px;
        }
        .forget_form_step{
          margin: 20px auto 70px;
        }
        .forget_form_title_text {
          font-size: 12px;
          color: #9094a4;
          padding-top: 6px;
          padding-bottom: 20px;
        }
        .forger_form_wrap{
          width: 80%;
          max-width: 600px;
          margin: 40px auto;
        }

      }
    }
    .footer {
      width: 100%;
      height: 20%;
      min-height: 240px;
      text-align: center;
      background-color: #fafafa;
      font-size: 14px;
      color: #6a6f83;
      letter-spacing: 0px;
      padding-top: 20px;
      .footer_item {
        margin-top: 10px;
      }
      .footer_span_img {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/image/beianlogo.png') no-repeat 48% 50%;
        background-size: contain;
        vertical-align: top;
      }
      .footer_codeImg {
        width: 100px;
        height: 100px;
        background: url('../assets/image/wx.png') no-repeat center;
        background-size: cover;
        margin: 10px auto 0;
      }
    }
  }

  .ivu-modal-footer {
    display: none !important;
  }


</style>
