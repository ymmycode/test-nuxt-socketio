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
const { $io } = useNuxtApp()
const route = useRoute()
const inputData = ref("")

$io.connect();

watch(() => inputData.value,
  (val) => {
    if(route.query.id){
      console.log(val)
      $io.emit("inputData", {value: val});
    }
  }
)

</script>

<style lang="scss" scoped>

</style>