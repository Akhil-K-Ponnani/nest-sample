import { Injectable, NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { Model } from "mongoose";
import { User } from "./users/user.model";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            let token: string
            token = req.headers.authorization.split(" ")[1]
            let { id }: any = jwt.verify(token, "nest-sample-jwt")
            let user: any = await this.userModel.findById(id)
            if (user && user.type === 'admin')
                next()
            else
                res.status(404).send({ message: "Admin can only access products API." })
        }
        else
            res.status(404).send({ message: "Token verification failed." })
    }
}