import { Request, Response, NextFunction } from "express";
import { Session } from "../models/Session";
import { User } from "../models/User";
import { UserService } from "../services/UserService";
import log from '../utils/logger';

export class AuthController {

    private static instance: AuthController;
    private userService: UserService;

    constructor(){
        this.userService = UserService.getInstace();
    }

    static getInstance(): AuthController {
        if(!this.instance){
            this.instance = new AuthController();
        }
        return this.instance;
    }

    signup = async (req: Request, res: Response, next: NextFunction) => {
        try{
            const { name, surname, email, password } = req.body;
            const user: User = await this.userService.insertUser(name, surname, email, password);
            res.status(200).json({
                status: true,
                message: 'User successfuly created',
                user
            });
        } catch (err) {
            return next(err);
        }
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try{
            console.log(req.body);
            const {email, password} = req.body;
            const session: Session | null = await this.userService.login(email, password);
            let user: User | null = session ? session.getUser : null;
            if(user){
                res.status(200).json({
                    status: true,
                    token: session?.getToken,
                    user
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: `Could not find user with ${email}`
                })
            }
            
        } catch (err) {
            return next(err);
        }
    }


    logout = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.sessionToken;
            if(!token){
                throw new Error('You already logout');
            }
            const email = req.loggedinUser ? req.loggedinUser.getEmail : null;
            await this.userService.logout(token);
            log.info(`${email} is logout`);
            res.status(200).json({
                status: true,
                message: `${email} is logouted`
            });
        } catch (err) {
            return next(err);
        }
    }


}