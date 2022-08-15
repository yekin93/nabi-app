import { NextFunction, Request, Response } from "express";
import { IRequest } from "../interfaces/IRequest";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

declare global {
    namespace Express {
        export interface Request {
            loggedinUser: User;
            sessionToken: string;
        }
    }
}

const userService: UserService = UserService.getInstace();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const bearer: string = req.headers.authorization ? req.headers.authorization : '';
    const token: string = bearer.split(' ')[1];
    
    if(!token){
        res.status(401).json({
            status: false,
            message: 'Please provide token'
        });
    }

    const user: User | null = await userService.getUserBySession(token);
    
    if(user){
        req.loggedinUser = user;
        req.sessionToken = token;
        next();
    } else {
        res.status(401).json({
            status: false,
            message: 'Please login...'
        });
    }
}