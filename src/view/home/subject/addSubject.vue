<template>
  <el-dialog class="addSunject" width="600px" :visible.sync="dialogFormVisible">
    <div slot="title" class="title">新增学科</div>
    <!-- 表单内容 -->
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <!-- 底部的按钮 -->
    <div slot="footer" class="footer">
      <el-button @click="dialogFormVisible=false">取消</el-button>
      <el-button type="primary" @click="submitClick">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubjectData, editSubjectData } from "@/api/sunject.js";
export default {
  props: {
    mode: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      // 表单的绑定值
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      },
      //   表单校验验证
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      },
      // 开启对话框的
      dialogFormVisible: false
    };
  },
  methods: {
    //   全局校验
    submitClick() {
      this.$refs.form.validate(result => {
        if (result) {
          if (this.mode == "add") {
            addSubjectData(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.$emit("addSon");
            });
          } else {
            editSubjectData(this.form).then(() => {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$emit("addSon");
            });
          }
        }
      });
    }
  },
  watch: {
    dialogFormVisible(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    }
  }
};
</script>

<style lang = 'less'>
.addSunject {
  .title {
    color: #fff;
    text-align: center;
    background-color: rgb(14, 162, 250);
    height: 53px;
    line-height: 53px;
  }
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .footer {
    text-align: center;
  }
}
</style>