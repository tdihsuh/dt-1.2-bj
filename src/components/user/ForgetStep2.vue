<template>
  <div>
    <div class="step2">
      <div class="step2_title">
        <Icon type="ios-information" size="18" color="#ffac06"
              style="vertical-align: text-top;margin-right: 8px;"></Icon>
        您正在使用电子邮箱方式验证身份，请完成以下操作：
        <p class="step2_p">邮件已发送至{{forgetinfo.email}}，请按邮件提示操作，完成身份认证</p>
      </div>
      <Button type="primary" size="large" class="btn" @click="openWeb">立即查收邮件</Button>
    </div>
    <div class="remind">没有收到邮件？请检查是否在垃圾邮件中，若还未收到，请点击 <span @click='interval' :class="telclass">{{text}}</span></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'step2',
    mounted: function () {
      this.$store.commit('step', 1);
    },
    data () {
      return {
        text: '重新发送',
        time: 60,
        telclass: 'send',
      }
    },
    computed: mapGetters(
      [
        'forgetinfo',
      ]
    ),

    methods: {
      openWeb(){
        let email = this.forgetinfo.email;
        const openWeb = function (str) {
          if (!str) {
            return false
          }
          let initstr = str.split("@")[1];
          let hash = {
            'qq.com': 'http://mail.qq.com',
            'gmail.com': 'http://mail.google.com',
            'sina.com': 'http://mail.sina.com.cn',
            '163.com': 'http://mail.163.com',
            '126.com': 'http://mail.126.com',
            'yeah.net': 'http://www.yeah.net/',
            'sohu.com': 'http://mail.sohu.com/',
            'tom.com': 'http://mail.tom.com/',
            'sogou.com': 'http://mail.sogou.com/',
            '139.com': 'http://mail.10086.cn/',
            'hotmail.com': 'http://www.hotmail.com',
            'live.com': 'http://login.live.com/',
            'live.cn': 'http://login.live.cn/',
            'live.com.cn': 'http://login.live.com.cn',
            '189.com': 'http://webmail16.189.cn/webmail/',
            'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
            'yahoo.cn': 'http://mail.cn.yahoo.com/',
            'eyou.com': 'http://www.eyou.com/',
            '21cn.com': 'http://mail.21cn.com/',
            '188.com': 'http://www.188.com/',
            'foxmail.coom': 'http://www.foxmail.com',
            'youngcredit.net': 'https://qiye.aliyun.com/',
            'cycredit.com.cn': 'https://qiye.aliyun.com/'
          };
          return hash[initstr];
        };
        let url = openWeb(email);
        if (!!url) {
          window.open(url);
        } else {
          this.$Message.error('无法识别您的邮箱账户，请手动打开您的邮箱');
        }
      },
      interval(){
        let that = this;
        if (that.time == 60) {
          that.time = 0;
          this.$store.commit('email');
          let num = 60;
          that.telclass = 'send_no';
          that.text = '60秒后重新发送';
          let time = setInterval(function () {
            let second = --num;
            let str = second + '秒后重新发送';
            that.text = str;
            that.time = second;
            if (second == 0) {
              that.time = 60;
              that.text = '重新发送';
              that.telclass = 'send';
              clearInterval(time);
            }
          }, 1000);

        }
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .step2 {
    background: #fff6e6;
    border: 1px solid rgba(255, 255, 255, 0.80);
    border-radius: 4px;
    width: 100%;
    height: 162px;
    font-size: 14px;
    padding: 20px;
    text-align: left;
    .step2_title {
      color: #9094a4;
      .step2_p {
        padding: 8px 0 0 26px;
      }
    }
    .btn {
      margin-left: 22px;
      margin-top: 20px;
    }
  }

  .remind {
    font-size: 14px;
    color: #9094a4;
    letter-spacing: 0px;
    text-align: left;
    margin-left: 12px;
    margin-top: 12px;
  }

  .send {
    color: #5f96ff;
    cursor: pointer;
  }

  .send_no {
    color: #b2b2b2;
  }
</style>
