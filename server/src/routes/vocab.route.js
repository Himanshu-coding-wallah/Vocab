import express from "express"
import { checkAuth } from "../middleware/auth.middleware.js"
import { createPhrase, createVocab, getVocab, getPhrase } from "../controller/vocab.controller.js"

const vocabRouter = express.Router()

vocabRouter.post('/create-vocab', checkAuth, createVocab)
vocabRouter.post('/create-phrase', checkAuth, createPhrase)
vocabRouter.get('/get-vocab', checkAuth, getVocab)
vocabRouter.get('/get-phrase', checkAuth, getPhrase)

export default vocabRouter