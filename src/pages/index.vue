<template>
  <div class="fixed w-full h-full flex justify-center items-center text-6xl font-semibold">
    <div>Hello, </div>
    <div class="capitalize font-bold">{{ data }}</div>
    <div class="animate-pulse"><span class="opacity-50">|</span></div>
  </div>
  <Connection/>
</template>

<script setup>
const { $io } = useNuxtApp()

const isConnected = ref(false);
const data = shallowRef("")

$io.connect();

onMounted(()  => {
  if ($io.connected) {
    isConnected.value = true;
  }
})

$io.on("inputData", (message) => {
  data.value = message
});

</script>

<style lang="scss" scoped>

</style>