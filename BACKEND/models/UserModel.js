// create user schema with validations
// create user model for user schema
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "username is required"],
        minLength: [4, "min length should be 4"],
        maxLength: [50, "max length exceeded"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    dob: {
        type: Date,
        required: [true, "date of birth is required"]
    },
    mobileNumber: {
        type: Number,
        required: [true, "mobile number is required"],
    },
    // for soft delete
    status:{
        type:Boolean,
        default:true
    }
}, 
{ timestamps: true ,
  versionKey: false,
  strict: "throw"
});

// Create the model
const User = model('User', userSchema);

export default User;