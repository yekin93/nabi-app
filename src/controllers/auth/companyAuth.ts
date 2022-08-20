import { Request, Response, NextFunction } from "express";
import { Company } from "../../models/Company";
import { CompanySession } from "../../models/CompanySession";
import { CompanyService } from "../../services/companyService";
import log from '../../utils/logger';

export class CompanyAuthController {

    private static instance: CompanyAuthController;
    private companyServise!: CompanyService;

    constructor(){
        this.companyServise = CompanyService.getInstance();
    }

    static getInstance(): CompanyAuthController {
        if(!this.instance){
            this.instance = new CompanyAuthController();
        }
        return this.instance
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email, password} = req.body;
            if(!email || !password){
                throw new Error("Please provide an email and password");
            }
            const companySession: CompanySession | null = await this.companyServise.login(email, password);
            if(!companySession) {
                res.status(500).json({
                    status: false,
                    message: 'User not found...'
                });
            }            

            const company: Company | null = companySession != null ? companySession.getCompany : null;

            res.status(200).json({
                status: true,
                token: companySession?.getToken,
                company
            });

        } catch (error) {
            return next(error);
        }
    }

    logout = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.companySessionToken;
           
            const email = req.loggedinUser ? req.loggedinUser.getEmail : null;
            await this.companyServise.logout(token);
            log.info(`${email} is logout`);
            res.status(200).json({
                status: true,
                message: `${email} is logouted`
            });
        } catch (error) {
            return next(error);
        }
    }
}