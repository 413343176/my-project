<template>
  <el-container
    style="height: -webkit-fill-available;display:-webkit-box;border: 1px solid #eee"
  >
    <el-header style="text-align: right; font-size: 12px;height:50px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container>
      <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
        <div style="float:right">
          <el-switch
            v-model="collapse"
            active-color="#13ce66"
            inactive-color="#D3D3D3"
          >
          </el-switch>
        </div>

        <el-menu :default-openeds="['1', '3']" :collapse="!collapse">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i
              ><span slot="title">导航一</span></template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i
              ><span slot="title">导航二</span></template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i
              ><span slot="title">导航三</span></template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-table :data="tableData" border height="500" stripe>
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <!-- <el-footer style="height:23px">Footer</el-footer> -->
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      collapse: false,
      tableData: Array(20).fill(item)
    };
  }
};
</script>
<style>
.el-header {
  background-image: url("./assets/logo1.png");
  background-repeat: no-repeat;
  background-color: #b3c0d1;
  color: #333;
  line-height: 50px;
}
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.el-footer {
  background-color: gray;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f0ffff;
}
.el-table tr {
  background: #ffe4e1;
}
</style>
