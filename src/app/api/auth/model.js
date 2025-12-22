import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    name: {
        type: String,
    },
    description : {
        type: String,
    },
    photo: {
        type: String
    },
    role : {
        type: String,
        required: true,
        default: "student"
    }
});


export const User = mongoose.models.User || mongoose.model("User", UserSchema);

