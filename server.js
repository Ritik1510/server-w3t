import express from "express";
import { WebSocketServer } from "ws";

const app = express();
const PORT = 3000; // for REST/Express
const WSPORT = 8080; // for WebSocket

// Start Express server (optional, for API routes if needed)
app.get("/", (req, res) => {
  res.send("WebSocket + Express server running");
});

app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});

// Start WebSocket server
const wss = new WebSocketServer({ port: WSPORT });
console.log(`🔌 WebSocket server running at ws://localhost:${WSPORT}`);

// Store interval for each client
wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.on("message", (msg) => {
    if (mes === "Start"){
      ws.send("client says Start");
    }
  })

  ws.on("close", () => {
    console/log("Client Disconnected :<")
  })
});
