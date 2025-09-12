import express from "express";
import { WebSocketServer } from "ws";

export function svgRequestHandler() {
  // Store interval for each client
  wss.on("connection", (ws) => {
    console.log("✅ Client connected");

    let direction = 1; // 1 = moving down, -1 = moving up
    let positions = [-1000, -1000, -1000]; // initial y values
    let interval;

    ws.on("message", (msg) => {
      const message = msg.toString();
      console.log("📩 Client says:", message);

      if (message === "Start") {
        // Start sending animation data
        interval = setInterval(() => {
          // Move ellipses up & down by changing `cy`
          positions = positions.map((cy, idx) => {
            // Each ellipse can move with a small offset difference
            let offset = (idx + 1) * 2; // different speed
            let newVal = cy + direction * offset;

            // Bounce effect: reverse direction if too far
            if (newVal > -30 || newVal < -150) {
              direction *= -1;
              newVal = cy + direction * offset;
            }
            return newVal;
          });

          // Send updated positions as JSON
          ws.send(JSON.stringify(positions));
        }, 200); // update every 200ms
      }

      if (message === "Stop") {
        clearInterval(interval);
        console.log("⏹️ Animation stopped by client");
      }
    });

    ws.on("close", () => {
      clearInterval(interval);
      console.log("❌ Client disconnected");
    });

    ws.on("error", (err) => {
      console.log("error while maintaining connection! :<", err);; 
    })
  });
};
