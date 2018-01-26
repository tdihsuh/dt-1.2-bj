<template>
  <Form ref="forgetinfo" :model="forgetinfo" :rules="ruleValidate" :label-width="180" label-position="left">
    <FormItem label="新密码：" prop="password">
      <Input v-model="forgetinfo.password" placeholder="密码不少于6位" size="large"/>
    </FormItem>
    <FormItem label="确认密码：" prop="passwordcheck">
      <Input v-model="forgetinfo.passwordcheck" placeholder="请输入确认密码" size="large"/>
    </FormItem>
    <FormItem style="text-align: left">
      <Button type="primary" @click="handleSubmit('forgetinfo')" size="large">重置</Button>
    </FormItem>
  </Form>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'step3',
    mounted: function () {
      this.$store.commit('step', 2);
      const GetRequest = function () {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = {};
        if (url.indexOf("?") != -1) {
          let str = url.substr(1);
          let strs = str.split("&");
          for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
          }
        }
        return theRequest;
      };
      let url = GetRequest();
      console.log(url);
      this.forgetinfo.email = url.email;
      this.forgetinfo.secret= url.secret;

    },
    data () {
      const validatePass = (rule, value, callback) => {
        if (this.forgetinfo.password.length < 6) {
          callback(new Error('请输入不少于6位的密码'));
        } else {
          if (this.forgetinfo.passwordcheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.forgetinfo.validateField('passwordcheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value !== this.forgetinfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();

        }
      };
      return {
        ruleValidate: {
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          passwordcheck: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {validator: validatePassCheck, trigger: 'blur'}
          ],
        }
      }
    },
    computed: mapGetters(
      [
        'forgetinfo',
      ]
    ),

    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.commit('resetPassword', 2);
          } else {
            this.$Message.error('提交失败，请检查您所填写的信息!');
          }
        })
      },
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
