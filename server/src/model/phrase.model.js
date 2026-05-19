import mongoose from "mongoose";

const phraseSchema = new mongoose.Schema({
    phrase: {
        type: String,
        trim: true,
        required: true,
        lowercase: true
    },
    meaning:[{
        definition: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        usecase: {
            type: String,
            required: true,
            lowercase: true,
        }
    }]
})

export const PhraseModel = mongoose.model("Phrase", phraseSchema)