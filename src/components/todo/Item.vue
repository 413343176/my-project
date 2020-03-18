<template>
  <div>
    <input type="checkbox" v-model="todo.completed" />
    <label> {{ todo.content }}</label>
    <button v-on:click="deleteTodo">删除</button>
  </div>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {};
  },
  methods: {
    deleteTodo: function() {
      this.$emit("deleteTodo", this.todo.id);
    }
  }
};
</script>
