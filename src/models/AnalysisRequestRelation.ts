import mongoose from "mongoose";

const AnalysisRequestRelation = new mongoose.Schema({
  analysisRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnalysisRequest",
    required: true,
  },
  analysisResultId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AnalysisResults",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("AnalysisRequestRelation", AnalysisRequestRelation);