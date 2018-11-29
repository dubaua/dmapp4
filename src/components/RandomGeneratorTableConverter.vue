<template lang="pug">
  .table-converter
    textarea.table-converter__input(rows="auto" v-model="input")
    textarea.table-converter__input(rows="auto" v-model="output")
</template>

<script>
export default {
  name: "RandomGeneratorTableConverter",
  data() {
    return {
      input: ""
    };
  },
  computed: {
    output() {
      const json = this.input.split("\n").map(row => {
        const [roll, description] = row.split(/^(\S+)\s(.*)/).slice(1);
        return {
          result: {
            roll,
            description
          }
        };
      });
      return JSON.stringify(json, undefined, 4);
    }
  }
};
</script>

<style lang="scss">
.table-converter {
  &__input {
    width: 100%;
    height: 40vh;
  }
}
</style>
