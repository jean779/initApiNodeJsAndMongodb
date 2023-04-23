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
    console.log(sample);
    return await Sample.create(sample);
  }

}

export default new SampleService;