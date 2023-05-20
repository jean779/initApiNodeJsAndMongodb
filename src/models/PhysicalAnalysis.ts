import mongoose, { Schema } from "mongoose";

const PhysicalAnalysis = new mongoose.Schema({
  identification: {
    type: String,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  totalProtein: {
    type: Number,
    required: true
  },
  lactose: {
    type: Number,
    required: true
  },
  nonFatSolids: {
    type: Number,
    required: true
  },
  cellCount: {
    type: Number,
    required: true
  },
  totalSolids: {
    type: Number,
    required: true
  },
  sampleId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sample",
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

export default mongoose.model("PhysicalAnalysis", PhysicalAnalysis);
