<template>
  <div class="box">
    <div class="box_entlist" key="3-1">
      <div class="content_search">
        <div class="ipt_box">
          <Input v-model="enttable.keyword" placeholder="输入关键词" size="large" key="3-1"> </Input>
        </div>
        <Button type="primary" size="large" @click="holdsearch" class="button">
          <Icon type="ios-search" size="20" class="icon"></Icon>
          点击搜索
        </Button>
      </div>
    </div>
    <div class="title">
      <div>已保存企业黑名单</div>
      <Button type="ghost" size="large" style="width: 120px;color:#6a6f83" @click="allAction">{{selectText}}</Button>
      <Button type="ghost" size="large" style="width: 120px;" @click="modalShow">删除</Button>
    </div>
    <div class="content_box" style="min-width:660px;">
      <div class="content_table">
        <Modal
          v-model="modal"
          @on-ok="removeAll"
          title="消息提示"
          :closable="false"
        >
          <p>确认要删除这些黑名单吗？</p>
        </Modal>

        <Table :columns="columns" :data="enttable.table" size="large" @on-selection-change="selection"
               @on-sort-change="sort"></Table>
      </div>
      <div class="table_page">
        <Page :total="enttable.totalPage" @on-change="page" show-elevator :current="enttable.current"></Page>
      </div>

    </div>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'enthold',
    mounted: function () {
      this.$store.dispatch('HoldFetchEnt');
    },
    data: function () {
      return {
        modal: false,
        select: true,
        selectText: '批量操作',
        selectArr: [],
        columns: [
          {
            title: '主体名称',
            key: 'name',
            align: 'center',
            render: (h, params) => {
              const address = params.row.name;
              const keyword = this.enttable.keyword;
              const reg = new RegExp("(" + keyword + ")");
              const splitArr = address.split(reg);
              const nodes = splitArr.map((currentValue) => {
                if (currentValue == keyword) {
                  return h('span', {
                    style: {
                      color: '#5f96ff'
                    }
                  }, keyword);
                }
                return currentValue;
              });
              return h('div', nodes)
            },

          },
          {
            title: '统一社会信用代码',
            key: 'code',
            align: 'center',
            render: (h, params) => {
            const num = params.row.code?params.row.code:'暂无';
            return h('div', num)
          },

          },
          {
            title: '保存时间',
            key: 'date',
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.date)
            },
            sortable: 'custom'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
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
                      let param = params.row;
                      this.toDetail(param)
                    }
                  }
                }, '查看详情'),
                h('Poptip', {
                  props: {
                    confirm: true,
                    title: '确定删除这条黑名单吗?',
                    placement: 'top-end',
                  },
                  on: {
                    'on-ok': () => {
                      this.remove(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
      }
    },
    computed: mapGetters(
      [
        'enttable',
      ]
    ),
    methods: {
      holdsearch(){
        this.$store.commit('Hold_Search', 'ent');
      },
      selection(info){
        this.selectArr = info;
      },
      sort(param){
        let data = {
          type: 'ent'
        };
        if (param.order == 'asc') {
          data.sort = -1;
        } else {
          data.sort = 1;
        }
        this.$store.commit('sort', data);
      },
      toDetail (params) {
        params.type = 'ent';
        this.$store.commit('toDetail', params);
      },
      remove (data) {
        let arr = [];
        arr.push(data);
        let params = {
          params: arr,
          type: "ent"
        };
        console.log(params);
        this.$store.commit('remove', params);
      },
      removeAll(){
        let arr = this.selectArr;
        let params = {
          params: arr,
          type: "ent"
        };
        console.log(params);
        this.selectArr = [];
        this.$store.commit('remove', params);
      },
      modalShow(){
        if (this.selectArr.length < 1) {
          return
        }
        this.modal = true;
      },
      allAction(){
        if (this.select) {
          this.columns.unshift(
            {
              type: 'selection',
              width: 60,
              align: 'right'
            }
          );
          this.selectArr = [];
          this.select = false;
          this.selectText = '取消批量操作'
        } else {
          this.columns.shift();
          this.select = true;
          this.selectText = '批量操作'
          this.selectArr = [];
        }

      },
      page(index){
        let params = {
          index: index,
          type: 'ent'
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
      margin: 20px auto;
      text-align: left;
      font-size: 16px;
      height: 86px;
      line-height: 46px;
      color: #353842;
    }
    .content_box {
      width: 70%;
      max-width: 1100px;
      min-height: 270px;
      margin: 0 auto;
      .content_search {
        padding-top: 14px;
        padding-left: 16px;
        position: relative;
        text-align: left;
      }

    }
    .content_table {
      width: 100%;
      margin-top: 20px;
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
