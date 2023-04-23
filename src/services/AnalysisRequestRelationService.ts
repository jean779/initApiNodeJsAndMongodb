import AnalysisRequestRelation from "../models/AnalysisRequestRelation";



class AnalysisRequestRelationService {
  getAllAnalysisResults = async () => {
   return AnalysisRequestRelation.find().populate("analysisRequestId").populate("analysisResultId");;
  }

  analysisResultsServiceCreate = async (analysisRequisicao: any) => {
    return await AnalysisRequestRelation.create(analysisRequisicao);
  }

}

export default new AnalysisRequestRelationService ;