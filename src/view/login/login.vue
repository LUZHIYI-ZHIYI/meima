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
              <img class="key" @click="codeClick" :src="codaURL" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 协议 -->
        <el-form-item prop="isCheck">
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
          <el-button class="btn" type="primary" @click="registerClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <register ref="register"></register>
    <div class="right">
      <img src="@/assets/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
// 导入子组件
import register from "./register.vue";
// 导入axios请求的封装
import {toLogin} from '@/api/login.js'
// 导入token
import {saveToken,getToken} from '@/utils/token.js'
export default {
  components: {
    register
  },
  data() {
    return {
      codaURL: process.env.VUE_APP_URL + "/captcha?type=login",
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
          { required: true, message: "请输入手机号码", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                // 验证成功
                callback();
              } else {
                // 验证不成功
                callback("请输入正确的手机号码");
              }
            }
          }
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
        ],
        // 单选框验证
        isCheck:[
          { required: true, message: "请勾选同意协议", trigger: "change" },
           {
            validator: (rule, value, callback) => {
              if (value === true) {
                // 验证成功
                callback();
              } else {
                // 验证不成功
                callback("请勾选同意协议");
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    // 点击登录按钮 表单完整验证并弹框/全局验证
    loginClick() {
      // 全局验证
      this.$refs.form.validate(valid => {
        // 如果正确就发送axios请求
        if (valid) {
          // 消息弹出(成功)
          // 封装的api,登录axios
          toLogin(this.form).then(res=>{
            console.log(res);
            // 登录成功消息请求
            if (res.code == 200) {
              this.$message.success("登录成功");
              // 保存token
              saveToken(res.data.token)
              // 登录成功后跳转页面
              this.$router.push('/home')
            }
            
          })
        } else {
          // 消息弹出(失败)
          this.$message.warning("请输入正确的消息");
        }
      });
    },
    // 注册模块
    registerClick() {
      this.$refs.register.dialogFormVisible = true;
    },
    // 点击验证码切换图片
    codeClick() {
      this.codaURL =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + Date.now();
    }
  },
  created() {
    // 判断如果有token就直接登录
    if (getToken()) {
      this.$router.push('/home')
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
      height: 40px;
      border: 1px dashed #000;
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