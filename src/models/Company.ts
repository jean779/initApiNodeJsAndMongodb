import mongoose from "mongoose";

const Company = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: false,
    },
    phone:{
        type: String,
        required: true,
    },
    responsible:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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



export default mongoose.model("Company", Company);