<!--<template>-->
<!--  <div class="home">-->
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// @ is an alias to /src-->
<!--import HelloWorld from '@/components/HelloWorld.vue'-->

<!--export default {-->
<!--  name: 'Home',-->
<!--  components: {-->
<!--    HelloWorld-->
<!--  }-->
<!--}-->
<!--</script>-->

<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title">人事管理系统</div>
      <el-dropdown class="userInfo" @command="commandHandler">
        <span class="el-dropdown-link">
<!--          {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>-->
          {{user.name}}<i><img :src="user.userface" alt=""></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>


    <el-container>
      <el-aside width="200px">
<!--          <el-menu @select="menuClick">-->
          <el-menu router>
              <el-submenu index="1" v-for="(item,index) in this.$router.options.routes" v-if="!item.hidden" :key="index">
                  <template slot="title">
                      <i class="el-icon-location"></i>
                      <span slot="title">{{item.name}}</span>
                  </template>
                      <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                  </el-submenu>
              </el-submenu>
          </el-menu>
      </el-aside>


      <el-main>
          <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    name:"Home",
    data(){
      return{
        user:JSON.parse(window.sessionStorage.getItem("user"))
      }
    },
    methods:{
        // menuClick(index,indexPath){
        //     // console.log(index);
        //     // console.log(indexPath);
        //     this.$router.push(index)
        // },
        commandHandler(cmd){
            if (cmd=='logout'){
              this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.getRequest("/logout");
                window.sessionStorage.removeItem("user");
                this.$router.replace("/")
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
            }
          }
    }
  }
</script>

<style>
  .homeHeader{
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .homeHeader .title{
    font-size: 30px;
    font-family: 华文行楷;
    color: #ffffff;
  }

  .homeHeader .userInfo{
    cursor: pointer;
  }

  .el-dropdown-link img{
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-left: 8px;
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
</style>
