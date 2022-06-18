import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true }
    },
    {
        timestamps: true
    }
)

export interface Product {
    name: string,
    description: string,
    price: number,
}