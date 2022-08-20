import { Company } from "../../models/Company";
import { CompanySession } from "../../models/CompanySession";
import { User } from "../../models/User";

export interface ICompanyService {

    newCompany(company: Company, password: string, file: any): Promise<Company>;
    activateCompanyById(loggedinUser: User, id: number): Promise<void>;
    login(emai:string, password:string): Promise<CompanySession | null>
    logout(token: string): Promise<void>;
    getCompanyBySessionId(token: string): Promise<Company | null>;
}