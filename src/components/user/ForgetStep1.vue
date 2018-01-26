<template>
  <Form ref="forgetinfo" :model="forgetinfo" :rules="ruleValidate" :label-width="180" label-position="left">
    <FormItem label="公司邮箱：" prop="email" style="position: relative;">
      <Input v-model="forgetinfo.email" placeholder="请输入需要重置密码的登录邮箱" size="large"/>
    </FormItem>
    <FormItem label="验证码：" prop="imgcode">
      <Row>
        <Col span="16">
        <Input type="text" v-model="forgetinfo.imgcode" placeholder="请输入右侧图片验证码" size="large" :maxlength="4"/>
        </Col>
        <Col span="7" offset="1">
        <div class="img" @click="imgcode">
          <div v-html="img"></div>
        </div>
        </Col>
      </Row>
    </FormItem>
    <FormItem style="text-align: left">
      <Button type="primary" @click="handleSubmit('forgetinfo')" size="large">提交</Button>
    </FormItem>
  </Form>

</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'step1',
    mounted: function () {
      this.$store.commit('imgcode');
      this.$store.commit('step', 0);
    },
    data () {
      let that = this;
      const validateUserName = (rule, value, callback) => {
        axios.get('/api/v1/users/emails/' + that.forgetinfo.email).then(function (res) {
          let data = res.data;
          console.log('验证邮箱存在');
          console.log(data);
          if (data) {
            callback();
          } else {
            callback(new Error('邮箱不存在'));
          }
        }).catch(function (err) {
          console.log(err.response);
          if (err.response.status == 400) {
            callback(new Error('邮箱不存在'));
          } else if (err.response.status == 503) {
            callback(new Error('系统正在升级，请稍后'));
          } else {
            callback(new Error('网络出错了~~'));
          }
        });
      };
      return {
        ruleValidate: {
          email: [
            {required: true, message: '请输入需要重置密码的登录邮箱', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            {validator: validateUserName, trigger: 'blur'}
          ],
          imgcode: [
            {required: true, message: '请输入右侧图片验证码', trigger: 'blur'},
            {type: 'string', min: 4, message: '请输入4位验证码', trigger: 'blur'}
          ],
        }
      }
    },
    computed: mapGetters(
      [
        'forgetinfo',
        'img'
      ]
    ),

    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.commit('resetPassword',0);
          } else {
            this.$Message.error('提交失败，请检查您所填写的信息!');
          }
        })
      },
      imgcode(){
        this.$store.commit('imgcode');
      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
