import express from "express"
import { checkAuth } from "../middleware/auth.middleware.js"
import { createPhrase, createVocab } from "../controller/vocab.controller.js"

const vocabRouter = express.Router()

vocabRouter.post('/create-vocab', checkAuth, createVocab)
vocabRouter.post('/create-phrase', checkAuth, createPhrase)

export default vocabRouter