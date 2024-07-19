<template>
  <div v-if="true">
    <p>Status: {{ isConnected ? "connected" : "disconnected" }}</p>
    <p>Transport: {{ transport }}</p>
  </div>
</template>

<script setup>
const { $io } = useNuxtApp()

const isConnected = ref(false);
const transport = ref("N/A");

if ($io.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = $io.io.engine.transport.name;

  $io.io.engine.on("upgrade", (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = "N/A";
}

$io.on("connect", onConnect);
$io.on("disconnect", onDisconnect);

onBeforeUnmount(() => {
  $io.off("connect", onConnect);
  $io.off("disconnect", onDisconnect);
});

</script>
