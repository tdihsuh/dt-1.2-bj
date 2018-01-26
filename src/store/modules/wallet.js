import axios from 'axios'
import Vue from 'vue'
import Router from '../../router/index'
import md5 from 'js-md5'
import util from '../../lib/util'
const vue = new Vue();
const {parseTwo, axiosError}=util;
axios.defaults.withCredentials = true;

//钱包模块

const state = {
  balance: 0,
  balance_class: 'balance_hide',
  paytable: {
    data: {},
    keyword: '',
    current: 1,
    sort: -1,
    totalPage: 1,
    table: []
  },
  pay: {
    amount: '',
  }
}

// getters
const getters = {
  balance: state => state.balance,
  balance_class: state => state.balance_class,
  paytable: state => state.paytable,
  pay: state => state.pay,
}

// actions
const actions = {
  //获取余额
  Wallet ({commit, state, rootState}) {
    let id = rootState.mutations.MongoUsers._id;
    axios.get(`/api/v1/users/banlance/${id}`).then(function (res) {
        console.log('余额数据');
        console.log(res.data);
        let balance = parseTwo(res.data.balance);
        commit('Wallet', balance)
      }
    ).catch(function (err) {
      console.log(err);
    });
  },
  //获取支付列表
  PayList({commit, state, rootState}, page = 1){
    let id = rootState.mutations.MongoUsers._id;
    let offset = (page - 1) * 10;
    axios.get(`/api/v1/uploads/${id}/batch_logs`, {
      params: {
        offset: offset,
        limit: 10,
        sort: state.paytable.sort,
        query_type: 0,
      }
    }).then(function (res) {
      let data = res.data;
      commit('PayList', data, page)
    }).catch(function (err) {
      axiosError(err);
    });
  },
//  充值页面
  toPay({commit, state, rootState}, to = 1){
    if (to <= 3) {
      Router.push({path: `/pay${to}`});
    } else {
      setTimeout(function () {
        Router.push({path: `/wallet`});
      }, 2000)
    }

  },
  //充值方式选择
  toNext({commit, state, rootState}){
    let amount = parseInt(state.pay.amount);
    if (amount && amount >= 10 && amount <= 50000) {
      Router.push({path: `/pay2`});
    } else {
      vue.$Message.error('请输入正确的充值金额');
    }
  }

}

// mutations
const mutations = {
  Wallet(state, balance){
    state.balance = balance;
    balance = parseInt(balance);
    if (balance >= 2000) {
      state.balance_class = 'balance_hide';
    } else {
      state.balance_class = 'balance_show';
    }
  },
  PayList(state, data, page){
    state.paytable.data = data;
    state.paytable.totalPage = data.totalPage;
    state.paytable.current = page;
    state.paytable.table = data.rows;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
