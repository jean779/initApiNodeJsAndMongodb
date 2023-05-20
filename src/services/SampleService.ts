import mongoose from "mongoose";
import Sample from "../models/Sample";

interface SampleData {
  requestId: mongoose.Types.ObjectId;
  numberSample: Number
  identification: string;
}

class SampleService{
  getAllsamples = async () => {
    return Sample.find().populate("requestId");
  }

  sampleServiceCreate= async (sample: SampleData) => {
    return await Sample.create(sample);
  }

 /* sampleServiceCreate = async (sample: SampleData) => {
    const count = await Sample.countDocuments({});
    const prefix = "AM";
    const id = (count + 1).toString().padStart(4, "0");
    sample._id = prefix + id;
    return Sample.create(sample);
  }*/
  
}

export default new SampleService;