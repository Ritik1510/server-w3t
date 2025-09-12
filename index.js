import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import { app } from "./app.js";
import { wsHandler } from "./ws/wsHandler.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

// Attach WebSocket server to same HTTP server
const wss = new WebSocketServer({ server });

// Handle new WebSocket connections
wss.on("connection", (ws) => {
  wsHandler(ws);
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
