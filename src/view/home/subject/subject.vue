<template>
  <!-- 学科列表模块 -->
  <div class="subject">
    <el-card>
      <!-- 头部表单 -->
      <el-form :model="form" :inline="true" ref="form">
        <!-- 学科编号输入框 -->
        <el-form-item label-width="90px" label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="setWidth"></el-input>
        </el-form-item>

        <!-- 学科名称输入框 -->
        <el-form-item label-width="90px" label="学科名称" prop="name">
          <el-input v-model="form.name" class="setWidth"></el-input>
        </el-form-item>

        <!-- 创建输入框 -->
        <el-form-item label-width="90px" label="创建者" prop="username">
          <el-input v-model="form.username" class="setWidth"></el-input>
        </el-form-item>

        <!-- 状态下拉框 -->
        <el-form-item label-width="90px" label="状态" prop="status">
          <el-select v-model="form.status" class="setWidth" placeholder="请选择状态">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="getClick">搜索</el-button>
          <el-button @click="deleClick">清除</el-button>
          <el-button type="primary" @click="addClick">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 中间内容表格 -->
    <el-card class="cardList">
      <el-table :data="subjectTable">
        <el-table-column width="50px" label="序号">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>

        <el-table-column label="学科编号" prop="rid"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="学科简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="username"></el-table-column>
        <el-table-column width="70px" label="状态">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column width="270px">
          <template slot-scope="scope">
            <el-button @click="editClick(scope.row)">编辑</el-button>
            <el-button @click="openTable(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="delClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 5, 10, 15]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 新增学科对话框的显示 -->
    <addSubject ref="addSubject" @addSon='getClick' :mode='mode'></addSubject>
  </div>
</template>

<script>
import {
  getSunjectData,
  setSubjectStatus,
  delSubjectData
} from "@/api/sunject.js";
// 导入新增学科的组件
import addSubject from './addSubject.vue'
export default {
  components:{
    addSubject
  },
  data() {
    return {
      // 表单信息
      mode:'add',
      form: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //多选框的状态
      },
      // 分页器信息
      pagination: {
        currentPage: 1, //当前页
        total: 60, //总页数
        pageSize: 1 //每页几条
      },
      // 接受学科列表的信息
      subjectTable: []
    };
  },
  created() {
    // 开始请求所有的信息
    // 分页数据处理

    this.getData();
  },
  methods: {
    // 搜索功能
    getClick() {
      this.pagination.currentPage = 1;
      this.getData();
    },

    // 清除功能
    deleClick() {
      this.$refs.form.resetFields();
      this.getClick();
    },

    // 删除数据功能
    delClick(id) {

      // 弹框警告,是否删除
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 点击弹框确定然后调用接口,删除数据
          delSubjectData({ id: id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            }),
            // 刷新数据
              this.getClick();
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 新增学科
    addClick(){
      this.mode = 'add'
      this.$refs.addSubject.form = {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        remark: "" //备注
      }
      this.$refs.addSubject.dialogFormVisible = true
    },
    // 编辑按钮
    editClick(row){
      this.$refs.addSubject.dialogFormVisible = true
      this.mode = 'edit'
      this.$refs.addSubject.form = JSON.parse(JSON.stringify(row))

    },
    // 分页数据请求封装
    getData() {
      // 获取发送请求的数据/参数
      let _params = {
        page: this.pagination.currentPage, //当前页
        limit: this.pagination.pageSize, //每页几条
        ...this.form //解构赋值
      };
      getSunjectData(_params).then(res => {
        console.log("学科列表信息", res);
        this.subjectTable = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    },
    // 点击操作按钮改变状态:禁用还是启用
    openTable(id) {
      setSubjectStatus({ id: id }).then(() => {
        // 提示信息
        this.$message.success("修改成功"),
          // 刷新页面
          this.getClick();
      });
    },

    // 页容量改变
    handleSizeChange(size) {
      //点击几页每条改变数据
      this.pagination.pageSize = size;
      // 每次请求将当前页设置为第一页
      this.pagination.currentPage = 1;
      // 封装的数据列表axios
      this.getData();
    },
    // 页码改变
    handleCurrentChange(page) {
      // 点击页面设置当前页
      this.pagination.currentPage = page;
      this.getData();
    }
  }
};
</script>

<style lang = 'less'>
.subject {
  .setWidth {
    width: 150px;
  }
  .cardList {
    margin-top: 30px;
  }
  .pagination {
    text-align: center;
    margin-top: 15px;
  }
}
</style>