<template>
  <div class='userinfo_div'>
    <div class="title">
      基本信息
    </div>
    <div class="user_content">
      <div class="user_content_item">
        <div class="user_item_key">账号名称</div>

        <div class="user_item_value">
          <span style="display: inline-block;width: 40px;height: 1px;"></span>
          {{logininfo.name}}
        </div>
      </div>
      <div class="user_content_item">
        <div class="user_item_key">企业名称</div>
        <div class="user_item_value">
          <span style="display: inline-block;width: 40px;height: 1px;"></span>
          {{logininfo.entname}}
        </div>
      </div>
      <div class="user_content_item">
        <div class="user_item_key">联系人手机</div>
        <div class="user_item_value">
          <span style="display: inline-block;width: 40px;height: 1px;"></span>
          {{MongoUsers.mobile}}
        </div>
      </div>
      <div class="user_content_item">
        <div class="user_item_key">查询范围</div>
        <div class="user_item_value">
          <span style="display: inline-block;width: 40px;height: 1px;"></span>
          <span v-for="(value,index) in logininfo.api">{{value.name}} 、 </span>
          <span v-show="logininfo.ent_api.name">{{logininfo.ent_api.name}} </span>
        </div>
      </div>
      <div class="user_content_item" style="display: none;">
        <div class="user_item_key">查询价格</div>
        <div class="user_item_value">
          <div v-for="(value,index) in logininfo.api">
            <span style="display: inline-block;width: 40px;height: 1px;"></span>
            <span >{{value.name}} -- {{value.billing_mode == 0 ? "查询计费" : "查得计费"}} -- {{value.price}}元/次  <br></span>
          </div>
          <div v-show="logininfo.ent_api.name">
            <span style="display: inline-block;width: 40px;height: 1px;"></span>
            <span >{{logininfo.ent_api.name}} -- {{logininfo.ent_api.billing_mode == 0 ? "查询计费" : "查得计费"}} -- {{logininfo.ent_api.price}}元/次  <br></span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'userinfo',
    computed: mapGetters(
      [
        'logininfo',
        'MongoUsers'
      ]
    ),
  }

</script>

<style lang="less" rel="stylesheet/less">
  .userinfo_div {
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
      width: 100%;
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
          flex: 4;
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
</style>
