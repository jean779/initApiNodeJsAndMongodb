import mongoose, { Schema } from "mongoose";

const AnalysisResults = new mongoose.Schema({
  analysisRequestId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnalysisRequest",
    required: true,
  },
  analysisDate:{
    type: Date,
    required: true,
  },
  processingDate:{
    type: Date,
    required: true,
  },
  manufactureDate:{
    type: Date,
    required: true,
  },
  expirationDate:{
    type: Date,
    required: true,
  },
  sif:{
    type: String,
  },
  temperatureVessel:{ 
    type: Number, 
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updateAt:{
      type: Date,
      default: Date.now
  },
  isActive: { 
    type: Boolean, 
    default: true },
  }
);

export default mongoose.model("AnalysisResults", AnalysisResults);
