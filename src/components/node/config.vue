<template>
  <div class="java">
      <el-form  style="width:600px; margin:0 auto;" label-width="80px">
        <!-- config -->
        <el-form-item style="text-align:center;"  label="Config">
          <el-input :autosize="{ minRows: 10, maxRows: 10}" type="textarea" v-model="cfg"></el-input>
          <el-button :disabled='lin_cfg==cfg' style="margin-top:20px;" type="primary" @click='config'>修改</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
  name: 'ConJava',
  data () {

      return {
        path:'',
        cfg:'',
        lin_cfg:''
      }
  },
  methods: {
    config(){
      let that =this;

      that.axios({
         method: 'post',
         url: '/node/config/update',
         data: {
           config: that.cfg,
         }
       }).then(function (res) {
        if(res.data.result==1){
          that.$message({
            message: '修改成功',
            type: 'success'
          });
          that.lin_cfg= that.cfg;
        }
       })
    },
    getList(){
      let that =this;
      this.axios({
         method: 'get',
         url: '/node/config/query',
         //data: qs.stringify(data)
       }).then(function (res) {
          that.lin_cfg = res.data.config;
          that.cfg = res.data.config;
       })
    }
  },
  created:function(){
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
