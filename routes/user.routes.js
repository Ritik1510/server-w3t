import { Router } from "express";
import { wsHandler } from "../ws/wsHandler";

const router = Router();

router.route("/css-animation").post(wsHandler);

