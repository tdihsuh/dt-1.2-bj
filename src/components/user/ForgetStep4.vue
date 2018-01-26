<template>
  <div>
    <div class="step4">
      <div class="step4_title">
        <Icon type="checkmark-circled" style="vertical-align: text-top;margin-right: 8px;" color="#87d068" size="18"></Icon>
        重置密码成功，请直接重新登录
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  export default {
    name: 'step4',
    mounted: function () {
      this.$store.commit('step', 3);
    },
    data () {
      return {}
    },
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .step4 {
    background: #f3faf0;
    border: 1px solid rgba(255, 255, 255, 0.80);
    border-radius: 4px;
    width: 100%;
    height: 100px;
    font-size: 14px;
    line-height: 100px;
    text-align: center;
    .step4_title {
      color: #9094a4;
    }

  }

</style>
