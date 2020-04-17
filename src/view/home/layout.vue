<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse = !collapse"></i>
        <img class="marginlr" src="@/assets/img/home_login.png" alt />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <!-- 替换成了共有信息中的对象 -->
        <img class="avatar" :src="this.$store.state.userName.avatar" alt />
        <span class="name">{{this.$store.state.userName.username}}，您好</span>
        <el-button type="primary" size="small" @click="exit">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- 菜单列表模块 -->
        <el-menu :router="true" default-active="$route.fullPath" :collapse='collapse' class="collectFolded" >
          <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/home/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/home/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 嵌套路由的出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserPage, exitLoing } from "@/api/home.js";
import { removeToken,getToken } from "@/utils/token.js";
export default {
  data() {
    return {
      // 用户信息存储
      userName: "",
      // 设置菜单是否叠起
      collapse:false
    };
  },
  created() {
    window.console.log('路由信息:',this.$route);
    
    // 用户代码优化,有无token
    if (!getToken()) {
      this.$router.push('/')
      return
    }
    // 用户信息axios请求封装
    getUserPage().then(res => {
      console.log(res);
      this.userName = res.data;
      // 图片路径拼接
      this.userName.avatar = process.env.VUE_APP_URL + "/" + res.data.avatar;
      // 用户信息存储到共享信息中方便后面使用
      this.$store.state.userName = this.userName
    });
  },
  methods: {
    // 点击退出按钮,退出登录操作
    exit() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 调用退出的接口
        exitLoing();
        // 删除token
        removeToken();
        // 跳转到首页
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang = less>
.layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
    }
  }
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
  }
  .collectFolded:not(.el-menu--collapse){
    width: 200px;
  }
}
</style>