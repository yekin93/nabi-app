import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { Company } from "../models/Company";
import { CompanyService } from "../services/companyService";
import log from '../utils/logger';

export class CompanyController {

    private static instance: CompanyController;
    private companyService!: CompanyService;

    constructor(){
        this.companyService = CompanyService.getInstance();
    }

    static getInstance(): CompanyController {
        if(!this.instance){
            this.instance = new CompanyController();
        }
        return this.instance;
    }

     newCompany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, email, password } = req.body;
            const file: any = req.file;
            console.log(req);
            const company: Company = new Company(0, name, email, 0, "", new Date(), new Date());
            const newCompany: Company = await this.companyService.newCompany(company, password, file);
            log.info(`new company is created: ${newCompany.getName} ${newCompany.getEmail}`);
            res.status(200).json({
                status: true,
                company: newCompany
            });
        } catch (err) {
            return next(err);
        }
    }  
    
    activateCompanyById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {companyId} = req.body;
            await this.companyService.activateCompanyById(req.loggedinUser, companyId);
            log.info(`companyId: ${companyId} is activated`);
            res.status(200).json({
                status: true,
                message: 'Company is activated'
            });
        } catch (err){
            return next(err);
        }
    }
}