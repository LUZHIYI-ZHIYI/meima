<template>
  <el-dialog class="register" :visible.sync="dialogFormVisible">
      <!-- 头部 -->
      <div slot="title" class="registerTitle">用户注册</div>
  </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            // 遮罩层的显示
            dialogFormVisible: false
        }
    },
};
</script>

<style lang = less>
    .register{
        .registerTitle{
            height: 53px;
            text-align: center;
            line-height: 53px;
            background:rgba(15, 160, 252,1);
            color:white;
        }
        .el-dialog__header{
            padding: 0;
        }
    }
</style>