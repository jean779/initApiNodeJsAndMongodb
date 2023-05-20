import { format } from "date-fns";
import AnalysisRequest from "../models/AnalysisRequest";
import mongoose from "mongoose";

interface IAnalysisRequestData {
  identification: string;
  companyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  samplingDate?: Date;
  deliveryDate?: Date;
  typeMilk: string;
  originMilk: string;
  products: string;
  species: string;
  isStartedAnalysis?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updateAt?: Date;
}



class AnalysisRequestService {


  getAllAnalysisRequests = async () => {
    const analysisRequests = await AnalysisRequest
      .find().lean()
      .populate("companyId")
      .populate("userId", "-password");
  
    const formattedAnalysisRequests = analysisRequests.map(request => {
      return {
        ...request,
        samplingDate: request.samplingDate instanceof Date ? format(request.samplingDate, "dd/MM/yyyy") : "SEM DATA",
        deliveryDate: request.deliveryDate instanceof Date ? format(request.deliveryDate, "dd/MM/yyyy") : "SEM DATA",
      };
    });
  
    return formattedAnalysisRequests;
  }

  getAllAnalysisRequestsActives = async () => {
    const analysisRequests = await AnalysisRequest
      .find({isActive: true}).lean()
      .populate("companyId")
      .populate("userId", "-password");
  
    const formattedAnalysisRequests = analysisRequests.map(request => {
      return {
        ...request,
        samplingDate: request.samplingDate instanceof Date ? format(request.samplingDate, "dd/MM/yyyy") : "SEM DATA",
        deliveryDate: request.deliveryDate instanceof Date ? format(request.deliveryDate, "dd/MM/yyyy") : "SEM DATA",
      };
    });
  
    return formattedAnalysisRequests;
  }

  getAllAnalysisRequestsByIdentification = async (identification: String) => {
    const analysisRequests = await AnalysisRequest
      .find({identification: identification}).lean()
      .populate("companyId")
      .populate("userId", "-password");
  
    const formattedAnalysisRequests = analysisRequests.map(request => {
      return {
        ...request,
        samplingDate: request.samplingDate instanceof Date ? format(request.samplingDate, "dd/MM/yyyy") : "SEM DATA",
        deliveryDate: request.deliveryDate instanceof Date ? format(request.deliveryDate, "dd/MM/yyyy") : "SEM DATA",
      };
    });
  
    return formattedAnalysisRequests;
  }

  getAllAnalysisRequestsUnique = async () => {
    const analysisRequests = await AnalysisRequest
      .find().limit(1).lean()
      .populate("companyId")
      .populate("userId", "-password");
  
    const formattedAnalysisRequests = analysisRequests.map(request => {
      return {
        ...request,
        samplingDate: request.samplingDate instanceof Date ? format(request.samplingDate, "dd/MM/yyyy") : "SEM DATA",
        deliveryDate: request.deliveryDate instanceof Date ? format(request.deliveryDate, "dd/MM/yyyy") : "SEM DATA",
      };
    });
  
    return formattedAnalysisRequests;
  }
  async updateAnalysisRequestIsStarted(id: string) {
    return await AnalysisRequest.findByIdAndUpdate(id, {isStartedAnalysis: true});
  }

  async updateAnalysisRequestsamplingDate(id: string, samplingDate: Date) {
    console.log("esse é o sampling date: " + samplingDate);
    console.log(samplingDate)
    return await AnalysisRequest.findByIdAndUpdate(id, {samplingDate: samplingDate});
  }

  async updateDeleteAnalysisRequest(id: string) {
    return await AnalysisRequest.findByIdAndUpdate(id, {isActive: false});
  }

  analysisRequestServiceUpdate = async(analysisRequestId : any, analysisRequestData: IAnalysisRequestData )=>{
    return await AnalysisRequest.findByIdAndUpdate(analysisRequestId, analysisRequestData, { new: true });
  }

  analysisRequestServiceCreate = async (analysisRequest: IAnalysisRequestData) => {
    const count = await AnalysisRequest.countDocuments({});
    const prefix = "REQ";
    const id = (count + 1).toString().padStart(2, "0");
    analysisRequest.identification = prefix + id;
    return AnalysisRequest.create(analysisRequest);
  }

  deleteAllAnalysisRequests = async () => {
    return AnalysisRequest.deleteMany();
  }
  

}

export default new AnalysisRequestService;