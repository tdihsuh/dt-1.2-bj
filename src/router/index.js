import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import PersonResult from '@/components/meun/PersonResult'
import PersonArr from '@/components/meun/PersonArr'
import EntResult from '@/components/meun/EntResult'
import InfoList from '@/components/info/InfoList'
import UserInfo from '@/components/user/UserInfo'
import UserChange from '@/components/user/UserChange'
import ConsumptionList from '@/components/info/ConsumptionList'
import PersonHold from '@/components/hold/PersonHold'
import EntHold from '@/components/hold/EntHold'
import EntDetail from '@/components/meun/EntDetail'
import PersonDetail from '@/components/meun/PersonDetail'
import Apply from '@/components/Apply'
import Forget from '@/components/Forget'
import Step1 from '@/components/user/ForgetStep1'
import Step2 from '@/components/user/ForgetStep2'
import Step3 from '@/components/user/ForgetStep3'
import Step4 from '@/components/user/ForgetStep4'
import Wallet from '@/components/user/Wallet'
import Pay1 from '@/components/user/pay/Pay1'
import Pay2 from '@/components/user/pay/Pay2'
import Pay3 from '@/components/user/pay/Pay3'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/apply',
      component: Apply,
    },
    {
      path: '/forget',
      component: Forget,
      children: [
        {
          path: '',
          redirect: 'step1',
        },
        {
          path: 'step1',
          component: Step1,
        },
        {
          path: 'step2',
          component: Step2,
        },
        {
          path: 'step3',
          component: Step3,
        },
        {
          path: 'step4',
          component: Step4,
        },
      ]
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'companies',
        },
        {
          path: 'individuals',
          component: PersonResult,
        },
        {
          path: 'individualsarray',
          component: PersonArr,
        },
        {
          path: 'persondetail',
          component: PersonDetail,
        },
        {
          path: 'companies',
          component: EntResult,
        },
        {
          path: 'entdetail',
          component: EntDetail,
        },
        {
          path: 'statistics',
          component: InfoList,
        },
        {
          path: 'consumptionlist',
          component: ConsumptionList,
        },
        {
          path: 'profile',
          component: UserInfo,
        },
        {
          path: 'password',
          component: UserChange,
        },
        {
          path: 'wallet',
          component: Wallet,
        },
        {
          path: 'pay1',
          component: Pay1,
        },
        {
          path: 'pay2',
          component: Pay2,
        },
        {
          path: 'pay3',
          component: Pay3,
        },
        {
          path: 'saved_individuals',
          component: PersonHold ,
        },
        {
          path: 'saved_companies',
          component: EntHold,
        },
      ]
    },
    {
      path: '/*',
      component: Login
    },
  ]
})
