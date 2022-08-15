import { Request, Response, NextFunction } from "express"
import { ActivationService } from "../services/ActivationService"

export class ActivationController {


    private static instance: ActivationController;
    private activationService: ActivationService;

    constructor(){
        this.activationService = ActivationService.getInstance();
    }

    static getInstance(): ActivationController {
        if(!this.instance){
            this.instance = new ActivationController();
        }
        return this.instance;
    }

    activateUser = async (req: Request, res: Response, next: NextFunction) => {
        const token: string = req.params.token;
        await this.activationService.activateUser(token);
        res.status(200).json({
            status: true,
            message: 'User activated'
        });
    }
}