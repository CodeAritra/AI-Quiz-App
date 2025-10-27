import { Request, Response } from "express";
import {
  generateAiBattle,
  generateQuizQuestions,
} from "../services/ai-service";

export const generate = async (req: Request, res: Response) => {
  try {
    const { topic, numQuestions } = req.body;

    if (!topic)
      return res
        .status(400)
        .send({ success: false, message: "Topic is required" });
    if (!numQuestions)
      return res
        .status(400)
        .send({ success: false, message: "No of questions is required" });

    const questions = await generateQuizQuestions(topic, numQuestions);

    // console.log("questions = ", questions);

    if (questions && Array.isArray(questions) && questions.length > 0) {
      return res.status(200).send({ success: true, questions });
    } else {
      return res.status(400).send({
        success: false,
        message: "Failed to generate quiz questions. Please try again.",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Something went wrong in quiz generation",
    });
  }
};

export const aiBattle = async (req: Request, res: Response) => {
  try {
    const { topic, numQuestions } = req.body;
    const ans = await generateAiBattle(topic, numQuestions);
    res
      .status(200)
      .send({ success: true, message: "Ai battle successfull", ans });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Error in ai battle", error });
  }
};
