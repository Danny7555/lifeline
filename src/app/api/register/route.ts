import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("lifeline");
    const users = db.collection("users");
    
    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await hash(password, 12);
    
    // Create new user
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });
    
    return NextResponse.json(
      { 
        success: true,
        userId: result.insertedId.toString()
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
}