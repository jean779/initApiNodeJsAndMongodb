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
    isActive: { type: Boolean, default: true }
});

User.pre('save', async function(next) {
    const hashedPassowrd = await bcrypt.hash(this.password, 12);
    this.password = hashedPassowrd;
})

export default mongoose.model("User", User);