// socket.js
const { Server } = require("socket.io");

let io;

const initSockets = (server, allowedOrigins) => {
  io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("🚫 Blocked socket.io origin:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // Orders
//   require("../websocket/createOrderSocket")(io);
//   require("../websocket/getOrdersSocket")(io);
  // require("../websocket/customerAddressSocket")(io);

  console.log("⚡ All socket namespaces initialized");
};

module.exports = { initSockets, getIO: () => io };