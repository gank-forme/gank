<template>
  <div class="java">

    <el-form style="min-width:600px;text-align:center; width:100%;margin:0 auto;" label-width="80px">
      <!-- config -->
      <el-form-item style="text-align:center;"  label="">
        <el-table
          :fit='true'
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          :data="tableData"
          style="width: 100%">


          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <h1>部署日志</h1>
                  <p v-for='i in props.row.message'>{{i}}</p>
              </el-form>
            </template>
          </el-table-column>



          <el-table-column
            align='center'
            width='250px'
            label="上次部署时间"
            prop="updateTime">
          </el-table-column>
          <el-table-column
            align='center'
            label="项目"
            prop="name">
          </el-table-column>
          <el-table-column
            align='center'
            width='200px'
            label="分支"
            prop="branch">
            <template slot-scope="scope">
              <el-input v-model="scope.row.branch"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align='center'
            label="配置文件"
            prop="branch">
            <template slot-scope="scope">
              <el-button size='medium' @click.native.prevent='open2(scope)'>修改配置</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align='center'          
            label="操作">
            <template slot-scope="scope">
              <!--  -->
              <el-button :disabled='scope.row.branch==""||scope.row.type=="warning"' :loading="scope.row.load" :type="scope.row.type" size='medium'  @click.native.prevent="open(scope)">{{scope.row.btnTxt}}</el-button>
              <span v-if='scope.row.time>0'>{{scope.row.time}}s</span>
            </template>

          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'ConJava',
  data () {
      return {
        clickFlase:false,
        load:false,
        path:'',
        tableData: [],

        expands:[],
        getRowKeys(row) {
          return row.gitUrl;
        },
      }
  },
  methods: {
    getList(){
      let that =this;
      this.axios({
         method: 'get',
         url: '/java/query',
         //data: qs.stringify(data)
       }).then(function (res) {
         res.data.projects.forEach(item => {
           item.updateTime = new Date(item.updateTime).toLocaleString();
            item.linBranch = item.branch;
            item.linConfig = item.config;
            item.load = false;
            item.btnTxt = '部署';
            item.type = 'primary';
            item.message = [];
            item.time = 0;
          });
          that.tableData = res.data.projects;
          console.log(that.tableData);
       })
    },
    update(e){
      let that=this;
      this.axios({
         method: 'post',
         url: '/java/update',
         data: {
           branch:e.row.branch,
           gitUrl: e.row.gitUrl,
           deployDir:e.row.deployDir,
           config:e.row.config,
           updateTime:e.row.updateTime,
           name:e.row.name
         }
       }).then(function (res) {
         that.getList();
       })
    },
    open2(e) {
      let that =this;
      console.log(e);
      this.$prompt('请输配置信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'textarea',
        inputValue:e.row.config,
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        e.row.config=value;
        that.update(e);
        //alert(12);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },

    open(e) {
      if(e.row.branch!=e.row.linBranch ||e.row.config!=e.row.linConfig){
        this.update(e);
      };

      let that = this;
      that.tableData[e.$index].load = true;
      that.tableData[e.$index].btnTxt = '部署中';
      that.tableData[e.$index].type = 'warning';
      that.tableData[e.$index].message.push('starting...');
      that.expands.push(that.tableData[e.$index].gitUrl);
      that.tableData[e.$index].time=0;
      var tim =setInterval(function(){
        that.tableData[e.$index].time++;
      },1000);
      that.axios({
         method: 'post',
         url: '/java/deploy/git',
         data: {
           gitUrl:e.row.gitUrl,
           branch:e.row.branch,
         }
       }).then(function (res) {
         clearInterval(tim);
         tim =null;

         if(res.data.result==1){
           that.tableData[e.$index].type = 'success';
           that.tableData[e.$index].btnTxt = "部署成功";
           that.tableData[e.$index].load = false;
         }else{
           that.tableData[e.$index].type = 'danger';
           that.tableData[e.$index].btnTxt = '部署失败';
           that.tableData[e.$index].load = false;
         }
        that.tableData[e.$index].message.push(res.data.message);
         that.$message({
           type: 'info',
           message: res.data.message
         });
       })
    }
  },
  created:function(){
    this.getList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-textarea__inner {
    height: 150px;
  }
</style>
