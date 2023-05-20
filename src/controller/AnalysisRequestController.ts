import AnalysisRequestService from "../services/AnalysisRequestService";
import { Request, Response } from "express";
import User from "../models/User";
import Company from "../models/Company";
import AnalysisRequest from "../models/AnalysisRequest";


class AnalysisRequestController{

  async find(req: Request, res: Response){
    return res.json(await AnalysisRequestService.getAllAnalysisRequests());
  }

  async findActives(req: Request, res: Response){
    return res.json(await AnalysisRequestService.getAllAnalysisRequestsActives());
  }

  async findbyIdentification(req: Request, res: Response){
    const { identification } = req.params;
    return res.json(await AnalysisRequestService.getAllAnalysisRequestsByIdentification(identification.toUpperCase()));
    
  }

  async deleteAll(req: Request, res: Response){
    return res.json(await AnalysisRequestService.deleteAllAnalysisRequests());
  }

  async startAnalysisRequest(req: Request, res: Response){
    const { id } = req.params;
    if(!await AnalysisRequest.findById(id))  
      return  res.status(400).json({
        error: "Bad Request",
        message: "AnalysisRequest"
    })

    const analysisRequest = await AnalysisRequestService.updateAnalysisRequestIsStarted(
      id,
    );
    return res.json(analysisRequest);
  }

  async setSamplingDateAnalysisRequest(req: Request, res: Response){

    const { id } = req.params;
    console.log("esse é o id" + id);
    const {samplingDate} = req.body;
    console.log("esse é o sampligDAte" + samplingDate);
    if(!await AnalysisRequest.findById(id))  
      return  res.status(400).json({
        error: "Bad Request",
        message: "AnalysisRequest"
    })

    const analysisRequest = await AnalysisRequestService.updateAnalysisRequestsamplingDate(
      id,
      samplingDate
    );
    return res.json(analysisRequest);
  }


  async deleteAnalysisRequest(req: Request, res: Response){
    const { id } = req.params;
    if(!await AnalysisRequest.findById(id))  
      return  res.status(400).json({
        error: "Bad Request",
        message: "AnalysisRequest"
    })

    const analysisRequest = await AnalysisRequestService.updateDeleteAnalysisRequest(
      id,
    );
    return res.json(analysisRequest);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.body.userId;
    const companyId = req.body.companyId;
    if(!await User.findById(userId))
    return  res.status(400).json({
      error: "Bad Request",
      message: "User does not exist"
    })
   
  if(!await Company.findById(companyId))  
    return  res.status(400).json({
      error: "Bad Request",
      message: "Company does not exist"
    })
    const analysisRequestData = req.body;
    const analysisRequest = await AnalysisRequestService.analysisRequestServiceUpdate(
      id,
      analysisRequestData
    );
    return res.json(analysisRequest);
  }



  async create(req: Request, res: Response){
    console.log("cheggando aqui");
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