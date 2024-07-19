<template>
  <div class="fixed w-full h-full flex justify-center items-center text-6xl font-semibold">
    <div>Hello, </div>
    <div class="capitalize font-bold">{{ data }}</div>
    <div class="animate-pulse"><span class="opacity-50">|</span></div>
  </div>
  <Connection/>
</template>

<script setup>
import { socket } from '~/components/socket';

const isConnected = ref(false);
const data = ref("test")

onMounted(()  => {
  if (socket.connected) {
    isConnected.value = true;
  }
  nextTick(() => {
    socket.on("inputData", (value) => {
      console.log(value)
      data.value = value
    });
  })
})



</script>

<style lang="scss" scoped>

</style>