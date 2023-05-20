import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const User = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        required: true,
        select: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now
    }, 
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    isActive: { type: Boolean, default: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

User.pre('save', async function(next) {
    const hashedPassowrd = await bcrypt.hash(this.password, 12);
    this.password = hashedPassowrd;
})

export default mongoose.model("User", User);