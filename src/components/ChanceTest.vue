<template lang="pug">
  .chance-test
    .params
      .params__col
        label(for='expression') Die expression
        input#expression(v-model='expression')
      .params__col
        label(for='count') Count of rolls
        input#count(v-model='count')
      .params__col
        | Zoom: {{zoom}}
        input(type='range', v-model.number='zoom', min='1', max='10', step='1')
      .params__col
        button(@click='test') Test
    .diagram
      .diagram__ruler.diagram__ruler--0
        .diagram__legend {{(0 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__ruler.diagram__ruler--20
        .diagram__legend {{(20 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__ruler.diagram__ruler--40
        .diagram__legend {{(40 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__ruler.diagram__ruler--60
        .diagram__legend {{(60 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__ruler.diagram__ruler--80
        .diagram__legend {{(80 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__ruler.diagram__ruler--100
        .diagram__legend {{(100 / zoom).toFixed(2)}}%
        .diagram__bar
      .diagram__col(v-for='entry in results')
        .diagram__progress(:style='getHeight(entry.count)')
        .diagram__digit
          | {{entry.result}}
        .diagram__highlight
</template>

<script>
import {
  parseExpression,
  rollDiceConfig,
  minDiceConfig,
  maxDiceConfig
} from "@/utils/rollExpression";

export default {
  name: "ChanceTest",
  data() {
    return {
      expression: "d8+d12",
      config: [],
      count: 10000,
      zoom: 10,
      rolled: 0,
      results: {}
    };
  },
  methods: {
    getHeight: function(count) {
      return `height: ${((count / this.rolled) * 100 * this.zoom).toFixed(2)}%`;
    },
    test() {
      this.clear();
      for (let i = 0; i < this.count; i++) {
        var result = rollDiceConfig(this.config);
        this.results[`r${result}`].count++;
        this.rolled++;
      }

      const results = Object.values(this.results).map(entry => entry.count);
      const max = Math.max(...results);
      console.log(max);

      const zoomToFit = Math.ceil((max / this.count) * 10);
      console.log("currentZoom", this.zoom, zoomToFit);
      // if (this.zoom > zoomToFit) {
      //   this.zoom = zoomToFit;
      // }
    },
    clear() {
      this.config = parseExpression(this.expression);
      const min = minDiceConfig(this.config);
      const max = maxDiceConfig(this.config);

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
}
.params {
  margin-left: 4rem;
  display: flex;
  align-items: flex-end;
  &__col {
    width: 20%;
    padding: 0 5px;
  }
  position: relative;
  z-index: 1;
}

.diagram {
  display: flex;
  margin-left: 4rem;
  height: 80vh;
  position: relative;

  &__ruler {
    position: absolute;
    left: 0;
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
    left: -4rem;
    width: 4rem;
    text-align: right;
    transform: translate(0, -50%);
  }

  &__bar {
    height: 1px;
    background: rgba(0, 0, 0, 0.185);
  }

  &__col {
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.05);
    position: relative;

    & + & {
      margin-left: 1px;
    }
  }

  &__progress {
    width: 100%;
    position: absolute;
    bottom: 0;
    background: rgb(0, 126, 6);
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
