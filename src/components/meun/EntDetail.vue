<template>
  <div class="detail_box">
    <div class="box_img">
      <div class="img">
        <div class="img_text">
          <div class="name">
            {{entresult.sum.name}}
          </div>
          <div class="cord">
            统一社会信用代码：{{entresult.sum.code}}
          </div>
          <div class="tag">
            <div class="item_num" v-for="(v,k) in entresult.sum.num" :title="title[k]" style="padding-right: 8px;">
              {{`${title[k]}(${v})`}}
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="detail_content">
      <div class="detail_remind">
        声明：黑猫察提供的失信信息均来自于合法途径，如有异议可提出申诉，但黑猫察不承担任何法律责任。
      </div>
      <div class="content_item item0">
        <div class="item_title">
          黑猫判
        </div>
        <div class="item_content" style="display: flex;">
          <div style="flex: 1;" :class="entresult.score_class">
            {{entresult.data.ent_score}}
          </div>

          <div class="content_sum" style="flex: 3;">
            <p>
              经查，该企业存在不良信息，其黑猫分为 {{entresult.data.ent_score}}分。
            </p>
            <p style="font-size: 14px;color:#bcbfc8;padding-top: 20px;">
              分数说明：以0分为基准，根据主体失信行为、次数和权重进行扣分，最低-100分
            </p>
            <div class="color_div">
              <span class="color1"></span>
              <span class="color2"></span>
              <span class="color3"></span>
              <span class="color4"></span>
              <span class="color5"></span>

            </div>

          </div>


        </div>

      </div>
      <div class="content_item item1">
        <div class="item_title">
          基础信息
        </div>
        <div class="item_content">
          <div class="item_content_item">
            <div class="item_key">
              企业名称
            </div>
            <div class="item_val">
              {{entresult.sum.name}}
            </div>
          </div>
          <div class="item_content_item " v-show="!!entresult.sum.code">
            <div class="item_key item_cord">
              统一社会信用代码
            </div>
            <div class="item_val">
              {{entresult.sum.code?entresult.sum.code:"暂无信息"}}
            </div>
          </div>
          <div class="item_content_item " v-show="!!entresult.entinfo.reg_no">
            <div class="item_key item_cord">
              工商注册号
            </div>
            <div class="item_val">
              {{entresult.entinfo.reg_no?entresult.entinfo.reg_no:"暂无信息"}}
            </div>
          </div>
          <div class="item_content_item" v-show="!!entresult.entinfo.legal_man">
            <div class="item_key">
              法人代表
            </div>
            <div class="item_val">
              {{entresult.entinfo.legal_man?entresult.entinfo.legal_man:"暂无信息"}}
            </div>
          </div>
          <div class="item_content_item" v-show="!!entresult.entinfo.identity_code">
            <div class="item_key">
              法定代表人证件号
            </div>
            <div class="item_val">
              {{entresult.entinfo.identity_code?entresult.entinfo.identity_code:"暂无信息"|StrId}}
            </div>
          </div>
          <div class="item_content_item" v-show="!!entresult.entinfo.reg_address">
            <div class="item_key">
              注册地址
            </div>
            <div class="item_val">
              {{entresult.entinfo.reg_address?entresult.entinfo.reg_address:"暂无信息"}}
            </div>
          </div>
          <div class="item_content_item" v-show="!!entresult.entinfo.tax_no">
            <div class="item_key">
              纳税人识别号
            </div>
            <div class="item_val">
              {{entresult.entinfo.tax_no?entresult.entinfo.tax_no:"暂无信息"}}
            </div>
          </div>
        </div>

      </div>
      <div class="content_item item2">
        <div class="item_title">
          失信详情
        </div>
        <div v-for="(value,index) in entresult.detail">
          <div class="item_content" v-for="(val,key) in value"
               v-show="key!='flag'&&value.flag&&key!='cu'&&key!='dp'&&key!='qb'">
            <div class="item_content_title title1" :class="'title'+parseInt(index/2)">
              {{title[key]}}
            </div>
            <div v-for="(va,ind) in val">
              <div class="item_content_item" v-for="(v,k) in va" v-show="content[key][k]&&v">
                <div class="item_key">
                  {{content[key][k]}}
                </div>
                <div class="item_val">
                  {{v}}
                </div>
              </div>
              <div style="margin:26px 0;height: 1px;width: 95%;"></div>
            </div>
          </div>
        </div>
        <div class="item_content" v-show="!!entresult.cu">
          <div class="item_content_title title3">
            海关失信企业
          </div>
          <div class="item_content_item">
            已列入
          </div>
        </div>
        <div class="item_content" v-show="!!entresult.qb">
          <div class="item_content_title title2">
            质量黑名单
          </div>
          <div class="item_content_item">
            已列入
          </div>
        </div>
        <div class="item_content" v-show="!!entresult.dp">
          <div class="item_content_title title5">
            发展改革委受惩黑名单
          </div>
          <div class="item_content_item">
            已列入
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
    name: 'entdetail',
    data: function () {
      return {
        title: {
          sp: "高法失信被执行人",
          ag: "农业领域行政处罚",
          cb: "银监会行政处罚",
          ci: "保监会行政处罚",
          cm: "建筑市场违法欺骗",
          cs: "证监会处罚",
          cu: "海关失信企业",
          dp: "发展改革委受惩黑名单",
          fm: "食药监局黑名单",
          gp: "政府采购失信",
          mt: "重大税收违法",
          oe: "企业异常名录",
          qb: "质量黑名单",
          sb: "安全生产黑名单",
          tr: "旅游不良信息",
          ta: "欠税公告"
        },
        content: {
          sp: {
            court: "执行法院",
            province: "省份",
            case_date: "立案时间",
            case_no: "案号",
            obligation: "生效法律文书确定的义务",
            status: "被执行人的履行情况",
            memo: "失信被执行人行为具体情形",
            pub_date: "发布时间"
          },
          ag: {
            case_no: "案件编号",
            case_name: "案件名称",
            pun_type: "处罚类型",
            illegal_entity: "违法主体",
            pun_date: "处罚生效日期",
            pun_org: "处罚机构",
            pun_dept: "处罚部门",
            pun_reason: "处罚原因",
            pun_by: "处罚依据",
            pun_result: "处罚结果"
          },
          cb: {
            case_no: "文书编号",
            org_level: "机构等级",
            case_fact: "违法主体",
            pun_date: "处罚生效日期",
            law_item: "处罚依据",
            decision: "处罚结果",
            pun_org: "处罚机构"
          },
          ci: {
            case_no: "文书编号",
            pub_date: "发布时间",
            org_level: "机构等级",
            content: "处罚内容"
          },
          cm: {
            pun_date: "处罚决定日期",
            pun_reason: "处罚原因",
            pun_content: "处罚内容",
            pun_org: "执法部门",
            case_no: "处罚文书号码",
            effective_date: "有效日期"
          },
          cs: {
            case_no: "文书编号",
            pun_date: "处罚日期",
            pun_org: "执法部门",
            org_level: "机构等级",
            pun_type: "处罚类型",
            pun_content: "处罚内容"
          },
          cu: {},
          dp: {},
          fm: {
            medicine_certno: "医药生产许可证",
            check_reason: "检查原因",
            check_org: "查询机构",
            pub_date: "发布时间",
            pub_mode: "处罚形式",
            problem: "发现的问题",
            operation: "处罚措施"
          },
          gp: {
            pun_content: "处罚原因",
            pun_result: "处罚结果",
            pun_by: "处罚依据",
            pun_date: "处罚日期",
            gist_unit: "处罚单位"
          },
          mt: {
            pun_type: "处罚类型",
            pun_content: "主要违法事实"
          },
          oe: {
            pun_org: "处罚机构",
            report_year: "处罚年份",
            pun_date: "处罚日期",
            pun_reason: "处罚原因",
            case_no: "处罚文号"
          },
          qb: {},
          sb: {
            pun_date: "处罚日期",
            death_num: "死亡和失踪人数",
            acc_content: "事故简要说明",
            info_source: "信息来源"
          },
          tr: {
            permit_no: "许可证编号",
            pun_reason: "处罚依据原因",
            pun_content: "处罚内容",
            pun_by: "处罚依据",
            start_time: "开始时间",
            end_time: "结束时间",
            description: "描述"
          },
          ta: {
            tax_type: "欠税税种",
            tax_balance: "欠税余额",
            pub_date: "欠税日期"
          }
        }
      }
    }
    ,
    computed: mapGetters(
      [
        'entresult',
        'search'
      ]
    ),
    methods: {
      back()
      {
        window.history.go(-1);
      },
      ok(){
        this.$store.commit('hold', 'ent');
      }
    }
    ,
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .detail_box {
    width: 100%;
    text-align: left;
    background: #ffffff;
    .box_img {
      box-shadow: 0px 8px 8px 0px rgba(46, 119, 242, 0.07);
      padding-bottom: 10px;
      min-height: 140px;
      .img {
        width: 70%;
        max-width: 1100px;
        margin: 0 auto;
        min-height: 140px;
        padding-left: 100px;
        background: url('../../assets/image/head_company.png') no-repeat 0 50%;
        .img_text {
          vertical-align: top;
          padding-left: 30px;
          padding-top: 26px;
          .name {
            font-size: 20px;
            color: #353842;
          }
          .cord, .tag {
            font-size: 14px;
            color: #9094a4;
            margin-top: 10px;
          }
          .tag {
            width: 100%;
            .item_num {
              display: inline-block;
              background-image: linear-gradient(0deg, #5f96ff 0%, #2e78f2 100%);
              box-shadow: 0px 6px 8px 0px rgba(46, 119, 242, 0.24);
              border-radius: 100px;
              padding-right: 10px;
              padding-left: 10px;
              height: 24px;
              margin-bottom: 4px;
              text-align: center;
              font-size: 13px;
              color: #ffffff;
              line-height: 24px;
              vertical-align: top;
              margin-right: 4px;
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
          padding: 30px 30px 26px;
          .ring1{
            background: url('../../assets/image/1.png') no-repeat center;
          }
          .ring2{
            background: url('../../assets/image/2.png') no-repeat center;
          }
          .ring3{
            background: url('../../assets/image/3.png') no-repeat center;
          }
          .ring4{
            background: url('../../assets/image/4.png') no-repeat center;
          }
          .ring5{
            background: url('../../assets/image/5.png') no-repeat center;
          }
          .ring6{
            background: url('../../assets/image/6.png') no-repeat center;
          }
          .ring7{
            background: url('../../assets/image/7.png') no-repeat center;
          }
          .ring8{
            background: url('../../assets/image/8.png') no-repeat center;
          }
          .ring9{
            background: url('../../assets/image/9.png') no-repeat center;
          }
          .ring10{
            background: url('../../assets/image/10.png') no-repeat center;
          }

          .ring{
            background-size: 130px;
            height: 130px;
            line-height: 116px;
            text-align: center;
            font-size:26px
          }
          .content_sum {
            display: inline-block;
            font-size: 16px;
            color: #6a6f83;
            vertical-align: top;
            padding-left: 40px;
            .color_div {
              width: 100%;
              display: flex;
              margin-top: 30px;
              span {
                display: inline-block;
                flex: 1;
                height: 5px;
                position: relative;
              }
              span:before{
                position: absolute;
                top: 10px;
                left: 0;
                color:#cacdd8;
                font-size: 14px;
              }
              .color1 {
                background-color: #f3484d;
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
              }
              .color2 {
                background-color: #ffb160;
              }
              .color3 {
                background-color: #ffec20;
              }
              .color4 {
                background-color: #11db9f;
              }
              .color5 {
                background-color: #2e78f2;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
              }
              .color1:before{
                content:'-100';
              }
              .color2:before{
                content:'-80';
              }
              .color3:before{
                content:'-60';
              }
              .color4:before{
                content:'-40';
              }
              .color5:before{
                content:'-20';
              }
              .color5:after{
                position: absolute;
                top: 10px;
                right: 0;
                color:#cacdd8;
                font-size: 14px;
                content:'0';
              }

            }
          }
          .item_content_item {
            margin-bottom: 16px;
            font-size: 14px;
            width: 100%;
            display: flex;
            .item_key {
              flex: 1;
              font-size: 16px;
              color: #b4b8c7;
              line-height: 46px;
              width: 80px;
              min-height: 46px;
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
            margin: 0 auto;
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
