import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const Sample = new mongoose.Schema({
    requestId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AnalysisRequest",
        required: true,
    },
    numberSample:{
        type: Number,
        required: true,
    },
    identification:{
      type: String,
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
});



export default mongoose.model("Sample", Sample);