import {model, Schema} from "mongoose"
const userSchema = new Schema({
     name : {
        type : String,
        required : true
    }, email : {
        type : String,
        unique : true,
        lowercase : true,
        required : true
    }, passwordHash : {
        type : String,
        required : true
    }, role : {
        type : String,
        enum : ["seeker", "employer"],
        required : true,
        default : "seeker"
    }, companyId : {
        type : Schema.Types.ObjectId,
        default : null,
        ref : "Company"
    }
})

const User = model("User", userSchema);

export default User;