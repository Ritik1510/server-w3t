import express from "express";

const app = express();

app.use(express.json());

// Example REST route for health check
app.get("/ws", (req, res) => {
  res.json({ status: "ok", message: "Express server is running" });
});

export { app };
