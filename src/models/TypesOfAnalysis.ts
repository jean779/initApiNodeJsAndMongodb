import mongoose from "mongoose";

const TypesOfAnalysis = new mongoose.Schema({
    name:{
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
    isActive: { type: Boolean, default: true }
});


export default mongoose.model("TypesOfAnalysis", TypesOfAnalysis );