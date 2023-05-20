import Company from "../models/Company";

interface CompanyData {
  name: string;
  address: string;
  phone: string;
  reponsible: string;
}

class CompanyService{
  getAllCompanys = async () => {
    return Company.find().populate("responsible", "-password");
  }

  companyServiceCreate= async (company: CompanyData) => {
    return await Company.create(company);
  }

  getCompanysByResponsible= async (userId: any) =>{
    return Company.find({responsible: userId});
  }

}

export default new CompanyService;