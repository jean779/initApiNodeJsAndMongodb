import mongoose from "mongoose";
import PermissionEnum from "../utils/enums/PermissionEnum";
import moment from "moment-timezone";

const Permission = new mongoose.Schema({
    name:{
      type: String,
      required: true,
      enum: Object.values(PermissionEnum)
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updateAt:{
        type: Date,
        default: Date.now,
    }
},);



export default mongoose.model("Permission", Permission);