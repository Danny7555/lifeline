import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("lifeline");
    const users = db.collection("users");
    
    // Check if user exists
    const user = await users.findOne({ email });
    if (!user) {
      // For security reasons, don't reveal whether the email exists
      return NextResponse.json(
        { success: true, message: "If your email exists in our system, you will receive a password reset link" },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Token valid for 1 hour
    
    // Update user with reset token
    await users.updateOne(
      { email },
      { 
        $set: { 
          resetToken,
          resetTokenExpiry
        } 
      }
    );
    
    // In a real application, you would send an email with the reset link
    // For now, we'll just simulate success
    console.log(`Reset token for ${email}: ${resetToken}`);
    
    return NextResponse.json(
      { 
        success: true,
        message: "If your email exists in our system, you will receive a password reset link"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Error processing your request" },
      { status: 500 }
    );
  }
}