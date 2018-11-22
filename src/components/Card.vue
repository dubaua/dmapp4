<template lang="pug">
  a.card(:href="content.title_slug")
    .card__preview
      img(
        :src="'cockpit/storage/uploads/'+content.image.path"
        :alt="content.title"
        :width="content.image.width"
        :height="content.image.height"
      )
    .card__title {{content.title}}
    .card__content {{content.content}}
</template>

<script>
export default {
  name: "card",
  props: {
    content: {
      type: Object,
      required: true
    },
    isReady: {
      type: Boolean,
      required: false,
    },
  }
};
</script>

<style lang="scss">
.card {
  display: block;
  padding: 1em;
  border: 1px solid grey;
  text-decoration: none;
  color: inherit;
  &__preview {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin: 1em 0;
  }
  &__content {
    max-height: 5.67em;
    overflow: hidden;
  }
}
</style>

