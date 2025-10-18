import express from "express"
import dotenv from "dotenv"
import { generateQuizQuestions } from "./services/ai-service"

dotenv.config()

const app = express()
app.use(express.json())

generateQuizQuestions("javascript",3)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})