<template>
  <div class="box">
    <div class="title">
      <div class="list_and_pdf">
        <div class="list">消费明细</div>
        <div class="pdf">
        </div>
      </div>

      <div>
        <div class="search_date"> 查询类型：
          <Select v-model="logininfo.consumption_params.type" size="large" style="width:100px">
            <Option v-for="item in logininfo.consumption_params.typelist" :value="item.value" :key="item.value">
              {{item.label }}
            </Option>
          </Select>
        </div>

        <div class="search_date">查询时间：
          <DatePicker type="datetimerange" placement="bottom-end" placeholder="请输入查询时间" format="yyyy-MM-dd HH:mm"
                      v-model="logininfo.consumption_params.data" size="large" style="width: 300px"></DatePicker>
          <Button type="primary" size="large" style="width: 100px;" @click="fetchList">查询</Button>
          <Button type="primary" size="large"  @click="download">EXCEL下载</Button>
        </div>
      </div>
    </div>
    <div class="content_box" style="min-width:660px;">
      <div class="content_table" id="table">
        <Table :columns="columns" :data="logininfo.consumption_table.table " size="large"
               @on-sort-change="sort"></Table>
      </div>
      <div class="table_page">
        <Page :total="logininfo.consumption_table.totalPage" @on-change="page" show-elevator
              :current="logininfo.consumption_table.current"></Page>
      </div>

    </div>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'enthold',
    mounted: function () {
      this.$store.commit('fetchList');
    },
    data: function () {
      return {
        select: true,
        red:'redaaa',
        columns: [
          {
            title: '主体名称',
            key: 'ent_name',
            align: 'center',
            render: (h, params) => {
              let nodes;
              if (params.row.queries[0].query_type == 0) {
                let param = JSON.parse(params.row.queries[0].query);
                nodes = param.identity_name;
                return h('div', [
                  h('div', {
                    style: {
                      marginRight: '16px',
                    },
                    'class':{
                      perbg:true,
                    },
                    attrs:{
                      'class':'perbg'
                    }
                  }, nodes)
                ]);
              } else if (params.row.queries[0].query_type == 1) {
                let param = JSON.parse(params.row.queries[0].query);
                let paramData = JSON.parse(params.row.queries[0].data);
                nodes = param.identity_name ? param.identity_name : paramData.ent_name;
                return h('div', [
                  h('div', {
                    style: {
                      marginRight: '16px',
                    },
                    'class':{
                      entbg:true,
                    },
                    attrs:{
                      'class':'entbg'
                    }


                  }, nodes)
                ]);
              }

            },

          },
          {
            title: '主体编码',
            key: 'credit_no',
            align: 'center',
            render: (h, params) => {
              let nodes;
              if (params.row.queries[0].query_type == 0) {
                let param = JSON.parse(params.row.queries[0].query);
                if (param.identity_code) {
                  let arr = param.identity_code.split("");
                  arr[10] = "*";
                  arr[11] = "*";
                  arr[12] = "*";
                  arr[13] = "*";
                  nodes = arr.join('')
                } else {
                  nodes = '- -';
                }
              } else if (params.row.queries[0].query_type == 1) {
                let param = JSON.parse(params.row.queries[0].query);
                let paramData = JSON.parse(params.row.queries[0].data);
                nodes = param.identity_code ? param.identity_code : paramData.credit_no;
              }
              return h('div', nodes)
            },

          },
          {
            title: '查询状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              let nodes = '未匹配';
              let arr = params.row.queries;
              for (let i in arr) {
                if (arr[i].query_status == 1) {
                  nodes = '匹配';
                }
              }
              return h('div', nodes)
            },
          },
          {
            title: '支出金额',
            key: 'price',
            align: 'center',
            render: (h, params) => {
              let nodes = 0;
              let arr = params.row.queries
              for (let i in arr) {
                nodes += arr[i].charged;
              }
              return h('div', nodes)
            },
          },
          {
            title: '查询时间',
            key: 'save_date',
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
            sortable: true
          },

        ],
      }
    },
    computed: mapGetters(
      [
        'logininfo'
      ]
    ),
    methods: {
      fetchList(){
        this.$store.commit('fetchList');
      },
      download(){
        this.$store.commit('fetchList');
        this.$store.commit('consumDownload');

      },
      sort(param){
        let data = {
          type: 'consum'
        };
        if (param.key == 'status') {
          let search_status = 0;
          if (param.order == 'asc') {
            search_status = 0;
          } else if (param.order == 'desc') {
            search_status = 1;
          } else if (param.order == 'normal') {
            search_status = 2
          }
          this.$store.commit('status', search_status);

        } else {
          if (param.order == 'asc') {
            data.sort = -1;
          } else {
            data.sort = 1;
          }
          this.$store.commit('sort', data);
        }

      },
      page(index){
        let params = {
          index: index,
          type: 'consum'
        };
        this.$store.commit('page', params);
      }

    },
  }

</script>
<style scoped lang="less" rel="stylesheet/less">

  .box {
    width: 100%;
    background-color: #ffffff;
    .box_entlist {
      height: 250px !important;
      background-position: 0 92%;
      overflow: hidden;
      .content_search {
        margin-top: 110px;
        .ipt_box {
          width: 1100px;
          font-size: 16px;
          color: #353842;
        }
      }

    }
    .title {
      width: 70%;
      max-width: 1100px;
      min-width:660px;
      margin: 20px auto;
      text-align: left;
      font-size: 16px;
      line-height: 30px;
      color: #353842;
      .search_date {
        margin-top: 12px;
      }
      .list_and_pdf {
        display: flex;
        .list {
          flex: 3;
          font-weight: 600;
        }
        .pdf {
          flex: 1;
          text-align: right;
        }
      }
    }
    .content_box {
      width: 70%;
      max-width: 1100px;
      min-height: 270px;
      margin: 0px auto;
      .content_search {
        padding-top: 14px;
        padding-left: 16px;
        position: relative;
        text-align: left;
      }
      .box_group {
        text-align: left;
      }

    }
    .content_table {
      width: 100%;
      margin-top: 6px;
    }
    .table_page {
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
