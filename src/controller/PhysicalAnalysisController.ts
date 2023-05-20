
import { Request, Response } from "express";
import User from "../models/User";
import CompanyService from "../services/CompanyService";
import PhysicalAnalysisService from "../services/PhysicalAnalysisService";
import Sample from "../models/Sample";


class PhysicalAnalysisController{

  async create(req: Request, res: Response){
    const sampleId = req.body.sampleId;
    const sampleExist = await Sample.findById(sampleId);
   
    if(!sampleExist)
      return  res.status(400).json({
        error: "Bad Request",
        message: "Sample does not exist"
      })
      
    return res.json(await PhysicalAnalysisService.physicalAnalysisCreate(req.body));
  }

  async find(req: Request, res: Response){
    console.log("Aqui")
    return res.json(await PhysicalAnalysisService.getAllPhysicalAnalysis());
  }

}
  
export default new PhysicalAnalysisController;