"use server";

import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import { User } from "@/app/api/auth/model";

export async function Register(data) {
    try {
        await dbConnect();

        // 1️⃣ Check existing user (plain object)
        const existingUser = await User.findOne({
            username: data.email,
        }).lean();

        if (existingUser) {
            return {
                success: true,
                message: "User already exists",
                user: {
                    _id: existingUser._id.toString(),
                    username: existingUser.username,
                    name: existingUser.name,
                    image: existingUser.photo,
                }
            };
        }

        // 2️⃣ Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3️⃣ Create & save user (document)
        const newUserDoc = new User({
            username: data.email,
            name: data.name,
            photo: data.photo,
            password: hashedPassword,
        });

        await newUserDoc.save();

        // 4️⃣ Convert to plain object ONCE
        const newUser = {
            id: newUserDoc._id.toString(),
            username: newUserDoc.username,
            name: newUserDoc.name,
            photo: newUserDoc.photo,
        };

        // 5️⃣ Return safe payload
        return {
            success: true,
            user: newUser,
            message: "created successfully"
        };
    } catch (err) {
        console.error(err);

        return {
            success: false,
            message: err.message || "Registration failed",
        };
    }
}