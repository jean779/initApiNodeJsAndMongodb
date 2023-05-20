
import { Request, Response } from "express";
import User from "../models/User";
import CompanyService from "../services/CompanyService";


class CompanyController{

  async create(req: Request, res: Response){
    const userId = req.body.responsible;
    const userExist = await User.findById(userId);
    console.log(req.body.responsible)

    if(!userExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "User does not exist"
      })
      
    return res.json(await CompanyService.companyServiceCreate(req.body));
  }

  async find(req: Request, res: Response){
    return res.json(await CompanyService.getAllCompanys());
  }

  async findByReponsible(req: Request, res: Response){
    const userId = req.params.id;
    return res.json(await CompanyService.getCompanysByResponsible(userId));
  }

}
  
export default new CompanyController;