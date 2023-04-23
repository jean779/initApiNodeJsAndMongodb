
import { Request, Response } from "express";
import AnalysisRequest from "../models/AnalysisRequest";
import SampleService from "../services/SampleService";


class SampleController{

  async create(req: Request, res: Response){
    const requestId = req.body.requestId;
    const analysisRequest = await AnalysisRequest.findById(requestId);

    if(!analysisRequest)
      return  res.status(400).json({
        error: "Bad Request",
        message: "Analysis request does not exist"
      })
      
    const sample = await SampleService.sampleServiceCreate(req.body);

    console.log(analysisRequest);
    return res.json(sample);
  }

  async find(req: Request, res: Response){
    return res.json(await SampleService.getAllsamples());
  }

}
  
export default new SampleController;