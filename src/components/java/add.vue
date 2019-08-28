<template>
  <div class="java">
      <el-form v-if='addFlag==0' style="min-width:600px; text-align:center;width:40%;margin:0 auto;" label-width="80px">
        <!-- config -->
        <el-form-item label="Git地址">
          <el-input  v-model="form.gitUrl"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;" label="部署目录">
          <el-input v-model="form.deployDir"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;" label="config">
          <el-input :autosize="{ minRows: 10, maxRows: 10}" type="textarea" v-model="form.config"></el-input>
        </el-form-item>
        <el-button  :disabled='!(form.gitUrl!=store.gitUrl||form.deployDir!=store.deployDir||form.config!=store.config)' type="primary" @click='addFun'>修改</el-button>
      </el-form>

      <el-form v-if='addFlag==1' style="min-width:600px; text-align:center;width:40%;margin:0 auto;" label-width="80px">
        <!-- config -->
        <el-form-item label="Git地址">
          <el-input  v-model="add.gitUrl"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;" label="部署目录">
          <el-input v-model="add.deployDir"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center;" label="config">
          <el-input :autosize="{ minRows: 10, maxRows: 10}" type="textarea" v-model="add.config"></el-input>
        </el-form-item>

        <el-button :disabled='add.gitUrl==""||add.config==""'type="primary" @click='addFun'>添加项目</el-button>
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
        addFlag:sessionStorage.addFlag,
        path:'',
        store:store.state.add1Data,
        form: {
          gitUrl: store.state.add1Data.gitUrl,
          deployDir:store.state.add1Data.deployDir,
          port:store.state.add1Data.port,
          config:store.state.add1Data.config,
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: 'Config',
          desc: ''
        },
        add:{
          gitUrl: '',
          deployDir:'',
          config:''
        },
        tableData: [],
        search: ''
      }
  },
  methods: {
    addFun(){

      let that =this;
      if(that.addFlag==0){
        this.axios({
           method: 'post',
           url: '/java/update',
           data: {
             branch:store.state.add1Data.branch,
             gitUrl: that.form.gitUrl,
             deployDir:that.form.deployDir,
             updateTime:store.state.add1Data.updateTime,
             name:store.state.add1Data.name,
             config:that.form.config,
           }
         }).then(function (res) {
           that.$message({
             message: '修改成功',
             type: 'success'
           });

          history.go(-1);
         })
      }else{
        this.axios({
           method: 'post',
           url: '/java/add',
           data: {
             gitUrl: that.add.gitUrl,
             deployDir:that.add.deployDir,
             config:that.add.config,
           }
         }).then(function (res) {
           that.$message({
             message: '添加成功',
             type: 'success'
           });
            history.go(-1);
         })
      }
    },

    open1() {
      this.$prompt('请输入', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消部署'
        });
      });
    },
    open2() {
      this.$prompt('请输配置信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType:'textarea',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '修改成功'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    },
    open() {
      this.$prompt('请输入部署分支', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你部署的分支是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消部署'
        });
      });
    },
    onSubmit() {
      console.log('submit!');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  watch:{

  },
  created:function(){
     console.log(this.addFlag);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
