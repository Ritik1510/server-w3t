import { messagesHandler } from "../connectionHandlers/Message.handlers.js";

/**
 * webSocket handler module
 * notify client that connection is established
 * listen for messages from client
 * handle client closing connection
 */

export function wsHandler(ws) {
  console.log("✅ Client connected");
  ws.send(
    JSON.stringify({
      type: "connection",
      essage: "Connection established"
    })
  );
  ws.on("message", (msg) => messagesHandler(ws, msg));
  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
}
