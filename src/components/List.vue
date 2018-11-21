<template lang="pug">
  .list
    abstract-list(:config="config", :child="child")
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card";

export default {
  name: "List",
  components: {
    Card
  },
  data() {
    return {
      config: {
        key: "posts",
        limit: 3,
        filter(item) {
          return true;
        },
        cellClassName(index) {
          return index;
        }
      },
      child: Card
    };
  }
};
</script>
