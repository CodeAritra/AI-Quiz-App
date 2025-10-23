import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import quizRoute from "./route/quiz.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/quiz", quizRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
