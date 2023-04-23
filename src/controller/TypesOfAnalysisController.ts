
import { Request, Response } from "express";
import TypesOfAnalysisService from "../services/TypesOfAnalysisService";


class TypesOfAnalysisController{

  async create(req: Request, res: Response){      
    return res.json( await TypesOfAnalysisService.typesOfAnalysisCreate(req.body));
  }

  async find(req: Request, res: Response){
    return res.json(await TypesOfAnalysisService.getAlltypesofAnalysis());
  }

}
  
export default new TypesOfAnalysisController;