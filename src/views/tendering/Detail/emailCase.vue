<template>
    <div>
        <!-- 电子档案 -->
        <el-dialog
            title="系统提示"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <div class="icon">
                <i class="el-icon-warning"></i>
                <span>尚未发中标结果公告，无法备案电子档案!</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: true
      };
    },
    methods: {
      handleClose() {
        this.dialogVisible = false;
      }
    }
  };
</script>

<style scoped>
  /* 弹窗 */
  .icon{
      width: 100%;
      padding: 0 10px;
      display: flex;
      align-items: center;
  }
  .el-icon-warning{
      font-size: 100px;
      color: #0a5e9d;
  }
  .icon span{
      margin-left: 20px;
      font-size:18px;
  }
</style>