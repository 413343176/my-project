<template>
  <div class="todo">
    <input
      placeholder="what to do ?"
      v-model="textValue"
      v-on:keyup.enter="addTodo"
    />
    <Item
      v-for="(todo, index) in filterTodos"
      v-bind:key="index"
      v-bind:todo="todo"
      v-on:deleteTodo="deleteTodo"
    ></Item>
    <Tab
      v-bind:unCompletedNum="unCompletedNum"
      v-on:toggleFilter="toggleFilter"
      v-on:clearAllCompleted="clearAllCompleted"
    ></Tab>
  </div>
</template>
<script>
import Item from "./Item.vue";
import Tab from "./Tab.vue";
import Bus from "../../javascript/Bus.js";
import Vue from "vue";

Vue.use(Bus);
let id = 0;
export default {
  components: {
    Item: Item,
    Tab: Tab
  },
  data: function() {
    return {
      todos: [],
      textValue: "",
      filter: "all"
    };
  },
  methods: {
    addTodo: function() {
      this.todos.push({
        id: id++,
        content: this.textValue,
        completed: false
      });
      this.textValue = "";
      this.$bus.emit("on-message", "testxxx");
    },
    deleteTodo: function(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    toggleFilter: function(state) {
      this.filter = state;
    },
    clearAllCompleted: function() {
      this.todos = this.todos.filter(todo => !todo.completed);
    }
  },
  computed: {
    unCompletedNum: function() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    filterTodos: function() {
      if (this.filter == "all") {
        return this.todos;
      }
      return this.todos.filter(
        todo => todo.completed === (this.filter === "completed")
      );
    }
  }
};
</script>

<style scoped>
.todo {
  text-align: center;
}
</style>
