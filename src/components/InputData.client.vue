<template>
  <div class="w-full">
    <input 
      type="text" name="text-input" id="text-input"
      class="w-full border-b border-black focus:outline-none outline-none"
      v-model="inputData"
    >
  </div>
</template>

<script setup>
import { socket } from "./socket";

const route = useRoute()
const isConnected = ref(false);
const inputData = ref()

if (socket.connected) {
  isConnected.value = true;
}

watch(() => inputData.value,
  (val) => {
    if(route.query.id && isConnected){
      console.log(1)
      socket.emit("inputData", val);
    }
  }
)
</script>

<style lang="scss" scoped>

</style>