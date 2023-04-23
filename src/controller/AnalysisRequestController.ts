import AnalysisRequestService from "../services/AnalysisRequestService";
import { Request, Response } from "express";
import User from "../models/User";
import Company from "../models/Company";


class AnalysisRequestController{

  async find(req: Request, res: Response){
    return res.json(await AnalysisRequestService.getAllAnalysisRequests());
  }

  async create(req: Request, res: Response){
    const userId = req.body.userId;
    const companyId = req.body.companyId;
    const userExist = await User.findById(userId);

    if(!userExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "User does not exist"
      })
     
    if(!await Company.findById(companyId))  
      return  res.status(400).json({
        error: "Bad Request",
        message: "Company does not exist"
      })
    

      
    const analysisRequest = await AnalysisRequestService.analysisRequestServiceCreate(req.body);

    console.log(analysisRequest);
    return res.json(analysisRequest);
  }
}
  
export default new AnalysisRequestController;