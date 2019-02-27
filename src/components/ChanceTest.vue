<template lang="pug">
  .chance-test
    form.params(@submit.prevent="test")
      .params__col
        label(for="expression") Diсe expression
        input#expression(v-model="expression")
      .params__col
        label(for="count") Count of rolls
        input#count(v-model="count")
      .params__col
        label(for="zoom") Zoom: {{zoom}}
        input#zoom(type="range", v-model.number="zoom", min="1", max="10", step="1")
      .params__col
        button(type="submit") Test
        button(@click='clear' type="reset") Clear
    .diagram
      .diagram__ruler(v-for="ruler in rulers" :class="'diagram__ruler--'+ruler")
        .diagram__legend {{Math.round(ruler / zoom)}}%
        .diagram__bar
      .diagram__col(
        v-for='entry in results'
        )
        .diagram__digit
          | {{entry.result}}
        .diagram__progress(:style='getHeight(entry.count)')
          .diagram__highlight
            span {{entry.count}}
            span {{(entry.count / rolled * 100).toFixed(2)}}%
</template>

<script>
import { parse, rollDice, minDice, maxDice } from "@/utils/rollExpression";

export default {
  name: "ChanceTest",
  data() {
    return {
      expression: "3d6+6d6+12",
      dice: [],
      count: 10000,
      zoom: 10,
      rolled: 0,
      results: {},
      rulers: [0, 20, 40, 60, 80, 100]
    };
  },
  methods: {
    getHeight: function(count) {
      const height = ((count / this.rolled) * this.zoom * 100).toFixed(2);
      return `height: ${height}%`;
    },
    test() {
      this.clear();

      // fill new results
      for (let i = 0; i < this.count; i++) {
        var result = rollDice(this.dice);
        this.results[`r${result}`].count++;
        this.rolled++;
      }

      // adjust zoom if results doen't fit
      const results = Object.values(this.results).map(entry => entry.count);
      const max = Math.max(...results);
      const maxChance = (max / this.rolled) * 100;
      const zoomToFit = Math.floor(100 / maxChance);
      if (this.zoom > zoomToFit) {
        this.zoom = zoomToFit;
      }
    },
    clear() {
      this.dice = parse(this.expression);
      const min = minDice(this.dice);
      const max = maxDice(this.dice);

      this.rolled = 0;
      this.results = {};

      for (let result = min; result <= max; result++) {
        this.results[`r${result}`] = {
          result,
          count: 0
        };
      }
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.test();
    });
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "PT Root UI Web", "Helvetica Neue", "Segoe UI", sans-serif;
}

$bar-label-width: 40px;

.params {
  margin-left: $bar-label-width;
  display: flex;
  align-items: flex-end;
  &__col {
    width: 20%;
    padding: 0 5px;
    label {
      display: block;
    }
  }
  position: relative;
  z-index: 1;
}

.diagram {
  $block: &;
  display: flex;
  margin-left: $bar-label-width;
  margin-right: $bar-label-width / 2;
  height: 80vh;
  position: relative;

  &__ruler {
    position: absolute;
    left: -$bar-label-width;
    right: 0;
    z-index: 1;
  }

  @for $risk from 0 through 5 {
    &__ruler--#{$risk * 20} {
      bottom: $risk * 20%;
    }
  }

  &__legend {
    position: absolute;
    width: $bar-label-width;
    left: 0;
    bottom: 100%;
    padding-right: 0.2em;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 1.5;
    text-align: right;
  }

  &__bar {
    height: 1px;
    background: rgba(0, 0, 0, 0.185);
  }

  &__col {
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.05);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    & + & {
      margin-left: 1px;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.08);

      #{$block}__highlight {
        display: block;
      }
    }
  }

  &__progress {
    width: 100%;
    background: rgb(0, 126, 6);
    position: relative;
  }

  &__highlight {
    display: none;
    bottom: 100%;
    background: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    position: absolute;
    left: -$bar-label-width / 2;
    right: -$bar-label-width / 2;
    z-index: 1;
    pointer-events: none;
    text-align: center;
    font-size: 12px;
    span {
      display: block;
    }
  }

  &__digit {
    text-align: center;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    font-size: 12px;
    padding: 5px 0;

    span {
      padding: 2px 0;
      display: block;
    }
  }
}
</style>
