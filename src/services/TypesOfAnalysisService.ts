import TypesOfAnalysis from "../models/TypesOfAnalysis";



interface TypesOfAnalysisData {
  name: string;
}

class TypesOfAnalysisService{
  getAlltypesofAnalysis = async () => {
    return TypesOfAnalysis.find();
  }

  typesOfAnalysisCreate= async (typesOfAnalysisData: TypesOfAnalysisData) => {
    return await TypesOfAnalysis.create(typesOfAnalysisData);
  }

}

export default new TypesOfAnalysisService;