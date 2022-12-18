import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { sendMail } from "../middleware/sendMail";
import { Company } from "../models/Company";
import { CompanyApplication } from "../models/CompanyApplication";
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
            log.info('companyApplication request: ' + JSON.stringify(req.body));
          const {firstName, surname, email, telNumber, country, city, postCode, companyName, categoryId, salesCategoryId} = req.body;
          const companyApplication: CompanyApplication = new CompanyApplication(0, firstName, surname, email, telNumber, country, city, postCode, companyName, categoryId, salesCategoryId, 0, null, null,0);
          await this.companyService.companyApplication(companyApplication);
           res.status(200).json({
               status: true,
               message: 'Successfuly Company application'
           });
        } catch (err){
            return next(err);
        }
    }

    getNotAcceptedCompanyApplications = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const companyApplications: CompanyApplication[] = await this.companyService.getNotAcceptedCompaynApplication();
            res.status(200).json({
                status: true,
                applications: companyApplications
            });
        } catch (err) {
            return next(err);
        }
    }

    getCompanyApplicationById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.body;
            const companyApplication: CompanyApplication | null = await this.companyService.getCompanyApplicationById(id);
            res.status(200).json({
                status: true,
                companyApplication
            });
        } catch (err) {
            return next(err);
        }
    }
}