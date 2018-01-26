<template>
  <div class="box">
    <div class="box_banner">
      <router-link to="/individuals" class="bannner_link unactive_a">
        单笔查询
      </router-link>
      <router-link to="/individualsarray" class="bannner_link active_a ">
        批量查询
      </router-link>
    </div>
    <div class="box_per" key="1-2">
      <div class=" person_res">
        <div class="ipt_box">
          <div class="excel_update">
            <div class="excel_name">
              {{name}}
            </div>
            <Upload
              :show-upload-list="false"
              :before-upload="handleUpload"
              :format="['xlsx']"
              action=""
              class="excel_update_bt">
              <Button type="ghost" icon="ios-cloud-upload-outline" size="large">
                选择文件
              </Button>
            </Upload>
          </div>
          <div class="excel_download" @click="example">
            模板下载
          </div>

        </div>
        <div class="check">
          <Checkbox v-model="switch_v" style="font-size: 14px;" @on-change="switch_change">
            本人已获取该用户查询授权
          </Checkbox>
        </div>

        <Button type="primary" size="large" @click="searchipt" class="button button_arr" :disabled="disabled">
          <Icon type="ios-search" size="15" class="icon"></Icon>
          批量查询
        </Button>
        <Button type="primary" size="large" @click="clear" class="button button_reset" :disabled="disabled">
          重置
        </Button>
        <div class="p">
          注1：查询多头借贷和金融逾期信息必须输入：1.姓名、2.身份证、3.手机号
          <br>
          注2：目前只支持1000条以下的批量查询，请严格按照模板格式上传文件
          <br>
        </div>
      </div>
    </div>
    <div class="array_result">
        <div class="array_title">搜索结果</div>
        <div class="array_remind">
          注：仅保存7日内查询记录
        </div>
        <div class="table">
          <Table :columns="columns" :data="array.person.table" size="large"></Table>
        </div>
        <div class="page">
          <Page :total="array.person.totalPage" @on-change="page" show-elevator :current="array.person.current"></Page>
        </div>
      </div>

  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'personarr',
    mounted: function () {
    },
    data: function () {
      return {
        switch_v: false,
        name: '请上传excel文件',
        disabled:false,
        excel: true,
        arr:[],
        stop:false,
        columns: [
          {
            title: '查询时间',
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
            title: '查询量',
            key: 'code',
            align: 'center',
            render: (h, params) => {
              let num = params.row.total ? params.row.total/params.row.lengthApi : '- -';
              let nodes=Math.round(num);

              return h('div', nodes)
            },

          },
          {
            title: '已完成',
            key: 'date',
            align: 'center',
            render: (h, params) => {
                let num =params.row.finished;
                let nodes =parseInt(num*100)+'%';

              return h('div', nodes)
            },
          },
          {
            title: '查询状态',
            key: 'date',
            align: 'center',
            width:'120px',
            render: (h, params) => {
                let nodes;
                if(params.row.status==0){
                    let num=Number(params.row.finished);
                  console.log(num);
                  return h('div', [
                    h('Progress', {
                      props: {
                        percent:num*100,
                        status:'active'
                      },
                      style: {
                        marginRight: '8px'
                      },
                    }, parseInt(params.row.finished*100)+'%'),
                  ])
                }else if(params.row.status==1){
                    nodes='成功';
                    return h('div', nodes)
                }else{
                    nodes='失败';
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
              if(params.row.status==1){
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
              }else{
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
        'array'
      ]
    ),
    methods: {
      handleUpload (file) {
        let that = this;
        that.file = file;
        that.excel = true;
        let name = file.name;
        let arr = name.split('.');
        if (arr.pop() != 'xlsx') {
          this.$Message.error('只接受后缀名为.xlsx的excel文件');
          return
        }
        let fileReader = new FileReader();
        fileReader.onload = function (ev) {
          let data = ev.target.result;
          let workbook = XLSX.read(data, {
            type: 'binary'
          }); // 以二进制流方式读取得到整份excel表格对象
          let persons = []; // 存储获取到的数据
          // 表格的表格范围，可用于判断表头是否数量是否正确
          let fromTo = '';
          // 遍历每张表读取
          for (let sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              fromTo = workbook.Sheets[sheet]['!ref'];
              persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
              // break; // 如果只取第一张表，就取消注释这行
            }
          }
          if(persons.length>1000){
            that.$Message.info('查询量大于1000条，暂不支持');
            that.name='请上传excel文件';
            that.switch_v = false;
            return
          }
          console.log(666);
          let arr=[];
          for (let i in persons) {
            let param = persons[i];
            if (!param['姓名'] || !param['身份证']) {
              that.excel = false;
              return
            }
            let list ={
              realName:param['姓名'],
              idCode:param['身份证'],
              phoneNumber:param['手机号']
            };
            arr.push(list);
          }
          that.arr=arr;
          console.log(555);
        };

        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file);
        that.name = name;
        return false;
      },
      switch_change(){
        console.log(this.switch_v);
      },
      searchipt(){
        console.log(this.arr.length);
        if(this.name=='请上传excel文件'||this.arr.length==0){
          console.log(55);
          this.$Message.info('请按照标准模板上传excel文件');
          return;
        }
        if (!this.switch_v) {
          this.$Message.info('必须获取查询授权');
          return;
        }
        if(!this.excel){
          this.$Message.info('姓名和身份证号为必填项');
          return;
        }
        this.array.person.current=1;
        this.$store.commit('upload', this.arr);
        this.switch_v = false;
        this.disabled=true;
      },
      example(){
        this.$store.commit('excelDownload','http://files.uniccat.com/%E4%B8%AA%E4%BA%BA%E6%9F%A5%E8%AF%A2%E6%A8%A1%E7%89%88.xlsx');
//        'http://p09fylrky.bkt.clouddn.com/%E4%BC%81%E4%B8%9A%E6%9F%A5%E8%AF%A2%E6%A8%A1%E7%89%88.xlsx'
      },
      download(uri){
        let url =uri;
        console.log(uri);
        this.$store.commit('excelDownload',url);
      },
      clear(){
        this.file = null;
        this.name = '请上传excel文件';
      },
      page(index){
          let that=this;
        let params = {
          index: index,
          type: 'batch'
        };
        that.$store.commit('page', params);
      }

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
      width: 60%;
      max-width: 1100px;
      margin: 0 auto;
      overflow: hidden;
      .ipt_box {
        margin-top: 50px;
        display: flex;
        height: 46px;
        .excel_update {
          flex: 3;
          display: flex;
          .excel_name {
            display: inline-block;
            flex: 3;
            height: 46px;
            background-color: #fff;
            border-radius: 4px;
            font-size: 14px;
            line-height: 46px;
            padding-left: 10px;
            padding-right: 16px;
            overflow: hidden;
            color: #B4B8C7;
          }
          .excel_update_bt {
            display: inline-block;
            margin-left: -10px;
            flex: 1;
            height: 46px;
            background-color: #f0f0f0;
            border-radius: 4px;
            color: #B4B8C7;
            font-size: 14px;
            line-height: 46px;
            text-align: center;
            cursor: pointer;
            .ivu-upload {
              width: 100% !important;
            }
            .ivu-upload-select {
              width: 100%;
            }
            .ivu-btn-ghost {
              width: 100%;
              height: 46px !important;
              margin-top: -2px;
              span {
                font-size: 14px;
              }
            }
          }
        }
        .excel_download {
          margin-left: 10px;
          flex: 1;
          background-color: #fff;
          color: #B4B8C7;
          font-size: 14px;
          line-height: 46px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
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
      }
      .button_arr {
        background-color: #53bcff;
      }
      .button_reset {
        background-color: #1e67e9 !important;
      }
      .p {
        font-size: 14px;
        text-align: left;
        color: #fff
      }
    }

  }

  .array_result {
    width: 70%;
    min-height: 400px;
    max-width: 1100px;
    margin: 0 auto 40px;
    .array_fail {
      width: 100%;
      height: 400px;
      background: url("../../assets/image/frist.png") no-repeat 50% 50%;
      background-size: 50%;
      padding-top: 300px;
      color: #B4B8C7;
      font-size: 16px;
    }
    .array_title {
      font-size: 24px;
      color: #353842;
      text-align: center;
      margin-top: 30px;
      margin-bottom: 10px;

    }
    .array_remind {
      color: #9094a4;
      font-size: 14px
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
