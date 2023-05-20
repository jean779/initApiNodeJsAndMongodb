import mongoose from "mongoose";

const Role = new mongoose.Schema({
  name:{
      type: String,
      required: true,
      unique: true,
  },
  description:{
      type: String,
      required: true,
  },
  permissionIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission'
  }],
});

export default mongoose.model("Role", Role);