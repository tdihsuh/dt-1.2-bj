<template>
  <div class="box">
    <div class="wallet_box">
      <div class="wallet_title">
        钱包账户
      </div>
      <div class="wallet_balance">
        <span>当前账户余额：</span>
        <span :class="balance_class">
          <span style="font-size: 14px">￥</span>
          {{balance|NumInt}}</span>
      </div>
      <Button type="primary" size="large" @click="toPay" class="pay_bt">立即充值</Button>
    </div>
    <div class="array_result">
      <div class="array_remind">
      </div>
      <div class="table">
        <Table :columns="columns" :data="paytable.table" size="large"></Table>
      </div>
      <div class="page">
        <Page :total="paytable.totalPage" @on-change="page" show-elevator :current="paytable.current"></Page>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'wallet',
    mounted: function () {
      this.$store.dispatch('Wallet');
      this.$store.dispatch('PayList');
      this.page();
    },
    data: function () {
      return {
        columns: [
          {
            title: '充值金额',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              let time = new Date(params.row.created);
              let minutes;
              let seconds;
              if (time.getMinutes() < 10) {
                minutes = '0' + time.getMinutes();
              } else {
                minutes = time.getMinutes();
              }
              if (time.getSeconds() < 10) {
                seconds = '0' + time.getSeconds();
              } else {
                seconds = time.getSeconds();
              }
              let nodes = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + minutes + ':' + seconds;
              return h('div', nodes)
            },

          },
          {
            title: '充值方式',
            key: 'code',
            align: 'center',
            render: (h, params) => {
              let num = params.row.total ? params.row.total / params.row.lengthApi : '- -';
              let nodes = Math.round(num);

              return h('div', nodes)
            },

          },
          {
            title: '充值方账户',
            key: 'date',
            align: 'center',
            render: (h, params) => {
              let num = params.row.finished;
              let nodes = parseInt(num * 100) + '%';

              return h('div', nodes)
            },
          },
          {
            title: '充值时间',
            key: 'date',
            align: 'center',
            width: '120px',
            render: (h, params) => {
              let nodes;
              if (params.row.status == 0) {
                let num = Number(params.row.finished);
                console.log(num);
                return h('div', [
                  h('Progress', {
                    props: {
                      percent: num * 100,
                      status: 'active'
                    },
                    style: {
                      marginRight: '8px'
                    },
                  }, parseInt(params.row.finished * 100) + '%'),
                ])
              } else if (params.row.status == 1) {
                nodes = '成功';
                return h('div', nodes)
              } else {
                nodes = '失败';
                return h('div', nodes)
              }

            },
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if (params.row.status == 1) {
                return h('div', [
                  h('div', {
                    style: {
                      marginRight: '16px',
                      color: '#5f96ff',
                      display: 'inline-block',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        let param = params.row.url;
                        this.download(param);
                      }
                    }
                  }, '下载'),
                ]);
              } else {
                return h('div', [
                  h('div', {
                    style: {
                      marginRight: '16px',
                      color: '#959595',
                      display: 'inline-block',
                    },
                  }, '下载'),
                ])
              }

            }
          }
        ],
      }
    },
    computed: mapGetters(
      [
        'balance',
        'balance_class',
        'paytable'
      ]
    ),
    methods: {
      page(index){
        this.$store.dispatch('PayList', index);
      },
      toPay(){
        this.$store.dispatch('toPay');
      }
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .wallet_box {
    width: 70%;
    height: 160px;
    max-width: 1100px;
    margin: 0 auto;
    text-align: left;
    .wallet_title {
      font-size: 16px;
      color: #353842;
      padding-top: 26px;
    }
    .wallet_balance {
      font-size: 14px;
      color: #6a6f83;
      .balance_show, .balance_hide {
        font-size: 24px;
        color: #f3484d;
        position: relative;
      }
      .balance_show::after {
        position: absolute;
        content: "当前余额过少，为不影响您正常使用，请及时充值。";
        font-size: 12px;
        color: #666666;
        line-height: 34px;
        top: -2px;
        right: -370px;
        background: url("../../assets/image/wallet.png") no-repeat 6% 50%;
        box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.13);
        border-radius: 3px;
        width: 332px;
        height: 34px;
        padding-left: 40px;
      }
      .balance_show::before {
        position: absolute;
        content: "";
        top: 8px;
        right: -37px;
        width: 0px;
        height: 0px;
        border: 6px solid #fff;
        border-right-color: #f2f2f2;
        z-index: 11;
      }
    }
    .pay_bt {
      background: #5f96ff;
      border-radius: 3px;
      width: 102px;
      height: 38px;
      font-size: 14px;
      color: #ffffff;
      text-align: center;
      margin-left: 110px;
      margin-top: 10px;
    }

  }

  .array_result {
    width: 70%;
    min-height: 400px;
    max-width: 1100px;
    margin: 0 auto 40px;
    .array_remind {
      background: #e8e8e8;
      width: 100%;
      height: 1px;
    }
    .table {
      width: 100%;
      margin-top: 20px;
    }
    .page {
      margin-top: 50px;
      margin-bottom: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .ivu-table td, .ivu-table th {
    border: none !important
  }

  .ivu-table-wrapper {
    border: none;
  }


</style>
