// WebSocket handler module
export function wsHandler(ws) {
  console.log("✅ Client connected");

  // Notify client that connection is established
  ws.send(
    JSON.stringify({ type: "connection", message: "Connection established" })
  );

  // Listen for messages from client
  ws.on("message", (msg) => {
    try {
      const { type, payload } = JSON.parse(msg.toString());
      console.log("📩 Received:", type, payload);

      if (type === "start") {
        ws.send(
          JSON.stringify({
            type: "response",
            message: "start-animation",
          })
        );
      } else if (type === "stop") {
        ws.send(
          JSON.stringify({
            type: "response",
            message: "stop-animation",
          })
        );
      } else if (type === "disconnect") {
        ws.send(
          JSON.stringify({
            type: "disconnect",
            message: "server is disconnected + stop-to-animation",
          })
        );
        ws.close();
      } else {
        ws.send(
          JSON.stringify({ 
            type: "error", 
            message: "Unknown command" }
          ));
      }
    } catch (err) {
      console.error("❌ Invalid message", err);
    }
  });

  // Handle client closing connection
  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });
}
