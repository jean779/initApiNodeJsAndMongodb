import mongoose, { Schema } from "mongoose";

const AnalysisRequest = new mongoose.Schema({
  companyId:{
      type: String,
      required: true,
  },
  userId:{
    type: String,
    required: true,
  },
  samplingDate:{
    type: Date,
  },
  deliveryDate:{
    type: Date,
  },
  typeMilk:{
    type: String,
    required: true,
  },
  originMilk:{
    type: String,
    required: true,
  },
  products:{
    type: String,
    required: true,
  },
  species:{
    type: String,
    required: true,
  },
  isStartedAnalysis:{ 
    type: Boolean, 
    default: false
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updateAt:{
      type: Date,
      default: Date.now
  },
});

export default mongoose.model("AnalysisRequest", AnalysisRequest);
