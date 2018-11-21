<template lang="pug">
  div
    div(:class="config.rowClassName")
      div(
        v-for="(item, index) in filteredItems"
        :class="config.cellClassName(index)"
        :key="item.Id")
        component(:is="child" :content="item" :isReady="isReady")
    button(@click="showMore" :disabled="isFetching") Загрузить еще
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
      items: [],
      isFetching: false,
      isReady: false,
      noMoreItems: false
    };
  },
  computed: {
    filteredItems() {
      if (typeof this.config.filter === "undefined") {
        return this.items;
      }
      return this.items.filter(this.config.filter);
    },
    existingIds() {
      return this.items.map(item => item.Id);
    }
  },
  mounted() {
    this.showMore();
  },
  methods: {
    async showMore() {
      const items = await this.fetchItems();
      if (items) {
        this.items = [...this.items, ...items];
      }
    },
    async fetchItems() {
      this.isFetching = true;
      const { limit } = this.config;
      const skip = this.items.length;
      const response = await api.getCollectionByKey(this.config.key, {
        limit,
        skip
      });
      this.isFetching = false;
      return response;
    },
  }
};
</script>
