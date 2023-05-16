import { Schema } from 'mongoose'

export const MovieSchema = new Schema({
        name: { type:String, required: true },
        description: String,
        imageURL: String,
        price: Number,
        createAt: { type: Date, default: Date.now }
    })