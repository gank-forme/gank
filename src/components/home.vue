<template>
  <div class="home">
    <div class="txtBox">
      <h1>致力于打造更便捷的运维平台</h1>
      <p>Committed to building a more convenient deployment platform</p>
    </div>
    <video id='vid' meted="meted" loop src="../assets/vid.mp4" autoplay ></video>
    <!-- Welcome -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {

    return {
      tableData: [],

    }
  },
  methods: {

  },
  created:function(){

  }
}

  // document.getElementsByTagName('video')[0].addEventLisener('pause',()=>{
  //   document.getElementsByTagName('video')[0].play();
  // });

//.play();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .home {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 70px;
    font-weight: 700;
    color: #999;
    text-align: center;
    line-height: 300px;
    overflow: hidden;
  }
  .el-main {
    position: relative;
    margin: 0 !important;
    padding: 0 !important;
  }
  .txtBox {
    position: absolute;
    background: rgb(0,0,0,0.6);
    width: 100%;
    height: 100%;
  }
  .txtBox h1 {
    font-size: 28px;
    color: #fff;
  }
  .txtBox p {
    font-size: 20px;
    color: #fff;
    line-height: 0;
  }
</style>
