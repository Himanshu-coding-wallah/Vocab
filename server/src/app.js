import express from "express";
import authRouter from "./routes/auth.route.js";
import vocabRouter from "./routes/vocab.route.js";
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.get('/', (req,res)=>{
    res.send('api working')
})

app.use('/api/auth', authRouter)
app.use('/api/vocab', vocabRouter)
export default app