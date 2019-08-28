<template>
  <div class="java">

      <el-form style="min-width:600px;text-align:center; width:100%;margin:0 auto;" label-width="80px">
        <!-- config -->
        <el-form-item style="text-align:center;"  label="">

          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              align='center'
              prop="updateTime"
              label="上次部署时间"
            >
            </el-table-column>
            <el-table-column
              align='center'
              prop="name"
              label="项目"
              >
            </el-table-column>

            <el-table-column
              align='center'
              label="操作">

              <template slot-scope="scope">
                <el-button size='small' @click.native.prevent="addFun(scope.row)">修改</el-button>
                <!-- <el-button size='small' @click="open2">修改配置文件</el-button> -->
                <el-button type="danger" size='small' @click.native.prevent="del(scope.row.gitUrl)">删除</el-button>
              </template>

            </el-table-column>
          </el-table>

          <!-- <el-button size="small" type="primary">修改</el-button> -->
        </el-form-item>
        <el-button type="primary"  @click='addFun1'>新增项目</el-button>
      </el-form>




  </div>
</template>

<script>
import axios from 'axios';
import store from '../../store.js'

export default {
  name: 'ConJava',
  data () {

      return {
        addFlag:false,
        path:'',
        form: {
          name: '',
          path:'',
          logs:'',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: 'Config',
          desc: ''
        },
        tableData: [],
        search: ''
      }
  },
  methods: {
    addFun1(){
      this.$router.push({
        name:'nodeAdd'
      });
      sessionStorage.addFlag=1;
    },
    addFun(e){
      store.commit('addFun',e);
      this.$router.push({
        name:'nodeAdd'
      });
      sessionStorage.addFlag=0;
    },
    del(e){
      let that =this;
      this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.axios({
           method: 'post',
           url: '/node/delete',
           data: {
             gitUrl: e,
           }
         }).then(function (res) {
           that.getList();
         })
      }).catch(() => {

      });

    },

    getList(){
      let that =this;
      this.axios({
         method: 'get',
         url: '/node/query',
         //data: qs.stringify(data)
       }).then(function (res) {
         res.data.projects.forEach(item => {
            item.updateTime = new Date(item.updateTime).toLocaleString( );
          });
          that.tableData = res.data.projects;
       })
    }
  },
  watch:{

  },
  created:function(){
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
