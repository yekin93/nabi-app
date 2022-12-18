import { Company } from "../../models/Company";
import { CompanyApplication } from "../../models/CompanyApplication";
import { CompanySession } from "../../models/CompanySession";
import { User } from "../../models/User";

export interface ICompanyService {

    newCompany(company: Company, password: string, file: any): Promise<Company>;
    activateCompanyById(loggedinUser: User, id: number): Promise<void>;
    login(emai:string, password:string): Promise<CompanySession | null>
    logout(token: string): Promise<void>;
    getCompanyBySessionId(token: string): Promise<Company | null>;
    companyApplication(companyApplication: CompanyApplication): Promise<void>;
    getNotAcceptedCompaynApplication(): Promise<CompanyApplication[]>;
    getCompanyApplicationById(id: number): Promise<CompanyApplication | null>;
}