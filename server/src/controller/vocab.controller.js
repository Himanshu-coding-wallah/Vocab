import { PhraseModel } from "../model/phrase.model.js"
import { VocabModel } from "../model/vocab.model.js"

export async function createVocab(req, res){
    const {word, meaning} = req.body

    if(!word || meaning.length === 0 ){
        return res.status(400).json({
            message: 'please enter details'
        })
    }

    for (let item of meaning) {
        if (!item.definition || !item.usecase){
            return res.status(400).json({
                message: "please enter meaning and usecase"
            })
        }
    }

    const vocab = await VocabModel.create({
        word,
        meaning,
        createdBy: req.user.id
    })

    return res.status(200).json({
        message: "vocab is created",
        vocab
    })

}
export async function createPhrase(req, res){
    const {phrase, meaning} = req.body

    if(!phrase || meaning.length === 0 ){
        return res.status(400).json({
            message: 'please enter details'
        })
    }

    for (let item of meaning) {
        if (!item.definition || !item.usecase){
            return res.status(400).json({
                message: "please enter meaning and usecase"
            })
        }
    }

    const newphrase = await PhraseModel.create({
        phrase,
        meaning,
        createdBy: req.user.id
    })

    return res.status(200).json({
        message: "phrase is created",
        phrase: newphrase
    })

}
