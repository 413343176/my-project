<template>
  <div>
    <span>{{ unCompletedNum }} item left || </span>
    <span>
      <span
        v-for="(state, index) in states"
        v-bind:key="index"
        v-on:click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span v-on:click="clearAllCompleted"> || clear completed</span>
  </div>
</template>
<script>
export default {
  props: {
    unCompletedNum: 0
  },
  data: function() {
    return { states: ["all", "active", "completed"], filter: "all" };
  },
  methods: {
    toggleFilter: function(state) {
      this.$emit("toggleFilter", state);
    },
    clearAllCompleted: function() {
      this.$emit("clearAllCompleted");
    }
  }
};
</script>
