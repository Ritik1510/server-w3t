import dotenv from "dotenv";
import http from "http";
import { WebSocketServer } from "ws";
import { app } from "./app.js";
import { wsHandler } from "./ws/wsHandler.js";

dotenv.config();
/*
  - Create HTTP server and wraps express app with raw http req/res system  
  - Attach WebSocket server to same HTTP server
  - Handle new WebSocket connections
  - Start server listening on single server 
*/
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
  wsHandler(ws); 
  console.log("number of connected clients", wss.clients.size)
});
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
/* 
  - For managing the both express + ws on single port, we pass the express app to raw http req/res system
  - pass the 'server' to create the websocket server that serves on same port 
*/