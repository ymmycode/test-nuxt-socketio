import { io } from "socket.io-client";

export const socket = io('https://test-nuxt-socketio.netlify.app/', {
    transports: ['websocket']
  }
);