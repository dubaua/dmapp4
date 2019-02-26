<template lang="pug">
div
  button(@click='test' type="submit") Test
</template>

<script>
import * as util from "@/utils/performanceTest.js";

function bench(fn) {
  const t1 = performance.now();
  fn();
  const t2 = performance.now();
  return (t2 - t1) / 1000;
}

function mytest() {
  const testCount = 100;
  const rollCount = 10000;

  function test1() {
    for (let i = 0; i < testCount; i++) {
      util.rollDiceLoop({ count: rollCount, side: 20, sign: 1 });
    }
  }
  const test1time = bench(test1);
  console.log("rollDiceLoop", test1time, "seconds");

  function test2() {
    for (let i = 0; i < testCount; i++) {
      util.rollDiceTimes({ count: rollCount, side: 20, sign: 1 });
    }
  }
  const test2time = bench(test2);
  console.log("rollDiceTimes", test2time, "seconds");

  function test3() {
    for (let i = 0; i < testCount; i++) {
      util.rollDiceArray({ count: rollCount, side: 20, sign: 1 });
    }
  }
  const test3time = bench(test3);
  console.log("rollDiceArray", test3time, "seconds");

}

export default {
  name: "PerformanceTest",
  methods: {
    test() {
      mytest();
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  font-family: "PT Root UI Web", "Helvetica Neue", "Segoe UI", sans-serif;
}
</style>
