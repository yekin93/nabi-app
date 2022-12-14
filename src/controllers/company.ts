import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { sendMail } from "../middleware/sendMail";
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
            const name: string = req.body.name;
            const email: string = req.body.email;
            const password: string = req.body.password;
            const categoryId: string = req.body.categoryId;
            const file: any = req.file;
            const company: Company = new Company(0, +categoryId, name, email, 0, "", new Date(), new Date());
            const newCompany: Company = await this.companyService.newCompany(company, password, file);
            if(newCompany && newCompany.getCompanyAvatar){
                newCompany.setCompanyAvatar = `${req.protocol}://${req.headers.host}/images/company/${newCompany.getCompanyAvatar}`;
            }
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

    companyApplication = async(req: Request, res: Response, next: NextFunction) => {
        try {
           console.log(req.params);
           res.status(200).json({
               status: true
           });
        } catch (err){
            return next(err);
        }
    }
}