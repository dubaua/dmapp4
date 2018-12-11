<template lang="pug">
  .random-generator
    table
      thead
        tr
          td {{rule}}
          td Результат
      tbody
        tr(v-for="result in table" :class="{'active': isClassActive(result.roll)}")
          td {{result.roll}}
          td {{result.description}}
    button(@click="generate") Generate
    | {{currentResult}}
</template>

<script>
// @ is an alias to /src
// import Card from "@/components/Card";
import api from "@/api";
import rollExpression from "@/utils/rollExpression";
import { castToNumber } from "@/utils";

export default {
  name: "RandomGenerator",
  components: {
    // Card
  },
  data() {
    return {
      table: [],
      rule: "",
      currentResult: 0,
      linkedTables: [],
    };
  },
  computed: {
    ranges() {
      const RANGE_REGEXP = /^\d+\D\d+$/;
      const hashTable = {};
      if (this.table.length) {
        this.table.forEach(entry => {
          const { roll } = entry;
          if (typeof roll === "number") {
            hashTable[roll] = String(roll);
          } else if (RANGE_REGEXP.test(roll)) {
            const [startIndex, endIndex] = roll.split(/\D/).map(castToNumber);
            for (let index = startIndex; index <= endIndex; index++) {
              hashTable[index] = String(roll);
            }
          }
        });
      }
      return hashTable;
    }
  },
  mounted() {
    const key = this.$route.params.generatorId;
    this.actualizeTable(key);
  },
  beforeRouteUpdate(to, from, next) {
    this.actualizeTable(to.params.generatorId);
    next();
  },
  methods: {
    rollExpression,
    async actualizeTable(key) {
      this.currentResult = 0;
      const response = await api.getCollectionByKey(key);
      this.table = response.entries.map(entry => entry.result);
      this.rule = response.fields.result.options.rule;
      this.linkedTables = response.fields.result.options.linkedTables;
    },
    isClassActive(roll) {
      return String(roll) === this.ranges[this.currentResult];
    },
    generate() {
      this.currentResult = rollExpression(this.rule);
    }
  }
};
</script>

<style lang="scss">
.random-generator {
  table {
    border-collapse: collapse;
    tr:nth-child(even) {
      background: #eaeaea;
    }
    tr.active {
      background: rgb(182, 223, 182);
    }
    td {
      padding: 0.5em;
    }
  }
}
</style>
