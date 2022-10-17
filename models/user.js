import mongoose from "mongoose";

// 创建约束规则
const userSchema = mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String}
})

// 将规则交给User，并暴露出去
const User = mongoose.model('User', userSchema)
export default User;
