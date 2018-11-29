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
        limit: 12,
        // eslint-disable-next-line no-unused-vars
        filter(item) {
          return true;
        },
        // eslint-disable-next-line no-unused-vars
        cellClassName(index) {
          return "col-xs-4";
        },
        rowClassName: "row"
      },
      child: Card
    };
  }
};
</script>

<style lang="scss">
.row {
  display: flex;
  flex-wrap: wrap;
  max-width: 1024px;
  margin: auto;
}
.col-xs-4 {
  flex-basis: calc(33.33% - 2em);
  margin: 1em 1em;
}
</style>
