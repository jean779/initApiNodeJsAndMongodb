
import { Request, Response } from "express";
import AnalysisRequestRelationService from "../services/AnalysisRequestRelationService";
import AnalysisRequest from "../models/AnalysisRequest";
import AnalysisResults from "../models/AnalysisResults";


class AnalysisRequestRelationController{

  async create(req: Request, res: Response){
    const analysisRequestId = req.body.analysisRequestId;
    const analysisResultsId = req.body.analysisResultId;

    if(!await AnalysisRequest.findById(analysisRequestId))
      return  res.status(400).json({
        error: "Bad Request",
        message: "Analysis Request does not exist"
      })
      
    if(!await AnalysisResults.findById(analysisResultsId))
      return  res.status(400).json({
        error: "Bad Request",
        message: "Analysis Results does not exist"
      })

    return res.json(await AnalysisRequestRelationService.analysisResultsServiceCreate(req.body));
  }

  async find(req: Request, res: Response){
    return res.json(await AnalysisRequestRelationService.getAllAnalysisResults());
  }

}
  
export default new AnalysisRequestRelationController;