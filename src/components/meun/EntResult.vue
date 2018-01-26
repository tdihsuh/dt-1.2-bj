<template>
  <div class="box">
    <!--<div class="box_banner">-->
    <!--<router-link to="/companies" class="bannner_link active_a">-->
    <!--单笔查询-->
    <!--</router-link>-->
    <!--<router-link to="/companiesarray" class="bannner_link unactive_a">-->
    <!--批量查询-->
    <!--</router-link>-->
    <!--</div>-->
    <div class="box_entlist" key="1-1">
      <div class="box_title">
        <div class="title_h">查尽天下失信行为</div>
      </div>
      <div class="content_search">
        <Select size="large" class="select" :value="value_s" @on-change="select_change">
          <Option value="name" key="0">按名称查询</Option>
          <Option value="code" key="1">按代码查询</Option>
        </Select>
        <Input v-model="search.keyword" :placeholder="p_h" size="large" class="ipt" @on-enter="searchipt"> </Input >
        <Button type="primary" size="large" @click="searchipt" class="button" :disabled="!search.success">
          <Icon type="ios-search" size="20" class="icon"></Icon>
          点击搜索
        </Button>
      </div>
    </div>
    <div class="box_result">
      <!--<div class="result_fail" v-if="entresult.frist">-->
      <!--黑猫察，查企业-->
      <!--</div>-->
      <div>
        <!--<div class="result_title" v-if="search.success">搜索结果</div>-->
        <div class="result_title" v-if="!search.success">搜索中
          <Spin></Spin>
        </div>
        <div v-show="entresult.show&&search.success" class="result_fail">
          黑猫察，查企业
          <!--<div class="result_detail" >-->
          <!--<div class="detail_item item1">-->
          <!--<div class="item_title">-->
          <!--主体名称-->
          <!--</div>-->
          <!--<div class="item_content" :title="entresult.sum.name">-->
          <!--{{entresult.sum.name}}-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="detail_item item2">-->
          <!--<div class="item_title" style="line-height: 24px;">-->
          <!--统一社会信用代码-->
          <!--</div>-->
          <!--<div class="item_content">-->
          <!--{{entresult.sum.code}}-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="detail_item item3">-->
          <!--<div class="item_title">-->
          <!--失信标签-->
          <!--</div>-->
          <!--<div class="png">-->
          <!--<div class="item_num" v-for="i in entresult.sum.num" :title="title[i]">-->
          <!--{{title[i]}}-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--</div>-->
          <!--<div class="hold_box_add">注：为避免重复查询扣费，建议您“保存”黑名单信息，可前往“已保存黑名单”中进行免费查询</div>-->
          <!--<div class="detail_action">-->
          <!--<router-link to="/entdetail">-->
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
        <div class="result_no" v-show="!entresult.show&&search.success"></div>
      </div>

    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'entresult',
    data: function () {
      return {
        value_s: 'name',
        p_h: '输入所要查询的公司全称',
//        title: {
//          sp: "高法失信被执行人",
//          ag: "农业领域行政处罚",
//          cb: "银监会行政处罚",
//          ci: "保监会行政处罚",
//          cm: "建筑市场违法欺骗",
//          cs: "证监会处罚",
//          cu: "海关失信企业",
//          dp: "发展改革委受惩黑名单",
//          fm: "食药监局黑名单",
//          gp: "政府采购失信",
//          mt: "重大税收违法",
//          oe: "企业异常名录",
//          qb: "质量黑名单",
//          sb: "安全生产黑名单",
//          tr: "旅游不良信息"
//        }
      }
    },
    computed: mapGetters(
      [
        'search',
        'entresult'
      ]
    ),
    methods: {
      select_change(val){
        this.value_s = val;
        if (val == 'name') {
          this.p_h = '输入所要查询的公司全称'
        } else {
          this.p_h = '输入所要查询的公司统一社会信用代码'
        }
      },
      searchipt(){

        if (this.value_s == 'name') {
          this.$store.dispatch('SearchName');
        } else {
          this.$store.dispatch('SearchCode');
        }
      },
    },
  }
</script>
<style lang="less" rel="stylesheet/less">
  .box_banner {
    width: 400px;
    height: 44px;
    margin: 0 auto;
    display: flex;
    .bannner_link {
      display: inline-block;
      flex: 1;
      width: 200px;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
    }
    .active_a {
      color: #5F96FF;
    }
    .unactive_a {
      color: #6A6F83;
    }
  }

  .box_entlist {
    width: 100%;
    height: 300px;
    background: url("../../assets/image/bg_n.png") no-repeat 0;
    background-size: cover;
    position: relative;
    .box_title {
      width: 100%;
      padding-top: 7%;
      letter-spacing: 2px;
      .title_h {
        font-size: 48px;
        color: #ffffff;
        text-align: center;
        font-weight: 300;
      }

    }
    .content_search {
      position: relative;
      display: flex;
      background: #ffffff;
      box-shadow: 0px 13px 10px 0px rgba(46, 119, 242, 0.40);
      border-radius: 4px;
      width: 70%;
      max-width: 1100px;
      height: 58px;
      margin: 64px auto;
      padding-top: 10px;
      justify-content: flex-end;
      .select {
        flex: 1;
        position: relative;
      }
      .ipt {
        flex: 4;
        padding-left: 40px;
        position: relative;
      }
      .ipt_ent:before {
        position: absolute;
        content: '';
        border: 1px solid #ced0d4;
        width: 1px;
        height: 23px;
        left: 10px !important;
        top: 16%;
        z-index: 2;

      }
      .button {
        flex: 1;
        margin-top: -10px;
      }
    }
    .ivu-select-selection {
      border: 1px solid #fff !important;
    }
    .ivu-select-visible .ivu-select-selection {
      box-shadow: none !important;
    }
    .ivu-select-selected-value {
      font-size: 16px !important;
      color: #6a6f83;
    }
    .ivu-input {
      border-color: #fff;
      font-size: 16px;
      color: #353842;
    }
    .ivu-input:focus {
      box-shadow: none;
    }
    .ivu-btn-large {
      background-image: linear-gradient(-179deg, #5f96ff 0%, #2e78f2 100%);
      border-radius: 0px 4px 4px 0px;
      width: 120px;
      height: 60px;
      .icon {
        vertical-align: top;
        padding-right: 4px;
      }
    }
    .ivu-select-item-selected, .ivu-select-item-selected:hover {
      color: #6a6f83;
      background: #fff;

    }
    .ivu-select-item {
      font-size: 16px !important;
    }
    .ivu-select-item:hover {
      color: #5f96ff !important;
      background: #fff;
    }
    .record_num {
      width: 100%;
      position: absolute;
      bottom: 36px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0.2px;
      text-align: center;
    }
  }

  .box_entlist {
    height: 300px;
    background-position: 0 66%;
    .box_title {
      padding-top: 56px;
    }
    .content_search {
      margin-top: 40px;
    }

  }

  .box_result {
    width: 70%;
    min-height: 400px;
    max-width: 1100px;
    margin: 0 auto 40px;
    .result_fail {
      width: 100%;
      height: 400px;
      background: url("../../assets/image/frist.png") no-repeat 50% 50%;
      background-size: 50%;
      padding-top: 300px;
      color: #B4B8C7;
      font-size: 16px;
    }
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
      }

    }
    .detail_action {
      width: 100%;
      text-align: center;
      .bt_action {
        margin-left: 20px;
        display: inline-block;
        border: 1px solid #5f96ff;
        background: #5f96ff;
        color: #ffffff;
        border-radius: 4px;
        width: 108px;
        height: 32px;
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        margin-top: 34px;
        cursor: pointer;
      }
      .bt_action:hover {
        color: #5f96ff;
        background-color: #fff;
      }
    }
  }

  .result_no {
    width: 100%;
    height: 360px;
    background-image: url('../../assets/image/noresult.png');
    background-repeat: no-repeat;
    background-position: center;
  }

</style>
