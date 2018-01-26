<template>
  <div class='userinfo_change'>
    <div class="title">
      修改密码
    </div>
    <div class="user_content">
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" class="form_user_change">
        <FormItem label="" prop="oldpasswd">
          <div class="user_content_item">
            <div class="user_item_key">原始密码</div>
            <div class="user_item_value" >
              <Input type="password"  v-model="formCustom.oldpasswd"></Input>
            </div>
          </div>
        </FormItem>
        <FormItem label="" prop="passwd">
          <div class="user_content_item">
            <div class="user_item_key">新密码</div>
            <div class="user_item_value">
              <Input type="password" v-model="logininfo.newpsd"></Input>
            </div>
          </div>
        </FormItem>
        <FormItem label="" prop="passwdCheck">
          <div class="user_content_item">
            <div class="user_item_key">确认密码</div>
            <div class="user_item_value">
              <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </div>
          </div>
        </FormItem>
      </Form>
      <div class="user_content_item ">
        <div class="user_item_key"></div>
        <div class="user_item_value bt">
          <Button type="primary" size="large" @click="handleSubmit('formCustom')" style="width: 100px;">完 成</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'userchange',
    data: function () {
      const validatePass = (rule, value, callback) => {
        if (this.logininfo.newpsd.length<6) {
          callback(new Error('请输入不少于6位的密码'));
        }else if(this.logininfo.newpsd==this.formCustom.oldpasswd){
          callback(new Error('新密码不可与原始密码相同'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.logininfo.newpsd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();

        }
      };
      const validateOld = (rule, value, callback) => {
        const getCookie =function (name) {
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
          if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
          else
            return null;
        };
        if (!value) {
          return callback(new Error('原始密码不能为空'));
        } else if(value!==JSON.parse(getCookie('user')).password){
          return callback(new Error('原始密码错误'));
        }
        callback();
      };

      return {
        formCustom: {
          passwdCheck: '',
          oldpasswd: ''
        },
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
          oldpasswd: [
            { validator: validateOld, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.dispatch('UserChange');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },

    },
    computed: mapGetters(
      [
        'logininfo',
      ]
    ),
  }
</script>

<style lang="less" rel="stylesheet/less">
  .userinfo_change {
    width: 760px;
    margin: 0 auto;
    min-height: 600px;
    padding-top: 80px;
    text-align: center;
    .title {
      font-size: 36px;
      color: #353842;
      letter-spacing: 0px;
      text-align: center;
    }
    .user_content {
      width: 80%;
      margin: 0 auto;
      padding-top: 50px;
      .user_content_item {
        width: 100%;
        display: flex;
        font-size: 15px;
        color: #6a6f83;
        text-align: left;
        line-height: 52px;
        margin-bottom: 30px;
        .user_item_key {
          flex: 1;
          padding-left: 80px;
        }
        .user_item_value {
          flex: 3;
          background: #fafafa;
          border-radius: 3px;
          min-height: 52px;

        }
        .bt {
          background-color: #fff;
          padding-left: 0;
        }
      }
    }
  }
  .form_user_change{
    .ivu-form-item{
      margin-bottom: 0;
    }
    .user_item_value{
      background-color: #fff !important;
      .ivu-input{
        min-height: 52px;
        font-size:15px;
        padding-left: 40px;
      }
    }
    .ivu-form-item-error-tip{
      left:216px;
    }

  }
</style>
