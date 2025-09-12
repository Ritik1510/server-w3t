import { messagesHandler } from "../messagesHandlers/Message.handlers.js";

// WebSocket handler module
export function wsHandler(ws) {
  console.log("✅ Client connected");

  // Notify client that connection is established
  ws.send(
    JSON.stringify({ type: "connection", message: "Connection established" })
  );

  // Listen for messages from client
  ws.on("message", () => messagesHandler(ws, msg));

  // Handle client closing connection
  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
}
