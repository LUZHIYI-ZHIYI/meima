<template>
  <div class="login">
    <div class="left">
      <!-- 头部 -->
      <div class="title">
        <img src="@/assets/img/lginlogo.png" alt />
        <span class="titleName">黑马面面</span>
        <span class="titleLine">|</span>
        <span class="titleName2">用户登入</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 用户名和密码 -->
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user-solid" v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-unlock"
            :show-password="true"
            v-model="form.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="key" src="@/assets/img/key.jpg" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="form.isCheck">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <!-- 登入按钮 -->
        <el-form-item>
          <el-button class="btn" type="primary" @click="loginClick">登录</el-button>
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        // 用户名
        phone: "",
        // 密码
        password: "",
        // 验证码
        code: "",
        // 单选框
        isCheck: ""
      },
      rules: {
        // 手机号码验证
        phone: [
          { required: true, message: "请输入手机号码", trigger: "change" }
        ],
        // 密码验证
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
          { min: 6, max: 12, message: "请输入6到12位密码", trigger: "change" }
        ],
        // 验证码验证
        code: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 4, message: "请输入正确的验证码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 表单完整验证并弹框
    loginClick(){
      this.$refs.form.validate(valid=>{
        if (valid) {
          // 消息弹出(成功)
          this.$message.success('登录成功')
        }else{
          // 消息弹出(失败)
          this.$message.warning('请输入正确的消息')
        }
      })
    }

  },
};
</script>

<style lang = less>
.login {
  /* 整体页面布局 */
  display: flex;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  justify-content: space-around;
  align-items: center;
  .left {
    /* 左边登录宽布局 */
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 43px;

    /* 头部样式 */
    .title {
      margin-bottom: 20px;

      .titleLine {
        font-size: 24px;
        background: rgba(199, 199, 199, 1);
      }
      .titleName2 {
        width: 87px;
        height: 21px;
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
      }
      .titleName {
        width: 94px;
        height: 22px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 15px;
        margin-right: 15px;
      }
    }

    /* 表单元素样式 */
    .key {
      width: 100%;
      height: 44px;
    }
    .btn {
      width: 100%;
    }
    .btn:nth-child(1) {
      margin-bottom: 26px;
    }
  }
}
</style>