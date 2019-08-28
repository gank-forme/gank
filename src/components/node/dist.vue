<template>
  <div class="java">


      <el-form  style="min-width:600px;text-align:center; width:100%;margin:0 auto;" label-width="80px">
        <!-- config -->
        <el-form-item style="text-align:center;"  label="">

          <el-table
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
              label="Dist">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="">
                    <el-upload
                      class="upload-demo"
                      action='/node/upload/dist'
                      :data='uploadData'
                      name='dist'
                      :on-success='sucFun'
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      :before-upload= 'beforeUpload'
                      :multiple='false'
                      :limit="1"
                      :on-exceed="handleExceed"
                      >
                      <el-button size="small"  @click.native.prevent="open(props.row.gitUrl)" type="warning" >上传Dist包</el-button>
                    </el-upload>
                  </el-form-item>
                </el-form>
              </template>

            </el-table-column>
            <el-table-column
              align='center'
              label="操作"
              >
              <template slot-scope="scope">
                <el-button :loading="scope.row.load" :disabled='!scope.row.distFlag' :type="scope.row.type" size='medium'  @click.native.prevent="open1(scope)">{{scope.row.btnTxt}}</el-button>
                <span v-if='scope.row.time>0'>{{scope.row.time}}s</span>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-button size="small" type="primary">修改</el-button> -->
        </el-form-item>
      </el-form>

  </div>
</template>

<script>
export default {
  name: 'ConJava',
  data () {
    return {
      // distFlag:false,
      expands:[],
      getRowKeys(row) {
        return row.gitUrl;
      },
      path:'',
      uploadData:{},
      tableData: []
    }
  },
  methods: {


    sucFun(response, file, fileList) {
      //this.tableData[e].distFlag=false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    beforeUpload(){
      console.log(1);
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
            item.load = false;
            item.btnTxt = '部署';
            item.type = 'primary';
            item.message = [];
            item.time = 0;
            item.distFlag=true;
          });
          that.tableData = res.data.projects;
          console.log(that.tableData);
       })
    },
    open(e){
      this.uploadData={
        gitUrl:e
      }
    },
    open1(e) {
      let that = this;
      that.tableData[e.$index].load = true;
      that.tableData[e.$index].btnTxt = '部署中';
      that.tableData[e.$index].type = 'warning';
      that.tableData[e.$index].time=0;
      that.tableData[e.$index].message.push('starting...');
      that.expands.push(that.tableData[e.$index].gitUrl);
      var tim =setInterval(function(){
        that.tableData[e.$index].time++;
      },1000);
      that.axios({
         method: 'post',
         url: '/node/deploy/dist',
         data:{
           gitUrl:e.row.gitUrl,
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
       }).catch(function(){
         that.tableData[e.$index].type = 'danger';
         that.tableData[e.$index].btnTxt = '部署失败';
         that.tableData[e.$index].load = false;
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
