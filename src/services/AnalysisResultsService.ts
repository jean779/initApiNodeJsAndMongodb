import AnalysisResults from "../models/AnalysisResults";

interface AnalysisResults {
  analysisRequestId: string;
  analysisDate: Date;
  processingDate: Date;
  manufactureDate: Date;
  expirationDate: Date;
  sif?: string;
  temperatureVessel: number;
  createdAt?: Date;
  updateAt?: Date;
  isActive?: boolean;
}

class AnalysisResultsService {
  getAllAnalysisResults = async () => {
   return AnalysisResults.find();
  }

  analysisResultsServiceCreate = async (analysisResults: AnalysisResults) => {
    return await AnalysisResults.create(analysisResults);
  }

}

export default new AnalysisResultsService ;