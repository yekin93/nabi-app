import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { UserService } from "../services/UserService";

export class UserController {

    private static instance: UserController;
    private userService: UserService;

    constructor(){
       this.userService = UserService.getInstace();
    }

    static getInstance(): UserController {
        if(!this.instance){
            this.instance = new UserController();
        }
        return this.instance;
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const users: Array<User> = await this.userService.getAll();
        res.json({
            users
        });
    }

    getById = async(req: Request, res: Response, next: NextFunction) => {
        const id: number = +req.params.id;
        const user: User = await this.userService.getUserById(id);
        res.json({
            user
        });
    }

    newUser = async (req: Request, res: Response, next: NextFunction) => {
        const {name, surname, email, password } = req.body;
        console.log(req.body);
        await this.userService.insertUser(name, surname, email, password).then(user => {
            res.status(200).json({
                status: true,
                message: 'User successfuly inserted',
                user
            });
        }).catch(err => {
            res.status(404).json({
                status: false,
                message: 'Opps! something went wrong...'
            })
        })
        
    }
}