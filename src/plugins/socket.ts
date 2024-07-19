import { io } from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const socket = io(`${config.public.url}:${config.public.port}`, {
    autoConnect: false,
  });

  return {
    provide: {
      io: socket,
    },
  };
})