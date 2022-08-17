import { Company } from "../../models/Company";
import { User } from "../../models/User";

export interface ICompanyService {

    newCompany(company: Company, password: string, file: any): Promise<Company>;
    activateCompanyById(loggedinUser: User, id: number): Promise<void>;

}