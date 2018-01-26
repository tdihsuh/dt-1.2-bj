<template>
  <div class="box">
    <div class="box_banner">
      <router-link to="/individuals" class="bannner_link active_a">
        单笔查询
      </router-link>
      <router-link to="/individualsarray" class="bannner_link unactive_a">
        批量查询
      </router-link>
    </div>
    <div class="box_per" key="1-2">
      <div class=" person_res">
        <div class="ipt_box">
          <input v-model="search.personname" placeholder="输入被查询人的姓名" size="large" key="0" class="ipt ipt_must"> </input>
          <input v-model="search.personcord" placeholder="输入被查询人的身份证号" size="large" key='1' :maxlength='18'
                 class="ipt ipt_must"> </input>
          <input v-model="search.personphone" placeholder="输入被查询人的手机号" size="large" key='2' :maxlength='11'
                 class="ipt"> </input>
        </div>
        <div class="check">
          <Checkbox v-model="switch_v" style="font-size: 14px;" @on-change="switch_change">
            本人已获取该用户查询授权
          </Checkbox>
        </div>

        <Button type="primary" size="large" @click="searchipt" class="button" :disabled="!search.success_per">
          <Icon type="ios-search" size="15" class="icon"></Icon>
          搜索
        </Button>
        <div class="p">
          注：查询多头借贷和金融逾期信息必须输入：1.姓名、2.身份证号、3.手机号
        </div>
      </div>
    </div>
    <div class="box_result">
      <!--<div class="result_fail" v-if="personresult.frist">-->
        <!--黑猫察，查个人-->
      <!--</div>-->
      <div >
        <!--<div class="result_title" v-if="search.success_per">搜索结果</div>-->
        <div class="result_title" v-if="!search.success_per">搜索中
          <Spin></Spin>
        </div>
        <div v-show="personresult.show&&search.success_per" class="result_fail">
          黑猫察，查个人
          <!--<div class="result_detail">-->
            <!--<div class="detail_item ">-->
              <!--<div class="item_title">-->
                <!--真实姓名：-->
              <!--</div>-->
              <!--<div class="item_content">-->
                <!--{{personresult.sum.name|StrName}}-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="detail_item ">-->
              <!--<div class="item_title">-->
                <!--身份证号：-->
              <!--</div>-->
              <!--<div class="item_content">-->
                <!--{{personresult.sum.code|StrId}}-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="detail_item ">-->
              <!--<div class="item_title">-->
                <!--手机号：-->
              <!--</div>-->
              <!--<div class="item_content">-->
                <!--{{personresult.sum.phone|StrPhone}}-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="detail_item">-->
              <!--<div class="item_title">-->
                <!--失信标签-->
              <!--</div>-->
              <!--<div class="png">-->
                <!--<div class="item_num" v-show="!!personresult.detail.gaofashixin">-->
                  <!--高法失信被执行人-->
                <!--</div>-->
                <!--<div class="item_num" v-show="!!personresult.detail.jinrongyuqi">-->
                  <!--多头借贷信息-->
                <!--</div>-->
                <!--<div class="item_num " v-show="!!personresult.detail.duotoujiedai">-->
                  <!--金融信贷逾期-->
                <!--</div>-->
                <!--<div class="item_num " v-show="!!personresult.detail.fanzuixinxi">-->
                  <!--犯罪不良信息核查-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="hold_box_add">注：为避免重复查询扣费，建议您“保存”黑名单信息，可前往“已保存黑名单”中进行免费查询</div>-->
          <!--<div class="detail_action">-->
            <!--<router-link to="/persondetail">-->
              <!--<div class="bt_action">-->
                <!--查看详情-->
              <!--</div>-->
            <!--</router-link>-->
            <!--<Poptip-->
              <!--confirm-->
              <!--title="确定保存这条黑名单吗？"-->
              <!--placement="top-end"-->
              <!--@on-ok="ok"-->
            <!--&gt;-->
              <!--<div class="bt_action">-->
                <!--保存-->
              <!--</div>-->
            <!--</Poptip>-->


          <!--</div>-->
        </div>
        <div class="result_no" v-show="!personresult.show&&search.success_per"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'personresult',
    data: function () {
      return {
        frist: true,
        switch_v: false
      }
    },
    computed: mapGetters(
      [
        'search',
        'personresult'
      ]
    ),
    methods: {
      switch_change(){
        console.log(this.switch_v);
      },
      searchipt(){
        if (!this.switch_v) {
          this.$Message.info('必须获取查询授权');
          return;
        }
        this.$store.dispatch('SearchPerson');
        this.switch_v = false;
      },
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .box_per {
    height: 300px;
    width: 100%;
    box-shadow: 0px 3px 9px 0px rgba(52, 55, 65, 0.13);
    background: url("../../assets/image/bg_n.png") no-repeat 0;
    background-size: cover;
    text-align: left;
    .person_res {
      width: 70%;
      max-width: 1100px;
      margin: 0 auto;
      .ipt_box {
        padding-top: 50px;
        display: flex;

        .ipt {
          flex: 1;
          margin-right: 20px;
          border: 1px solid #ced0d4;
          border-radius: 3px;
          height: 46px;
          line-height: 44px;
          padding-left: 30px;
        }
        .ipt_must {
          background: url('../../assets/image/xing.png') no-repeat 13px 16px;
          background-color: #fff;
        }
      }
      .check {
        text-align: left;
        margin-top: 20px;
        color: #fff;
      }
      .button {
        margin-top: 20px;
        margin-bottom: 20px;
        width: 120px;
        background-color: #53bcff;
      }
      .p {
        font-size: 14px;
        text-align: left;
        color: #fff
      }
    }

  }

  .box_result {
    width: 70%;
    min-height: 400px;
    max-width: 1100px;
    margin: 0 auto 40px;
    .result_title {
      font-size: 24px;
      color: #353842;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .result_detail {
      background: #ffffff;
      box-shadow: 0px 3px 11px 0px rgba(46, 119, 242, 0.17);
      width: 100%;
      height: 384px;
      text-align: left;
      padding-top: 40px;
      .detail_item {
        width: 50%;
        height: 50px;
        min-width: 340px;
        max-width: 600px;
        margin: 0 auto 24px;
        position: relative;
        display: flex;
        .item_title {
          flex: 1;
          font-size: 14px;
          color: #9094a4;
          line-height: 50px;
          text-align: left;
        }
        .item_content {
          flex: 3;
          padding-left: 30px;
          font-size: 16px;
          color: #353842;
          line-height: 50px;
          text-align: left;
          border: 1px solid #e6e8e8;
          border-radius: 3px;

        }

      }

    }
    .detail_action {
      width: 100%;
      text-align: center;

    }
  }

  .result_no {
    width: 100%;
    height: 360px;
    background-image: url('../../assets/image/noresult.png');
    background-repeat: no-repeat;
    background-position: center;
  }

  .hold_box_add {
    color: red;
    font-size: 14px;
    padding-top: 10px;
    margin-bottom: -10px;
  }


</style>
