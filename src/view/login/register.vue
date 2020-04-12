<template>
  <el-dialog class="register" :visible.sync="dialogFormVisible" width="600px">
    <!-- 表单 -->
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <!-- 头像上传 -->
      <el-form-item label="头像" prop="avatar">
        <el-upload
          name="image"
          class="avatar-uploader"
          :action="baesURL +'/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 用户名称 -->
      <el-form-item prop="username" label="昵称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <!-- 邮箱 -->
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item prop="phone" label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <!-- 密码 -->
      <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" :show-password='true'></el-input>
      </el-form-item>

      <!-- 图形验证码 -->
      <el-form-item prop = 'code' label = '图形码'>
        <!-- 栅格布局处理 -->
        <el-row>
          <!-- 输入框 -->
          <el-col :span = '16'>
            <el-input v-model="form.code"></el-input>
          </el-col>
          <el-col :span = '7' :offset='1'>
            <!-- 验证码 -->
            <img class="code" @click="changeCodeURL" :src="codaURL" alt="">
          </el-col>
        </el-row>
      </el-form-item>

      <!-- 手机验证码 -->
      <el-form-item prop = 'rcode' label = '手机验证码'>
        <el-row>
          <el-col :span = '16'>
            <el-input v-model="form.rcode"></el-input>
          </el-col>
          <el-col :span = '7' :offset = '1'>
            <el-button @click="getRecode" :disabled="totalTime!=60">获取验证码<span v-if="totalTime != 60">{{totalTime}}s</span></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 头部 -->
    <div slot="title" class="registerTitle" >用户注册</div>
    <div slot="footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submitClick">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {getPhoneCode,register} from '@/api/register.js'
export default {
  data() {
    return {
      // 验证码倒计时
      totalTime:60,
      // 图形验证码
      codaURL:process.env.VUE_APP_URL + '/captcha?type=sendsms',
      // 表单的数据
      form: {
        //   保存头像的地址
        avatar: "",
        // 昵称
        username: "",
        // 邮箱
        email: "",
        // 手机
        phone: "",
        // 密码
        password:'',
        // 图形验证码
        code:'',
        // 手机验证码
        rcode:''
      },
      //   表单的验证
      rules: {
        avatar: [{ required: true, message: "请上传头像" }],
        username: [
          { required: true, message: "请填写昵称", trigger: "change" }
        ],
        email: [
          { required: true, message: "请填写邮箱", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("请输入正确的邮箱地址");
              }
            }
          }
        ],
        phone: [
          { required: true, message: "请填写手机号", trigger: "change" },
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
        password:[
          { required: true, message: "请填写密码", trigger: "change" },
          {min:6,max:12, message: "请填写6到12位密码", trigger: "change" },
        ],
        code:[
          { required: true, message: "请填写图形码", trigger: "change" },
          { min:4,max:4, message: "请填写4位图形码", trigger: "change" },
        ],
        rcode:[
          { required: true, message: "请填写手机验证码", trigger: "change" },
          { min:4,max:4, message: "请填写4位手机验证码", trigger: "change" },
        ]
      },
      // 基地址
      baesURL: process.env.VUE_APP_URL,
      // 页面头像上传的路径
      imageUrl: "",
      // 遮罩层的显示
      dialogFormVisible: false
    };
  },
  // 侦听器
  watch: {
    'dialogFormVisible'(newVal){
      if (newVal == false) {
        this.$refs.form.resetFields();
        this.imageUrl = ''
      }
    }
  },
  methods: {
    //   头像上传成功后的处理
    handleAvatarSuccess(res) {
      this.imageUrl = this.baesURL + "/" + res.data.file_path;
      this.form.avatar = res.data.file_path;
      console.log(res);

      //   主动调用头像的验证结果
      this.$refs.form.validateField("avatar");
    },
    // 头像上传前的处理
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击注册按钮:全局验证/提交注册信息
    submitClick() {
      // 全局验证
      this.$refs.form.validate(valid => {
        console.log(valid);
        if (valid) {

          // 注册成功回调函数
          register(this.form).then(res=>{
            console.log(res);
            if (res.code == 200) {
              this.$message.success('注册成功');
              this.dialogFormVisible = false
            }
          })
        }
      });
    },
    // 点击切换图形验证码
    changeCodeURL(){
      this.codaURL = process.env.VUE_APP_URL + '/captcha?type=sendsms&t=' + Date.now()
    },
    // 点击获取手机验证码
    getRecode(){
      let _pass = true;
      // 获取手机验证码前的判断手机号和图形验证码是否为空
      this.$refs.form.validateField(['code','phone'],error=>{
        if (error != '') {
          _pass = false
        }
      });
      // 如果错误就停止代码,为true就进行axios请求
      if (_pass === false) {
        return
      } else{
        // 未封装的方法
        // 如果成功就发送axios请求
        // axios({
        //   url: process.env.VUE_APP_URL+'/sendsms',
        //   method:'post',
        //   data: { 
        //     code:this.code,
        //     phone:this.phone
        //   },
        //   withCredentials:true
        // })
        // 验证码倒计时的定时器
        this.totalTime--
        let timeId = setTimeout(()=>{
          this.totalTime--
          if (this.totalTime <= 0) {
            clearInterval(timeId)
            this.totalTime = 60
          }
        },1000);

        // 已封装的api
        getPhoneCode(
          { 
            code:this.form.code,
            phone:this.form.phone
          }
        ).then(res=>{
          //成功回调
          console.log(res)
          this.$message.success(res.data.captcha+'')
        });
      }
    },
  }
  
};
</script>

<style lang = less >
.register {
  /* 标题的样式 */
  .registerTitle {
    height: 53px;
    text-align: center;
    line-height: 53px;
    background: rgba(15, 160, 252, 1);
    color: white;
  }
  /* 清除标题的内部样式 */
  .el-dialog__header {
    padding: 0;
  }
  /* 头像的文件上传的样式 */
  .avatar-uploader {
    width: 187px;
    margin: 0 auto;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /* 验证码样式 */
  .code{
    width: 100%;
    height: 40px;
  }
}
</style>