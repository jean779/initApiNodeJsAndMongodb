import mongoose from "mongoose";
import Company from "../models/Company";
import PhysicalAnalysis from "../models/PhysicalAnalysis";

interface IPhysicalAnalysis {
  identification: string;
  fat: number;
  totalProtein: number;
  lactose: number;
  nonFatSolids: number;
  cellCount: number;
  totalSolids: number;
  sampleId: mongoose.Schema.Types.ObjectId;
}

class PhysicalAnalysisService{
  getAllPhysicalAnalysis = async () => {
    return  PhysicalAnalysis.find().populate("sampleId");
  }

  physicalAnalysisCreate= async (physicalAnalysis: IPhysicalAnalysis) => {
    return await PhysicalAnalysis.create(physicalAnalysis);
  }

  

}

export default new PhysicalAnalysisService;