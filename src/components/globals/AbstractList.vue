<template lang="pug">
  div
    div(:class="config.rowClassName")
      div(
        v-for="(item, index) in filteredEntries"
        :class="config.cellClassName(index)"
        :key="item.Id")
        component(:is="child" :content="item" :isReady="isReady")
    button(v-if="haveEntriesToLoad" @click="showMore" :disabled="isFetching") Загрузить еще
</template>
<script>
import api from "@/api";

export default {
  name: "ListComponent",
  props: {
    config: {
      type: Object,
      required: true
    },
    child: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      entries: [],
      isFetching: false,
      isReady: false,
      total: 0
    };
  },
  computed: {
    filteredEntries() {
      if (typeof this.config.filter === "undefined") {
        return this.entries;
      }
      return this.entries.filter(this.config.filter);
    },
    haveEntriesToLoad() {
      return this.entries.length < this.total;
    },
  },
  mounted() {
    this.showMore();
  },
  methods: {
    async showMore() {
      const { entries, total } = await this.fetchItems();
      if (total) {
        this.total = total;
      }
      if (entries) {
        this.entries = [...this.entries, ...entries];
      }
    },
    async fetchItems() {
      this.isFetching = true;

      const { limit } = this.config;
      const skip = this.entries.length;
      const response = await api.getCollectionByKey(this.config.key, {
        limit,
        skip
      });

      this.isFetching = false;
      return response;
    }
  }
};
</script>
