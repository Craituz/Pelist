import { Document } from 'mongoose'

export interface Movie extends Document {
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createAt: Date;
}