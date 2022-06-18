import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

    addProduct(productData: any): {} {
        return new Promise(async (resolve, reject) => {
            let product = new this.productModel({ name: productData.name, description: productData.description, price: productData.price })
            product.save().then((product: any) => {
                resolve(product)
            })
        })
    }

    getAllProducts(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let products = await this.productModel.find()
            resolve(products)
        })
    }

    getProduct(productId: string): {} {
        return new Promise(async (resolve, reject) => {
            let product = await this.productModel.findById(productId)
            resolve(product)
        })
    }

    updateProduct(productId: string, productData: any): {} {
        return new Promise((resolve, reject) => {
            this.productModel.findByIdAndUpdate(productId, { name: productData.name, description: productData.description, price: productData.price }, { new: true }).then((product: any) => {
                resolve(product)
            })
        })
    }

    deleteProduct(productId: string): {} {
        return new Promise((resolve, reject) => {
            this.productModel.findByIdAndRemove(productId).then((product: any) => {
                resolve(product)
            })
        })
    }
}