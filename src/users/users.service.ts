import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken"
import { User } from "./user.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    generateToken(id: string) {
        return jwt.sign({ id }, "nest-sample-jwt", { expiresIn: "30d" })
    }

    userSignUp(userData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let user = await this.userModel.findOne({ email: userData.email })
            if (user)
                resolve({ message: 'User already exists.' })
            else {
                let newUser = new this.userModel({ name: userData.name, email: userData.email, password: userData.password })
                newUser.save().then((user: any) => {
                    user = {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        token: this.generateToken(user._id)
                    }
                    resolve(user)
                })
            }
        })
    }

    userLogin(userData: any) {
        return new Promise(async (resolve, reject) => {
            let user: any = await this.userModel.findOne({ email: userData.email })
            if (user && (await user.verifyPassword(userData.password))) {
                user = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token: this.generateToken(user._id)
                }
                resolve(user)
            }
            else
                resolve({ message: 'Invalid email or password.' })
        })
    }
}