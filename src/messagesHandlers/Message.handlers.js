export function messagesHandler(msg) {
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
          message: "Unknown command",
        })
      );
    }
  } catch (err) {
    console.error("❌ Invalid message", err);
  }
}
