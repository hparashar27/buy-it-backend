const mongoose = require("mongoose");

// firstName, lastName, email, role, mobile, address , paymentInformation

const userSchema = new mongoose.Schema({
    firstName :{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:false,// need to implement
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses",
    }],
    paymentInformation:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"payment_information",
    }],
    rating:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratings",
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

const User = mongoose.model("users",userSchema);

module.exports =  User;