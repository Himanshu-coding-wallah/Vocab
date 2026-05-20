import express from "express";
import authRouter from "./routes/auth.route.js";
import vocabRouter from "./routes/vocab.route.js";
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send('api working')
})

app.use('/api/auth', authRouter)
app.use('/api/vocab', vocabRouter)
export default app