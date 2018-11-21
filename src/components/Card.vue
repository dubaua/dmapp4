<template lang="pug">
  .card
    | {{content.title}}
</template>

<script>
export default {
  name: "card",
  props: {
    content: {
      type: Object,
      required: true
    }
  }
};
</script>
