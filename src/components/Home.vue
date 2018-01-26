<template>
  <div class="home">
    <div class="update" v-show="logininfo.update.show">
      {{logininfo.update.text}}
      <span class="update_close" @click="close">
        <Icon type="close-circled" size="16"></Icon>
      </span>

    </div>
    <div :class="menu">
      <div class="logo_div">
        <div class="logo_img"></div>
        <div class="logo_title"></div>
        <div class="logo_text">
          机构定制版
        </div>
      </div>
      <Menu theme="primary" accordion mode="horizontal" class="banner_menu">

        <Submenu name="1">
          <template slot="title">
            <span class="meun_item">黑名单查询</span>
          </template>
          <Menu-item name="1-1">
            <router-link to="/companies" class="router_link">
              企业黑名单查询
            </router-link>
          </Menu-item>
          <Menu-item name="1-2">
            <router-link to="/individuals" class="router_link">
              个人黑名单查询
            </router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            查询统计信息
          </template>
          <Menu-item name="2-1">
            <router-link to="/statistics" class="router_link">
              统计信息概览
            </router-link>
          </Menu-item>
          <Menu-item name="2-2">
            <router-link to="/consumptionlist" class="router_link">
              消费明细详情
            </router-link>
          </Menu-item>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            已保存黑名单
          </template>
          <Menu-item name="3-1">
            <router-link to="/saved_companies" class="router_link">
              企业已保存黑名单
            </router-link>
          </Menu-item>
          <Menu-item name="3-2">
            <router-link to="/saved_individuals" class="router_link">
              个人已保存黑名单
            </router-link>
          </Menu-item>
        </Submenu>
      </Menu>
      <div class="user_div">
        <Menu theme="primary" accordion mode="horizontal">

          <Submenu name="2">
            <template slot="title">
              <span class="meun_item" style="display: inline-block;max-width: 88px;overflow: hidden;vertical-align: middle;text-overflow:ellipsis;
white-space: nowrap;" :title="logininfo.name"> {{logininfo.name}}</span>
            </template>
            <Menu-item name="2-1">
              <router-link to="/profile" class="router_link" style="text-align: center">
                基本信息
              </router-link>
            </Menu-item>
            <Menu-item name="2-2">
              <router-link to="/password" class="router_link" style="text-align: center">
                修改密码
              </router-link>
            </Menu-item>
            <Menu-item name="2-3">
              <router-link to="/wallet" class="router_link" style="text-align: center">
                钱包账户
              </router-link>
            </Menu-item>
            <Menu-item name="2-4">
              <div style="text-align: center;cursor: pointer;" @click="quit">
                退出登录
              </div>
            </Menu-item>
          </Submenu>
        </Menu>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>

    </div>
    <div class="footer">
      <div class="footer_item">中青信用管理有限公司</div>
      <div class="footer_item">地址：北京市海淀区致真大厦B座6层｜电话：010-59837372｜邮箱：service@cycredit.com.cn</div>
      <div class="footer_item footer_img">京ICP备17002651号-3 <span class="footer_span_img"></span> 京公网安备 11010802024911号
      </div>
      <div class="footer_codeImg"></div>
    </div>

  </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'home',
    mounted(){
      let that = this;
      this.$store.commit('update');
      let interval = setInterval(function () {
        that.$store.commit('update');
      }, 2000);
    },
    data: function () {
      return {
        menu: 'menu menu menu_datail ',
        action: false
      }
    },
    methods: {
      quit(){
        this.$store.dispatch('Quit');
      },
      close(){
        this.$store.commit('updateClose');
      }

    },
    computed: mapGetters(
      [
        'logininfo'
      ]
    ),
    watch: {
      $route(n){
        console.log(n.path);
        let param = n.path;
        let that = this;
        if (param == '/individualsarray') {
          that.action = true;
        } else {
          that.action = false;
          return
        }
        let time = setInterval(function () {
          that.$store.commit('batchLsit');
          if (!that.action) {
            clearInterval(time);
          }
        }, 1000);
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" rel="stylesheet/less">
  .home {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .update {
    width: 100%;
    height: 28px;
    background-color: #ffcc66;
    line-height: 28px;
    text-align: center;
    position: relative;
    padding-right: 50px;
    .update_close {
      position: absolute;
      right: 10px;
      top: 2px;
      cursor: pointer;
    }

  }

  .menu {
    height: 80px;
    width: 100%;
    min-width: 800px;
    padding-top: 8px;
    z-index: 11;
    position: relative;
    background: url('../assets/image/bg_n.png');
    background-size: cover;
    background-position: top;
    .logo_div {
      width: 30%;
      min-width: 300px;
      position: absolute;
      left: 0;
      font-size: 20px;
      color: #ffffff;
      padding-top: 10px;
      text-align: left;
      .logo_img {
        display: inline-block;
        width: 42px;
        height: 42px;
        margin-left: 16%;
        background: url('../assets/image/login.png') no-repeat center;
        background-size: contain;
      }
      .logo_title {
        display: inline-block;
        width: 80px;
        height: 42px;
        margin-left: 1%;
        background: url('../assets/image/text.png') no-repeat center;
        background-size: contain;
      }
      .logo_text {
        display: inline-block;
        border: 1px solid #ffffff;
        border-radius: 100px;
        margin-left: 1%;
        width: 98px;
        height: 26px;
        line-height: 23px;
        font-size: 14px;
        text-align: center;
        vertical-align: top;
        margin-top: 10px;
      }

    }
    .banner_menu {
      width: 440px !important;
      margin: 0 auto;
      height: 100%;
    }
    .ivu-menu-primary {
      background: none;
    }
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu:hover {
      background: none;
    }
    .meun_item {
      font-size: 15px;
      color: #ffffff;
      line-height: 32px;
      text-align: left;
      padding-right: 4px;
    }
    .router_link {
      display: inline-block;
      cursor: pointer;
      width: 100%;
      color: #666666;
    }
    .user_div {
      position: absolute;
      right: 0;
      top: 0;
      width: 20%;
      max-width: 300px;
      min-width:180px;
      line-height: 60px;
      background: url('../assets/image/user.png') no-repeat 0% 50%;
      margin-top: 8px;
      padding-left: 30px;
      background-size: 12%;
      text-align: center;
      .span {
        display: inline-block;
        margin-left: 25%;
        min-width: 150px;
        margin-top: 4px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        .userinfo {
          color: #fff;
        }
      }
    }
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu {
      color: #fff;
    }

  }

  .menu_datail {
    background-color: #fff;
    background-image: none;
    border-bottom: 1px solid #e1e5e7;
    .logo_div {
      color: #5f96ff;

      .logo_title {
        background: url('../assets/image/text2.png') no-repeat center;
        background-size: contain;
      }
      .logo_text {
        border: 1px solid #5f96ff;
      }

    }

    .meun_item {
      color: #6a6f83;
    }
    .user_div {
      .span {
        color: #6a6f83;
        .userinfo {
          color: #6a6f83;
        }

      }
    }
    .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu {
      color: #6a6f83;
    }

  }

  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
    padding: 0;
  }

  .content {
    height: auto;
    /*min-height: 500px;*/
  }

  .router-link-active {
    color: #5F96FF !important;
  }

  .ivu-menu-item {
    cursor: default !important;
  }

  @media screen and (max-width: 1000px) {
    .logo_text {
      display: none !important;
    }
  }

  .footer {
    width: 100%;
    height: 240px;
    background-color: #fafafa;
    text-align: center;
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

</style>
