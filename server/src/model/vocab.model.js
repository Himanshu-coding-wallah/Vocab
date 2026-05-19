import mongoose from "mongoose";

const vocabSchema = new mongoose.Schema({
    word: {
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
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

export const VocabModel = mongoose.model("vocab", vocabSchema)