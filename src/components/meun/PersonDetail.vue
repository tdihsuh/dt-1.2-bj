<template>
  <div class="detail_box">
    <div class="box_img">
      <div :class="imgClass">
        <div class="img_text">
          <div class="name">
            {{personresult.sum.name|StrName}}
          </div>
          <div class="cord">
            身份证号：{{personresult.sum.code|StrId}}
          </div>
          <div class="tag">
            <div class="item_num" v-show="!!personresult.detail.gaofashixin">
            高法失信被执行人
            </div>
            <div class="item_num" v-show="!!personresult.detail.jinrongyuqi">
            多头借贷信息
            </div>
            <div class="item_num " v-show="!!personresult.detail.duotoujiedai">
            金融信贷逾期
            </div>
            <div class="item_num " v-show="!!personresult.detail.fanzuixinxi">
            犯罪不良信息核查
            </div>

          </div>
        </div>
      </div>

    </div>
    <div class="detail_content">
      <div class="detail_remind">
        声明：黑猫察提供的失信信息均来自于合法途径，如有异议可提出申诉，但黑猫察不承担任何法律责任。
      </div>
      <div class="content_item item1">
        <div class="item_title">
          基础信息
        </div>
        <div class="item_content">
          <div class="item_content_item">
            <div class="item_key">
              真实姓名：
            </div>
            <div class="item_val">
              {{personresult.sum.name|StrName}}
            </div>
          </div>
          <div class="item_content_item">
            <div class="item_key">
              身份证号：
            </div>
            <div class="item_val">
              {{personresult.sum.code|StrId}}
            </div>
          </div>
          <div class="item_content_item">
            <div class="item_key">
              手机号：
            </div>
            <div class="item_val" v-if="personresult.sum.phone">
              {{personresult.sum.phone|StrPhone}}
            </div>
            <div class="item_val" v-else>
              - -
            </div>
          </div>
        </div>

      </div>
      <div class="content_item item2">
        <div class="item_title">
          失信详情
        </div>
        <div class="item_content" v-show="personresult.detail.gaofashixin"
             v-for="item in personresult.detail.gaofashixin">
          <div class="item_content_title title0">
            高法失信被执行人－法院失信
          </div>
          <div class="item_content_item" v-show="item.court">
            <div class="item_key">
              执行法院：
            </div>
            <div class="item_val">
              {{item.court?item.court:''}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.province">
            <div class="item_key ">
              所在省份：
            </div>
            <div class="item_val">
              {{item.province}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.case_no">
            <div class="item_key">
              案件编号：
            </div>
            <div class="item_val">
              {{item.case_no}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.status">
            <div class="item_key">
              执行状态：
            </div>
            <div class="item_val">
              {{item.status}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.memo">
            <div class="item_key">
              案件分类：
            </div>
            <div class="item_val">
              {{item.memo}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.case_date">
            <div class="item_key">
              立案日期：
            </div>
            <div class="item_val">
              {{item.case_date}}
            </div>
          </div>
          <div class="item_content_item" v-show="item.obligation">
            <div class="item_key">
              案件详情：
            </div>
            <div class="item_val">
              {{item.obligation}}
            </div>
          </div>
          <div class="hr"></div>
        </div>
        <div class="item_content" v-show="personresult.detail.duotoujiedai">
          <div class="item_content_title title1">
            金融信贷逾期－逾期
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_ZZSJ">
            <div class="item_key">
              最早出现时间：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_ZZSJ}}
            </div>
          </div>
          <div class="item_content_item " v-show="personresult.detail.duotoujiedai.result_YQ_ZJSJ">
            <div class="item_key ">
              最近出现时间：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_ZJSJ}}
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_DQJE">
            <div class="item_key">
              当前逾期金额：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_DQJE}}W
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_DQSC">
            <div class="item_key">
              当前逾期时长：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_DQSC}}
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_ZDJE">
            <div class="item_key" style="text-align: left;line-height: 24px;">
              历史最大逾期金额：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_ZDJE}} W
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_ZDSC">
            <div class="item_key" style="text-align: left;line-height: 24px;">
              历史最大逾期时长：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_ZDSC}}
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_YQ_LJCS">
            <div class="item_key" style="text-align: left;">
              累计出现次数：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_YQ_LJCS}}
            </div>
          </div>
          <div class="hr"></div>
        </div>
        <div class="item_content"
             v-show="personresult.detail.duotoujiedai.result_QZ_ZZSJ&&personresult.detail.duotoujiedai.result_QZ_ZJSJ&&personresult.detail.duotoujiedai.result_QZ_LJCS">
          <div class="item_content_title title2">
            金融信贷逾期－欺诈
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_QZ_ZZSJ">
            <div class="item_key">
              最早出现时间：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_QZ_ZZSJ}}
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_QZ_ZJSJ">
            <div class="item_key">
              最近出现时间：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_QZ_ZJSJ}}
            </div>
          </div>
          <div class="item_content_item" v-show="personresult.detail.duotoujiedai.result_QZ_LJCS">
            <div class="item_key" style="text-align: left;">
              累计出现次数：
            </div>
            <div class="item_val">
              {{personresult.detail.duotoujiedai.result_QZ_LJCS}}
            </div>
          </div>
          <div class="hr"></div>
        </div>
        <div class="item_content" style="padding-right: 10px;"
             v-show="personresult.detail.jinrongyuqi.result_xdpt&&personresult.detail.jinrongyuqi.result_xdpt.length>0">
          <div class="item_content_title title2">
            多头借贷信息－信贷平台注册详情
          </div>
          <Table :columns="columns1"
                 :data="personresult.detail.jinrongyuqi.result_xdpt?personresult.detail.jinrongyuqi.result_xdpt:[]"></Table>
          <div class="hr" style="margin-top: 20px;"></div>
        </div>
        <div class="item_content" style="padding-right: 10px;"
             v-show="personresult.detail.jinrongyuqi.result_dksq&&personresult.detail.jinrongyuqi.result_dksq.length>0">
          <div class="item_content_title title2">
            多头借贷信息－信贷申请详情
          </div>
          <Table :columns="columns2"
                 :data="personresult.detail.jinrongyuqi.result_dksq?personresult.detail.jinrongyuqi.result_dksq:[]"></Table>
          <div class="hr" style="margin-top: 20px;"></div>
        </div>
        <div class="item_content" style="padding-right: 10px;" v-show="personresult.detail.jinrongyuqi.result_dkfk&&personresult.detail.jinrongyuqi.result_dkfk.length>0">
          <div class="item_content_title title2">
            多头借贷信息－贷款放款详情
          </div>
          <Table :columns="columns3"
                 :data="personresult.detail.jinrongyuqi.result_dkfk?personresult.detail.jinrongyuqi.result_dkfk:[]"></Table>
          <div class="hr" style="margin-top: 20px;"></div>
        </div>
        <div class="item_content" style="padding-right: 10px;" v-show="personresult.detail.jinrongyuqi.result_dkbh&&personresult.detail.jinrongyuqi.result_dkbh.length>0">
          <div class="item_content_title title2">
            多头借贷信息－贷款驳回详情
          </div>
          <Table :columns="columns4"
                 :data="personresult.detail.jinrongyuqi.result_dkbh?personresult.detail.jinrongyuqi.result_dkbh:[]"></Table>
          <div class="hr" style="margin-top: 20px;"></div>
        </div>
        <div class="item_content" v-show="personresult.detail.fanzuixinxi.success">
          <div class="item_content_title title2">
            犯罪不良信息核查
          </div>
          <div class="item_content_item">
            {{personresult.detail.fanzuixinxi.success?personresult.detail.fanzuixinxi.data.markResult:'接口调用失败'}}
          </div>
        </div>
      </div>


    </div>
    <div class="btn_back">
      <div class="hold_box_add">注：为避免重复查询扣费，建议您“保存”黑名单信息，可前往“已保存黑名单”中进行免费查询</div>
      <div class="bt_action" @click="back">
        返回
      </div>
      <Poptip
        confirm
        title="确定保存这条黑名单吗？"
        placement="top-end"
        @on-ok="ok"
      >
        <div class="bt_action">
          保存
        </div>
      </Poptip>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'persondetail',
    data: function () {
      return {
        imgClass: 'img',
        columns1: [
          {
            title: '平台类型',
            key: 'P_TYPE',
            render: (h, params) => {
              let str = '银行';
              if (params.row.P_TYPE == 2) {
                str = '非银行'
              }
              return h('div', str)
            },
          },
          {
            title: '平台代码',
            key: 'PLATFORMCODE',
            render: (h, params) => {
              let nodes = params.row.PLATFORMCODE;
              let arr = nodes.split('');
              arr.shift();
              arr[0] = 'H';
              arr[1] = 'M';
              arr[2] = 'C';
              let str = arr.join('');
              return h('div', str)
            },
          },
          {
            title: '注册时间',
            key: 'REGISTERTIME'
          }
        ],
        columns2: [
          {
            title: '平台类型',
            key: 'P_TYPE',
            render: (h, params) => {
              let str = '银行';
              if (params.row.P_TYPE == 2) {
                str = '非银行'
              }
              return h('div', str)
            },
          },
          {
            title: '平台代码',
            key: 'PLATFORMCODE',
            render: (h, params) => {
              let nodes = params.row.PLATFORMCODE;
              let arr = nodes.split('');
              arr.shift();
              arr[0] = 'H';
              arr[1] = 'M';
              arr[2] = 'C';
              let str = arr.join('');
              return h('div', str)
            },
          },
          {
            title: '申请时间',
            key: 'APPLICATIONTIME'
          },
          {
            title: '申请金额区间',
            key: 'APPLICATIONAMOUNT'
          },
        ],
        columns3: [
          {
            title: '平台类型',
            key: 'P_TYPE',
            render: (h, params) => {
              let str = '银行';
              if (params.row.P_TYPE == 2) {
                str = '非银行'
              }
              return h('div', str)
            },
          },
          {
            title: '平台代码',
            key: 'PLATFORMCODE',
            render: (h, params) => {
              let nodes = params.row.PLATFORMCODE;
              let arr = nodes.split('');
              arr.shift();
              arr[0] = 'H';
              arr[1] = 'M';
              arr[2] = 'C';
              let str = arr.join('');
              return h('div', str)
            },
          },
          {
            title: '放款时间',
            key: 'LOANLENDERSTIME'
          },
          {
            title: '放款金额区间',
            key: 'LOANLENDERSAMOUNT'
          },
        ],
        columns4: [
          {
            title: '平台类型',
            key: 'P_TYPE',
            render: (h, params) => {
              let str = '银行';
              if (params.row.P_TYPE == 2) {
                str = '非银行'
              }
              return h('div', str)
            },
          },
          {
            title: '平台代码',
            key: 'PLATFORMCODE',
            render: (h, params) => {
              let nodes = params.row.PLATFORMCODE;
              let arr = nodes.split('');
              arr.shift();
              arr[0] = 'H';
              arr[1] = 'M';
              arr[2] = 'C';
              let str = arr.join('');
              return h('div', str)
            },
          },
          {
            title: '驳回时间',
            key: 'REJECTIONTIME'
          },
        ],
      }
    },
    computed: mapGetters(
      [
        'personresult',
        'search'
      ]
    ),
    methods: {
      back(){
        window.history.go(-1);
      },
      ok(){
        this.$store.commit('hold', 'person');
      }
    },
    mounted: function () {
      if (!this.personresult.detail.duotoujiedai && !this.personresult.detail.jinrongyuqi && !this.personresult.detail.gaofashixin && this.personresult.detail.fanzuixinxi.markResult == "正常") {
        this.imgClass = 'img img_no'
      }
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .detail_box {
    width: 100%;
    text-align: left;
    background: #ffffff;
    .box_img {
      width: 100%;
      box-shadow: 0px 8px 8px 0px rgba(46, 119, 242, 0.07);
      padding-bottom: 10px;
      min-height:140px;
      .img {
        width: 70%;
        max-width: 1100px;
        margin: 0 auto;
        padding-left: 100px;
        min-height:140px;
        background: url('../../assets/image/head_person.png') no-repeat 0 50%;
        .img_text {
          vertical-align: top;
          padding-left: 30px;
          padding-top: 26px;
          .name {
            font-size: 20px;
            color: #353842;
          }
          .cord,.tag{
            font-size: 14px;
            color: #9094a4;
            margin-top: 10px;
          }
          .tag{
            width: 100%;
            .item_num {
              display: inline-block;
              background-image: linear-gradient(0deg, #5f96ff 0%, #2e78f2 100%);
              box-shadow: 0px 6px 8px 0px rgba(46, 119, 242, 0.24);
              border-radius: 100px;
              width: 25%;
              max-width: 160px;
              height: 24px;
              text-align: center;
              font-size: 13px;
              color: #ffffff;
              line-height: 24px;
            }
          }
        }
      }

    }
    .detail_content {
      width: 70%;
      max-width: 1100px;
      margin: 0 auto;
      min-height: 500px;
      .detail_remind {
        background-color: #fff7ef;
        background-image: url('../../assets/image/amazing.png');
        background-repeat: no-repeat;
        background-position: 2% 48%;
        border: 1px solid #fff2e4;
        border-radius: 4px;
        font-size: 14px;
        color: #6a6f83;
        line-height: 42px;
        padding-left: 40px;
        margin-top: 30px;
      }
      .item0 {
        background-image: url('../../assets/image/icon0.png');
      }
      .item1 {
        background-image: url('../../assets/image/icon1.png');
      }
      .item2 {
        background-image: url('../../assets/image/icon2.png');
        margin-bottom: 40px;
      }
      .content_item {
        background-color: #ffffff;
        background-repeat: no-repeat;
        background-position: 28px 15px;
        border: 1px solid #e1e5e7;
        margin-top: 24px;
        .item_title {
          height: 50px;
          line-height: 50px;
          padding-left: 60px;
          font-size: 16px;
          color: #353842;
          font-weight: 600;
          border-bottom: 1px solid #e1e5e7;
        }
        .item_content {
          padding: 30px 20px 26px 20px;
          .content_sum {
            display: inline-block;
            font-size: 16px;
            color: #6a6f83;
            line-height: 118px;
            vertical-align: top;
            padding-left: 40px;
            span {
              color: #5F96FF;
            }
          }
          .item_content_item {
            margin-bottom: 16px;
            font-size: 14px;
            width: 100%;
            display: flex;
            .ivu-table-wrapper {
              border-left: none;
            }
            .item_key {
              flex: 1;
              font-size: 16px;
              color: #b4b8c7;
              line-height: 46px;
              text-align: left;
              margin-left: 5%;
            }
            .item_cord {
              min-height: 46px;
              line-height: 22px;
            }
            .item_val {
              flex: 3;
              font-size: 16px;
              color: #6a6f83;
              vertical-align: top;
              background: #fafafa;
              border-radius: 2px;
              line-height: 32px;
              margin-left: 26px;
              padding-left: 24px;
              padding-top: 6px;
              margin-right: 5%;
            }

          }
          .title0 {
            background-image: url('../../assets/image/tab0.png');
          }
          .title1 {
            background-image: url('../../assets/image/tab1.png');
          }
          .title2 {
            background-image: url('../../assets/image/tab2.png');
          }
          .title3 {
            background-image: url('../../assets/image/tab3.png');
          }
          .title4 {
            background-image: url('../../assets/image/tab4.png');
          }
          .title5 {
            background-image: url('../../assets/image/tab5.png');
          }

          .item_content_title {
            background-repeat: no-repeat;
            background-position: 2px 2px;
            font-size: 16px;
            color: #353842;
            line-height: 24px;
            height: 40px;
            padding-left: 36px;
          }
          .hr {
            width: 98%;
            border-bottom: 1px dashed #dddddd;

          }

        }
      }

    }
    .btn_back {
      width: 100%;
      text-align: center;
      margin-bottom: 20px;
      margin-top: -20px;
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
    .hold_box_add {
      color: red;
      font-size: 14px;
      padding-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>

