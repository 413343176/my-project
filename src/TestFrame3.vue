<template>
  <el-container
    style="height: -webkit-fill-available;display:-webkit-box;border: 1px solid #eee"
  >
    <el-header style="text-align: right; font-size: 12px;height:50px">
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="show">查看</el-dropdown-item>
          <el-dropdown-item command="add">新增</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <el-container>
      <el-aside width="auto" style="background-color: rgb(238, 241, 246)">
        <div>
          <el-switch
            v-model="collapse"
            active-color="#13ce66"
            inactive-color="#D3D3D3"
          >
          </el-switch>
        </div>

        <el-menu :collapse="!collapse" router>
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
          <!-- <el-tabs
            v-model="editableTabsValue"
            type="card"
            editable
            @edit="handleTabsEdit"
          >
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
              
            </el-tab-pane>
          </el-tabs> -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleTabsEdit(targetName, action) {
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content"
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    handleCommand(command) {
      if ("exit" === command) {
        console.log("handleCommand " + command);
      }
    }
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
