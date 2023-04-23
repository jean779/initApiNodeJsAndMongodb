import AnalysisRequest from "../models/AnalysisRequest";


class AnalysisRequestService {


  getAllAnalysisRequests = async () => {
    return AnalysisRequest.find();
  }

  analysisRequestServiceCreate = async (analysisRequest: any) => {
    return await AnalysisRequest.create(analysisRequest);
  }


  

}

export default new AnalysisRequestService;