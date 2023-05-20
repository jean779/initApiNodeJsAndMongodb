import mongoose, { Schema } from "mongoose";

const AnalysisRequest = new mongoose.Schema({
  identification: { 
    type: String,
  },  
  companyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
