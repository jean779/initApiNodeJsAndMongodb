
import { Request, Response } from "express";
import User from "../models/User";
import AnalysisResultsService from "../services/AnalysisResultsService";
import AnalysisResults from "../models/AnalysisResults";
import AnalysisRequest from "../models/AnalysisRequest";


class AnalysisResultsController{

  async create(req: Request, res: Response){
    const analysisRequestId = req.body.analysisRequestId;

    if(!await AnalysisRequest.findById(analysisRequestId))
      return  res.status(400).json({
        error: "Bad Request",
        message: "Analysis Request does not exist"
      })
      
    return res.json(await AnalysisResultsService.analysisResultsServiceCreate(req.body));
  }

  async find(req: Request, res: Response){
    return res.json(await AnalysisResultsService.getAllAnalysisResults());
  }

}
  
export default new AnalysisResultsController;