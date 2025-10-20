import express from "express";
import { generate } from "../controller/quiz.controller";

const router = express.Router();

router.post("/generate", generate);

export default router;
