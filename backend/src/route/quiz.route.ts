import express from "express";
import { aiBattle, generate } from "../controller/quiz.controller";

const router = express.Router();

router.post("/generate", generate);
router.post("/aibattle", aiBattle);

export default router;
