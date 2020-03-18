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

        <el-menu :collapse="!collapse" router default-active="page1">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i
              ><span slot="title">导航一</span></template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="page1">page1</el-menu-item>
              <el-menu-item index="page2">page2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="page3">page3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="page4">page4</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i
              ><span slot="title">导航二</span></template
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <h1>{{ $route.name }}</h1>
          <el-tabs
            v-model="currentTab"
            type="card"
            editable
            @edit="handleTabEdit"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in allTabs"
              :label="item.title"
              :name="item.name"
            >
              <router-view />
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      collapse: true,
      currentTab: "",
      allTabs: []
    };
  },
  watch: {
    $route(to, from) {
      console.log("欢迎从" + from.path + "来到" + to.path);
      let currentPath = to.path;
      let currentName = to.name;
      //如果已存在，则切换。若未存在，则添加
      this.currentTab = currentPath;
      if (this.allTabs.filter(item => item.name === currentPath).length !== 0) {
        return;
      }
      this.allTabs.push({ name: currentPath, title: currentName });
    },
    allTabs(val) {
      // console.log(val);
    }
  },
  mounted() {
    console.log("mounted");
    this.allTabs = [];
    this.allTabs.push({ name: "/home", title: "Home" });
    this.currentTab = "/home";
  },
  methods: {
    handleTabEdit(targetName, action) {
      console.log(targetName, action);
      if (action === "remove") {
        if (targetName === this.currentTab) {
          //切换到下一个
          this.allTabs.forEach((item, index) => {
            if (item.name === this.currentTab) {
              //确定是下一个，还是上一个
              if (index === this.allTabs.length - 1) {
                if (index !== 0) {
                  this.$router.push(this.allTabs[index - 1].name);
                } else {
                  console.log("last one");
                }
              } else {
                this.$router.push(this.allTabs[index + 1].name);
              }
            }
          });
        }
        //缩减
        let tabs = this.allTabs.filter(item => item.name !== targetName);
        this.allTabs = tabs;
      }
    },
    handleTabClick(tab) {
      this.currentTab = tab.name;
      this.$router.push(this.currentTab);
    },

    handleCommand(command) {
      if ("exit" === command) {
        this.$router.push("/");
      }
    }
  }
};
</script>
<style scoped>
.el-header {
  background-image: url("../../assets/logo1.png");
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
