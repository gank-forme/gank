<template>
  <div class="hello">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-header>
        <div class="cursor">
          <div class="logo" @click='toHome'></div>
          <span @click='toHome'>掌上110自动化运维平台</span>
        </div>
        <a href="index.html#/webDist" class="setting" style="float:right;font-size:14px;">
          <img style="width:23px;" src="../assets/ui.png" alt="">
        </a>
      </el-header>

      <el-container style="height:800px;">
        <el-aside style="background-color: rgb(238, 241, 246)">
          <el-menu background-color='#333' text-color='#fff' active-text-color='#3d8c8a' :default-active='$router.path'  :router='true' >
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>Node</template>
              <el-menu-item-group>
                <el-menu-item index="/nodeCofig">修改公共配置</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                  <span slot="title">部署方式</span>
                <el-menu-item index="/nodeUpdate">git部署</el-menu-item>
                <el-menu-item index="/nodeDist">dist部署</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">项目</span>
                <el-menu-item index="/nodeManage">项目管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-menu"></i>Java</template>
              <el-menu-item-group>
                <span slot="title">部署方式</span>
                <el-menu-item index="/javaGit">git部署</el-menu-item>
                <el-menu-item index="/javaPkg">jar部署</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <span slot="title">项目</span>
                <el-menu-item index="/javaManage">项目管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main :class="nom">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {

    return {
      nom:'',
      tableData: [],
      isCollapse: true
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toHome(){
      location.href='#/home'
    }
  },
  watch:{
    // this.$route.path
    '$route.path':function(newVal,oldVal){
      //console.log(newVal+"---"+oldVal);
      if(newVal === '/' ||newVal === '/home'){
        this.nom = 'nom'
      } else {
        this.nom = ''
      }
    }
  },
  created:function(){
    console.log(this.$route);
    if(this.$route.path=='/'||this.$route.path=='/home'){
      this.nom = 'nom'
    }else{
      this.nom = ''
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header .logo{
    float: left;
    width: 50px;
    height: 60px;
    margin-top: 10px;
    background: url('../assets/foo.png') no-repeat;
    background-size: 120px ;
  }
  .el-aside {
      box-shadow: inset 0 10px 10px -5px #0d1116;
      background: #2d2d2d !important;
  }
  .el-menu {
    width: 100%;
  }
  .el-submenu {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    border-bottom: 1px solid #2d2d2d;
  }
  .el-main {
    position: relative;
    margin: 20px;
    background: #fff;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  }
  .el-main.nom {
    border:none;
    margin: 0;
    padding: 0;
  }
  .setting {
    cursor: pointer;
    color: #ddd;
    text-decoration: none;
  }
  .setting img{
    float: left;
    margin-top: 23px;
    margin-right: 5px;
  }
  .setting em {
    float: left;
    font-style: normal;
  }
  .bg {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .cursor {
    cursor: pointer;
  }
</style>
