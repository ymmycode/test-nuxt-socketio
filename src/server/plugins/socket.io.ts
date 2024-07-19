import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
  let inputDataTransport

  const engine = new Engine();
  const io = new Server(
    useRuntimeConfig().public.port,
    {
      serveClient: false,
      cors: {
        origin: '*'
      }
    }
  );

  io.bind(engine);

  io.on("connection", (socket) => {
    // console.log(socket)
    socket.on('inputData', (message: { value: number }) => {
      inputDataTransport = message.value

      io.emit('inputData', inputDataTransport);
    });

  });

  nitroApp.router.use("/socket.io/", defineEventHandler({
    handler(event) {
      engine.handleRequest(event.node.req, event.node.res);
      event._handled = true;
    },
    websocket: {
      open(peer) {
        const nodeContext = peer.ctx.node;
        const req = nodeContext.req;

        // @ts-expect-error private method
        engine.prepare(req);

        const rawSocket = nodeContext.req.socket;
        const websocket = nodeContext.ws;

        // @ts-expect-error private method
        engine.onWebSocket(req, rawSocket, websocket);
      }
    }
  }));
});