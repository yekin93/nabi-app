import { Request, Response } from "express";
import { Company } from "../models/Company";
import { CompanyService } from "../services/companyService";

declare global {
    namespace Express {
        export interface Request {
            loggedinCompany: Company;
            companySessionToken: string;
        }
    }
}

const compantService: CompanyService = CompanyService.getInstance();

export const companyAuth = async (req: Request, res: Response, next: NewableFunction) => {
    const bearer: string = req.headers.authorization ? req.headers.authorization : '';
    const token: string = bearer.split(' ')[1];
    
    if(!token){
        res.status(401).json({
            status: false,
            message: 'Please provide token'
        });
    }

    const company: Company | null = await compantService.getCompanyBySessionId(token);
    if(company){
        req.loggedinCompany = company;
        req.sessionToken = token;
        next();
    } else {
        res.status(401).json({
            status: false,
            message: 'Please login...'
        });
    }
}